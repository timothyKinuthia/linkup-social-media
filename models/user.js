const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, "Your name is required"],
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        maxlength: 25,
        lowercase: true,
        unique: [true, "username already exists!"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists!"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        minlength: [6, "password should be more than 6 characters"],
        select: false
    },
    avatar: {
        type: String,
        default: "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
    },
    role: {
        type: String,
        default: 'user'
    },
    gender: {
        type: String,
        default: 'male'
    },
    mobile: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },

    story: {
        type: String,
        default: '',
        maxlength: 200
    },
    website: {
        type: String,
        default: ''
    },
    followers: [
        {type: mongoose.Types.ObjectId, ref: 'User'}
    ],
    following: [
        {type: mongoose.Types.ObjectId, ref: 'User'}
    ],
    saved: [
        {type: mongoose.Types.ObjectId, ref: 'Post'}
    ]

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);