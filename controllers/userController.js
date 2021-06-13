const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


exports.searchUser = async (req, res, next) => {
    
    try {
        const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar");
        
        res.status(200).json({ users });

    } catch (err) {
        next(err)
    }
};

exports.getUser = async (req, res, next) => {
    
    try {
        const user = await User.findById(req.params.id).populate("followers following");

        if (!user) {
            return next(new ErrorResponse('User does not exist!', 400))
        };

        res.status(200).json({ user });
    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    
    try {

        const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {new: true});


        res.status(201).json({ msg: "Updated Successfully", user });

    } catch (err) {

        console.log(err);
        next(err)
    }
}

exports.follow = async(req, res, next) => {

    try {
        const user = await User.find({ _id: req.params.id, followers: req.user._id })

        if (user.length > 0) {
            return res.status(400).json({ msg: "You are already following this user" });
        };
    
        const newFollowed = await User.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.user._id } }, { new: true });
        
        await User.findOneAndUpdate({ _id: req.user._id }, { $push: { following: req.params.id } }, { new: true });
    
        res.status(201).json({ followed: newFollowed });
    } catch (err) {
        next(err);
    }
}

exports.unFollow = async (req, res, next) => {

    try {
        
        const newUnfollowed = await (await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { followers: req.user._id } }, { new: true })).populated("followers, following");
        
        await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: req.params.id } }, { new: true });
    
        res.status(201).json({ unfollowed: newUnfollowed});
    } catch (err) {
        next(err);
    }
};

exports.suggestUsers = async (req, res, next) => {
    
    try {
        const newArr = [...req.user.following, req.user._id];

        const num = req.query.num || 10

        const users = await User.aggregate([
            { $match: { _id: { $nin: newArr } } },
            { $sample: { size: Number(num) } },
            { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
            { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
        ]);

        return res.json({ users, result: users.length });
        
    } catch (err) {
        next(err)
    }
};
