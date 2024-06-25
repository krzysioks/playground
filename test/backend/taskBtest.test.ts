import request from 'supertest';
import app from '../../server/server';
import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';

import UserModel from '../../server/models/user';
import TaskModel from '../../server/models/task';
import { TaskType, UserType } from '../../server/common/types';

interface UserTestType extends UserType {
    _id: Types.ObjectId;
}

interface MissingNameTestType extends Omit<TaskType, 'name' | '_id'> {
    _id?: Types.ObjectId;
    name?: string;
}

interface MissingStatusTestType extends Omit<TaskType, 'status' | '_id'> {
    _id?: Types.ObjectId;
    status?: string;
}

// test data
const correctUserId = new mongoose.Types.ObjectId();
const token: string = jwt.sign(
    { _id: correctUserId },
    process.env.JWT_SECRET as string
);
const correctUser: UserTestType = {
    _id: correctUserId,
    username: 'tom',
    email: 'tom.josen@gmail.com',
    password: 'Tom2020!',
    tokens: [
        {
            token
        }
    ]
};

const taskList: TaskType[] = [
    {
        name: 'Fix internet',
        creationDate: new Date().getTime(),
        status: false,
        taskOwnerId: correctUserId
    },
    {
        name: 'Buy stuff for dinner',
        creationDate: new Date().getTime(),
        status: false,
        taskOwnerId: correctUserId
    },
    {
        name: 'Meet with John',
        creationDate: new Date().getTime(),
        status: true,
        taskOwnerId: correctUserId
    }
];

const correctTask: TaskType = {
    name: 'Pay for the goodies',
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId
};
const noNameTask: MissingNameTestType = {
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId
};
const tooShortNameTask: TaskType = {
    name: 't',
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId
};
const tooLongNameTask: TaskType = {
    name: 'Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test Test test test test ',
    creationDate: new Date().getTime(),
    status: false,
    taskOwnerId: correctUserId
};
const noStatusTask: MissingStatusTestType = {
    name: 'Turn off TV',
    creationDate: new Date().getTime(),
    taskOwnerId: correctUserId
};
const moreThanOneErrorTask: MissingStatusTestType = {
    name: 'T',
    creationDate: new Date().getTime(),
    taskOwnerId: correctUserId
};

// before any test tear down clear database
beforeEach(async () => {
    await UserModel.deleteMany();
    await new UserModel(correctUser).save();
    await TaskModel.deleteMany();

    taskList.forEach(async task => {
        await new TaskModel(task).save();
    });
});

//close connection to server so, that test suite will close
afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
});

describe('Checking authorization middleware (auth.js)', () => {
    test('Should authorize logged in user whith correct token and with not expired session', done => {
        request(app)
            .get('/task/all')
            .set({ 'x-auth': token })
            .send()
            .expect(200)
            .end(done);
        // done();
    });
    test('Should not authorize user if x-auth header not exists', async () => {
        const { text } = await request(app).get('/task/all').send().expect(401);
        expect(JSON.parse(text).error).toBe('NOT_PRIVILEGED');
    });
    test('Should not authorize user with incorrect or no longer in db (user logged out earlier) tokens', async () => {
        const token = jwt.sign({ _id: '12fge322' }, process.env.JWT_SECRET);
        await request(app)
            .get('/task/all')
            .set({ 'x-auth': token })
            .send()
            .expect(401);
    });
});

const testTaskSchemaOnAddingTask = async (
    propToTest: string,
    kind: string,
    task: UserTestType | MissingNameTestType | MissingStatusTestType
): Promise<void> => {
    const { body } = await request(app)
        .post('/task/add')
        .set({ 'x-auth': token })
        .send(task)
        .expect(200);
    expect(body.taskAdded).toBeFalsy();
    expect(body.statusList).toHaveLength(1);
    expect(body.statusList[0][0]).toEqual(propToTest);
    expect(body.statusList[0][1]).toEqual(kind);
};

describe('Checking adding new task route', () => {
    test('Should add correct task', async () => {
        const { body } = await request(app)
            .post('/task/add')
            .set({ 'x-auth': token })
            .send(correctTask)
            .expect(200);
        expect(body.taskAdded).toBeTruthy();
    });
    test('Should not add new task if name not provided', async () => {
        await testTaskSchemaOnAddingTask('name', 'required', noNameTask);
    });
    test('Should not add new task if name is too short', async () => {
        await testTaskSchemaOnAddingTask('name', 'minlength', tooShortNameTask);
    });
    test('Should not add new task if name is too long', async () => {
        await testTaskSchemaOnAddingTask('name', 'maxlength', tooLongNameTask);
    });
    test('Should not add new task if status not provided', async () => {
        await testTaskSchemaOnAddingTask('status', 'required', noStatusTask);
    });
    test('Should not add new task with multiple errors', async () => {
        const { body } = await request(app)
            .post('/task/add')
            .set({ 'x-auth': token })
            .send(moreThanOneErrorTask)
            .expect(200);
        expect(body.taskAdded).toBeFalsy();
        expect(body.statusList).toHaveLength(2);
        expect(body.statusList[0][0]).toEqual('name');
        expect(body.statusList[0][1]).toEqual('minlength');
        expect(body.statusList[1][0]).toEqual('status');
        expect(body.statusList[1][1]).toEqual('required');
    });
});

describe('Checking route of changing status of task', () => {
    test('Should change status to completed', async () => {
        await TaskModel.deleteMany();
        const task: TaskType = {
            name: 'Change status test',
            creationDate: new Date().getTime(),
            status: false,
            taskOwnerId: correctUserId
        };
        await new TaskModel(task).save();
        const t = await TaskModel.findOne({
            name: 'Change status test'
        });

        await request(app)
            .post('/task/edit')
            .set({ 'x-auth': token })
            .send({ _id: t?._id, status: !task.status })
            .expect(200);
        const afterUpdateTask = await TaskModel.findOne({
            name: 'Change status test'
        });
        expect(afterUpdateTask?.status).toBeTruthy();
    });
    test('Should not change status to completed if provided task id is incorrect', async () => {
        const { body } = await request(app)
            .post('/task/edit')
            .set({ 'x-auth': token })
            .send({ _id: 'dwww545g', status: true })
            .expect(400);
        expect(body?.errorMessage).toEqual('Provided task id is not valid');
    });
});

describe('Checking route of deleting task', () => {
    test('Should delete task', async () => {
        await TaskModel.deleteMany();
        const task: TaskType = {
            name: 'Delete status test',
            creationDate: new Date().getTime(),
            status: true,
            taskOwnerId: correctUserId
        };
        await new TaskModel(task).save();
        const t = await TaskModel.findOne({
            name: task.name
        });

        await request(app)
            .post('/task/delete')
            .set({ 'x-auth': token })
            .send({ _id: t?._id })
            .expect(200);
        const afterUpdateTask = await TaskModel.findOne({
            name: task.name
        });
        expect(afterUpdateTask).toBeNull();
    });
    test('Should not delete task if already does not exist in db ', async () => {
        const { body } = await request(app)
            .post('/task/delete')
            .set({ 'x-auth': token })
            .send({ _id: correctUserId })
            .expect(400);

        expect(body?.errorMessage).toEqual(
            'Failed to remove task - already deleted'
        );
    });
    test('Should not delete task if provided task id is incorrect', async () => {
        const { body } = await request(app)
            .post('/task/delete')
            .set({ 'x-auth': token })
            .send({ _id: 'efefwfe45476547' })
            .expect(400);

        expect(body.errorMessage).toEqual('Provided task id is not valid');
    });
});
