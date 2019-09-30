const express = require('express');
//UserModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)). 
const UserModel = require('../models/user.js');
const _ = require('lodash');
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

module.exports = taskRouter;