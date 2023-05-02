const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);


const todoSchema = mongoose.Schema({
    userId: {
        type: Number,
    },
    title: {
        type: String,
        
    },
    desc: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
})

const todoTask = mongoose.model("Todo", todoSchema);

module.exports = todoTask;