const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
    author: String,
    title: String,
    content: String,
    created: {type: Date, default: Date.now}
});

module.exports = {blogPostSchema};