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
    category: {
        type: String,
        default: 'unknown',
    },
});

const video = mongoose.model('video', videoSchema);

module.exports = video;
