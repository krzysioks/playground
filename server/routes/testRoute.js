const express = require('express');
const testRouter = new express.Router();

testRouter.get('/test', (req, res) => {
    console.log('req, res: ', req.body);
    //res.send() - sends server response to provided url (i.e.: what will be shown in browser window)
    res.send({
        name: 'Andrew',
        helloString: 'Hello Express',
        likes: ['biking', 'tennis', 'basketball']
    });
});

module.exports = testRouter;