const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Provided email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!validator.matches(value, /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/)) {
                throw new Error('Password must have at least one: large and small letter, number, special character "!@#$%^&*())"');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'thisismysecret');
    this.tokens = [...this.tokens, { token }];
    this.save();
    return token;

}

userSchema.statics.findByCredentials = async function (username, password) {
    const user = await this.findOne({ username });

    if (!user) {
        throw new Error(JSON.stringify({ isUser: false, passwordMatched: false }));
    }

    //comparing privided plain text password with hashed one stored in db
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {

        throw new Error(JSON.stringify({ isUser: true, passwordMatched: false }));
    }
    return user;
};

//for given schema we can provide middleware which will be executed before (UserSchema.pre()) or after (UserSchema.post()) the event (in this case 'run middleaware before saving user to db')
userSchema.pre('save', async function (next) {
    // console.info('middleware runs');
    if (this.isModified('password')) {
        // console.log('if 1');
        const salt = await bcrypt.genSalt(10);
        // console.log('const salt: ', salt);
        this.password = await bcrypt.hash(this.password, salt);
        // console.log('this.password: ', this.password, this);
        next();
    } else {
        // console.log('if 2');
        next();
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;