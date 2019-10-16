const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 160,
        trim: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    taskOwnerId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;