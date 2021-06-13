const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const ErrorResponse = require('../utils/errorResponse');


exports.auth = async (req, res, next) => {
    
    try {

        const token = req.header("Authorization");

        if (!token) {
            return next(new ErrorResponse('Invalid Authentication!', 401));
        }

        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

        if (!decoded) {
            return next(new ErrorResponse('Invalid Authentication!', 401));
        }

        const user = await User.findOne({ _id: decoded.id });

        req.user = user;

        next();
    
    } catch (er) {
        next(err);
    }
}