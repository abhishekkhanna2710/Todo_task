const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
})

const todoTask = mongoose.model("Todo", todoSchema);

module.exports = todoTask;