const request = require('supertest');
const app = require('../server/app');
const jwt = require('jsonwebtoken');
const UserModel = require('../server/models/user.js');
const TaskModel = require('../server/models/task.js');
const mongoose = require('mongoose');

// test data
const correctUserId = new mongoose.Types.ObjectId();
const token = jwt.sign({ _id: correctUserId }, process.env.JWT_SECRET);
const correctUser = {
    _id: correctUserId,
    username: 'tom',
    email: 'tom.josen@gmail.com',
    password: 'Tom2020!',
    tokens: [{
        token
    }]
};

const taskList = [
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

// before any test tear down clear database
beforeEach(async () => {
    await UserModel.deleteMany();
    await new UserModel(correctUser).save();
    await TaskModel.deleteMany();

    taskList.forEach(async task => {
        await new TaskModel(task).save();
    })
});

describe('Checking authorization middleware (auth.js)', () => {
    test('Should authorize logged in user whith correct token and with not expired session', async () => {
        await request(app).get('/task/all').set({ 'x-auth': token }).send().expect(200);
    });
    test('Should not authorize user if x-auth header not exists', async () => {
        const { text } = await request(app).get('/task/all').send().expect(401);
        expect(JSON.parse(text).error).toBe('NOT_PRIVILEGED');
    });
    test('Should not authorize user with incorrect or no longer in db (user logged out earlier) tokens', async () => {
        const token = jwt.sign({ _id: '12fge322' }, process.env.JWT_SECRET);
        await request(app).get('/task/all').set({ 'x-auth': token }).send().expect(401);
    });
});