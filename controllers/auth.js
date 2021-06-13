const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


const sendAccessToken = async (id) => {
    const token = await jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: '2d'});

    return token;
}

const sendRefreshToken = async (id) => {
    const token = await jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY, {expiresIn: '30d'});

    return token;
}

exports.register = async(req, res, next) => {
    try {
        const { username, email } = req.body;

        const userExist = await User.findOne({ $or: [{ username }, { email }] });

        if (userExist) {
            return next(new ErrorResponse("user already exists!", 400));
        }

        const user = await User.create(req.body);

        const accessToken = await sendAccessToken(user._id);

        const refreshToken = await sendRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ msg: 'successfully registered', user, accessToken });

    } catch (err) {
        next(err);
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return next(new ErrorResponse("Invalid credentials!", 400))
        }

        const user = await User.findOne({ email }).select('+password').populate("followers following", "-password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials!", 400))
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return next(new ErrorResponse("Invalid credentials!", 400))
        }

        const accessToken = await sendAccessToken(user._id);
        const refreshToken = await sendRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ msg: 'Logged in successfully', user, accessToken });

    } catch (err) {
        next(err);
    }
}

exports.genAccessToken = async(req, res, next) => {
    try {
        const refreshtoken = req.cookies.refreshToken;

        if (!refreshtoken) {
            return next(new ErrorResponse('Your not logged in. Please login to continue.', 401));
        }

        const decoded = await promisify(jwt.verify)(refreshtoken, process.env.REFRESH_TOKEN_KEY);

        if (!decoded) {
            return next(new ErrorResponse("Your not logged in. Please login to continue.", 401));
        }

        const user = await User.findById(decoded.id).populate("followers following", "-password");

        if (!user) {
            return next(new ErrorResponse("This user does not exist!", 400));
        }

        const accessToken = await sendAccessToken(user._id);

        res.status(200).json({ user, accessToken });

    } catch (err) {
        next(err);
    }
}

exports.logout = async(req, res, next) => {
    try {
        res.clearCookie('refreshToken', { path: '/api/refresh_token' });

        res.json({ msg: "Logged out!" });
    } catch (err) {
        next(err);
    }
}
