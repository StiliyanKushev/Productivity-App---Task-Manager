const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MSG = '{PATH} is required';

let taskSchema = new mongoose.Schema({
    description: {type: String, required: REQUIRED_VALIDATION_MSG},
    importantcyLevel: {type: Number,required: REQUIRED_VALIDATION_MSG},
    date: {type: Date, required:REQUIRED_VALIDATION_MSG},
    author: {type: String, required: REQUIRED_VALIDATION_MSG},
});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;