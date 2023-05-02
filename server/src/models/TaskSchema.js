const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);


const todoSchema = mongoose.Schema({
    userId: {
        type: Number,
        unique: true
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
    }
})

const todoTask = mongoose.model("Todo", todoSchema);

module.exports = todoTask;