const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'enter the user info'],
    },
    title: {
        type: String,
        required: [true, 'please enter the video title'],
    },
    description: {
        type: String,
        required: [true, 'please enter the video description'],
    },
    video: {
        type: String,
        required: [true, 'please select the video'],
    },
    category: {
        type: String,
        default: 'unknown',
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const video = mongoose.model('video', videoSchema);

module.exports = video;
