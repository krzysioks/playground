const express = require('express');
//UserModel,TaskModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)). 
const UserModel = require('../models/user.js');
const TaskModel = require('../models/task.js');
const _ = require('lodash');
const { handleError } = require('../common/utils.js');
const taskRouter = new express.Router();
const auth = require('../middleware/auth');

taskRouter.post('/task/login', async (req, res) => {
    const { username, password } = _.pick(req.body, ['username', 'password']);
    try {
        //checking if user with provided credenatials exists
        const user = await UserModel.findByCredentials(username, password);

        //if user exists and password match -> send success response to front end and generate authentication token
        const token = await user.generateAuthToken();
        res.status(200).send({ isUser: true, passwordMatched: true, token });
    } catch (err) {
        res.status(200).send(err.message);
    }
});

taskRouter.post('/task/register', async (req, res) => {
    const { username, password, email } = _.pick(req.body, ['username', 'password', 'email']);

    //every time we want to add new user we create a new instance of UserModel.
    const user = new UserModel({
        username,
        email,
        password
    });

    try {
        await user.save();
        res.status(200).send({ userRegistered: true });
    } catch (err) {
        const statusList = handleError(err, ['username', 'email']);
        res.status(200).send({ userRegistered: false, statusList });
    }
});

taskRouter.post('/task/add', auth, async (req, res) => {
    const { name, status } = _.pick(req.body, ['name', 'status']);
    const task = new TaskModel({
        name,
        status,
        creationDate: new Date().getTime(),
        taskOwnerId: req.user._id
    });
    try {
        await task.save();
        res.status(200).send({ taskAdded: true });
    } catch (err) {
        const statusList = handleError(err);
        res.status(200).send({ taskAdded: false, statusList });
    }
});

taskRouter.get('/task/all', auth, async (req, res) => {
    const tasks = await TaskModel.find({ taskOwnerId: req.user._id });
    res.status(200).send({ tasks });
});

module.exports = taskRouter;