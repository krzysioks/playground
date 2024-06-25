import { model, Schema, Types } from 'mongoose';

import { TaskType } from '../common/types';

// interface TaskType {
//     name: string;
//     creationDate: Date;
//     status: boolean;
//     taskOwnerId?: Types.ObjectId;
// }

const taskSchema = new Schema<TaskType>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 160,
        trim: true
    },
    creationDate: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    taskOwnerId: {
        type: Types.ObjectId,
        required: true
    }
});

const TaskModel = model('Task', taskSchema);

export default TaskModel;
