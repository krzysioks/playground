// middleware which retrieve token from the request and verifies if given user is authorized to access restricted areas of REST API

const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');

const auth = async (req, res, next) => {
    try {
        //TODO test what happens if header x-auth does not exists
        //get token from request's header
        const token = req.header('x-auth');
        //use jwt.verify with provided secret to parse token and be able to retrieved data stored there (i.e.: _id of the user). 
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        //try to get user with given id from database and which still have in tokens array given token -> user is still logged in. Otherwise it means, that user has logged out and is no more priviled to access restricted area
        const user = await UserModel.findOne({ _id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'NOT_PRIVILEGED' });
    }
};

module.exports = auth;