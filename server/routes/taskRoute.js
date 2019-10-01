const express = require('express');
//UserModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)). 
const UserModel = require('../models/user.js');
const _ = require('lodash');
const { errorMapper } = require('../config/genericErrorMap')
const taskRouter = new express.Router();
// const auth = require('../middleware/auth');

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
        username: 'd',
        email: 'd',
        password
    });

    try {
        await user.save();
        res.status(200).send({ userRegistered: true });
    } catch (err) {
        //TODO test (write mocha test for this part) error handler + add support on front end

        //mapping errors to list of [key, message], which is returned to front end
        const statusList = Object.keys(err.errors).reduce((statusList, key) => {
            if (err.errors[key].kind === 'user defined') {
                statusList = [...statusList, [key, err.errors[key].message]];
            } else {
                statusList = [...statusList, `${key.toUpperCase()} ${errorMapper[err.errors[key].kind]}`];
            }

            return statusList;
        }, []);
        res.status(200).send({ userRegistered: false, statusList });
    }
});

module.exports = taskRouter;