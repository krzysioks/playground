const request = require('supertest');
const app = require('../server/app');
const jwt = require('jsonwebtoken');
const UserModel = require('../server/models/user.js');
const mongoose = require('mongoose');

// test data
const correctUserId = new mongoose.Types.ObjectId();
const correctUserId2 = new mongoose.Types.ObjectId();
const correctUserToken = jwt.sign({ _id: correctUserId }, process.env.JWT_SECRET);
const correctUserToken2 = jwt.sign({ _id: correctUserId2 }, process.env.JWT_SECRET);

const correctUser = {
    _id: correctUserId,
    username: 'dave',
    email: 'dave.josen@gmail.com',
    password: 'Robstobs201#',
    tokens: [{
        token: correctUserToken
    },
    {
        token: correctUserToken2
    }]
};


const correctUser2 = {
    _id: correctUserId2,
    username: 'tom',
    email: 'tom.josen@gmail.com',
    password: 'Raaazobstobs201#',
    tokens: [{
        token: correctUserToken2
    }]
};

//list of user with different types of error in provided data to test against UserModel schema
const _id = new mongoose.Types.ObjectId();
const noUsernameUser = {
    _id,
    email: 'bob@gmail.com',
    password: 'Jezzy201#'
};
const tooShortUsernameUser = {
    _id,
    username: 'd',
    email: 'bobd@gmail.com',
    password: 'Jezzy201#'
};
const noUniquetUsernameUser = {
    _id,
    username: 'dave',
    email: 'bobd@gmail.com',
    password: 'Jezzy201#'
};
const tooLongUsernameUser = {
    _id,
    username: 'davedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedavedave',
    email: 'bob@gmail.com',
    password: 'Jezzy201#'
};
const noEmailUser = {
    _id,
    username: 'steve',
    password: 'Jezzy201#'
};
const notUniqueEmailUser = {
    _id,
    username: 'steve',
    email: 'dave.josen@gmail.com',
    password: 'Jezzy201#'
};
const notValidEmailUser = {
    _id,
    username: 'steve',
    email: 'bobgmailcom',
    password: 'Jezzy201#'
};
const noPasswordUser = {
    _id,
    username: 'steve',
    email: 'bob@gmail.com'
};
const tooShortPasswordUser = {
    _id,
    username: 'steve',
    email: 'bob@gmail.com',
    password: 'Je2'
};
const notValidPasswordUser = {
    _id,
    username: 'steve',
    email: 'bob@gmail.com',
    password: 'testpassword'
};

const moreThanOneErrorUser = {
    _id,
    username: 's',
    email: 'bobgmail.com',
    password: 'testpassword'
};

const testUserSchemaOnSignUp = async (propToTest, kind, user) => {
    const response = await request(app).post('/task/register').send(user).expect(200);
    expect(response.body.userRegistered).toBeFalsy();
    expect(response.body.statusList).toHaveLength(1);
    expect(response.body.statusList[0][0]).toEqual(propToTest);
    expect(response.body.statusList[0][1]).toEqual(kind);
};


// before any test tear down clear database
beforeEach(async () => {
    await UserModel.deleteMany();
    await new UserModel(correctUser).save();
});

describe('Checking if all props of User model are correctly validated against schema and register route return propper response to frontend', () => {
    // test user name
    test('Should not sign up user without username', async () => {
        await testUserSchemaOnSignUp('username', 'required', noUsernameUser);
    });
    test('Should not sign up user with too short username', async () => {
        await testUserSchemaOnSignUp('username', 'minlength', tooShortUsernameUser);
    });
    test('Should not sign up user with not unique username', async () => {
        await testUserSchemaOnSignUp('username', 'unique', noUniquetUsernameUser);
    });
    test('Should not sign up user with too long username', async () => {
        await testUserSchemaOnSignUp('username', 'maxlength', tooLongUsernameUser);
    });

    // test email
    test('Should not sign up user without email', async () => {
        await testUserSchemaOnSignUp('email', 'required', noEmailUser);
    });
    test('Should not sign up user with not unique email', async () => {
        await testUserSchemaOnSignUp('email', 'unique', notUniqueEmailUser);
    });
    test('Should not sign up user with invalid email', async () => {
        await testUserSchemaOnSignUp('email', 'user defined', notValidEmailUser);
    });

    // test password
    test('Should not sign up user without password', async () => {
        await testUserSchemaOnSignUp('password', 'required', noPasswordUser);
    });
    test('Should not sign up user with too short password', async () => {
        await testUserSchemaOnSignUp('password', 'minlength', tooShortPasswordUser);
    });
    test('Should not sign up user with not valid password', async () => {
        await testUserSchemaOnSignUp('password', 'user defined', notValidPasswordUser);
    });

    // test many errors at one time
    test('Should not sign up user with multiple errors', async () => {
        const response = await request(app).post('/task/register').send(moreThanOneErrorUser).expect(200);
        expect(response.body.userRegistered).toBeFalsy();
        expect(response.body.statusList).toHaveLength(3);
        //error on user name
        expect(response.body.statusList[0][0]).toEqual('username');
        expect(response.body.statusList[0][1]).toEqual('minlength');

        // error on email
        expect(response.body.statusList[1][0]).toEqual('email');
        expect(response.body.statusList[1][1]).toEqual('user defined');

        // error on password
        expect(response.body.statusList[2][0]).toEqual('password');
        expect(response.body.statusList[2][1]).toEqual('user defined');
    });

    // case when valid data provided
    test('Should sign up user with valid properties', async () => {
        const response = await request(app).post('/task/register').send(correctUser2).expect(200);
        expect(response.body.userRegistered).toBeTruthy();
    });
});

describe('Checking logging out user', () => {
    test('Should logout user', async () => {
        await request(app).post('/task/logout').set({ 'x-auth': correctUserToken }).expect(200);
        const user = await UserModel.findById(correctUserId);
        //checking if user.tokens does not contains correctUserToken which should be removed by /task/logout route
        expect(user.tokens.some(({ token }) => token === correctUserToken)).toBeFalsy();
    });
});