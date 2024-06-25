import { HydratedDocument, Model, model, Schema, Query } from 'mongoose';
import validator from 'validator';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { TokenType, UserType } from '../common/types';

interface JwtPayloadExtended extends JwtPayload {
    _id: string;
}

type UpdateOneType = Query<
    UserType,
    HydratedDocument<UserType, UserMethodsType>,
    {},
    HydratedDocument<UserType, UserMethodsType>,
    'find'
>;

interface UserMethodsType {
    generateAuthToken: () => string;
    removeToken: (token: string) => UpdateOneType;
}

type UserDocumentType = Promise<HydratedDocument<UserType, UserMethodsType>>;

interface UserModelType extends Model<UserType, {}, UserMethodsType> {
    findByCredentials: (username: string, password: string) => UserDocumentType;
    findUserByToken: (token: string) => UserDocumentType;
}

const userSchema = new Schema<UserType, UserModelType, UserMethodsType>({
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
        validate(value: string) {
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
        validate(value: string) {
            if (
                !validator.matches(
                    value,
                    /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])/
                )
            ) {
                throw new Error(
                    'Password must have at least one: large and small letter, number, special character "!@#$%^&*())"'
                );
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.method('generateAuthToken', function generateAuthToken(): string {
    const token: string = jwt.sign(
        { _id: this._id.toString() },
        process.env.JWT_SECRET as string
    );
    this.tokens = [...this.tokens, { token }] as TokenType[];
    this.save();
    return token;
});

userSchema.method(
    'removeToken',
    function removeToken(token: string): UpdateOneType {
        //$pull operator pulls out the object which match token and removes all its props
        return this.updateOne({
            $pull: {
                tokens: {
                    token
                }
            }
        });
    }
);

userSchema.static(
    'findByCredentials',
    async function createWithFullName(
        username: string,
        password: string
    ): UserDocumentType {
        const user = await this.findOne({ username });

        if (!user) {
            throw new Error(
                JSON.stringify({ isUser: false, passwordMatched: false })
            );
        }

        //comparing privided plain text password with hashed one stored in db
        const isPasswordMatched: boolean = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordMatched) {
            throw new Error(
                JSON.stringify({ isUser: true, passwordMatched: false })
            );
        }
        return user;
    }
);

userSchema.static(
    'findUserByToken',
    async function findUserByToken(token: string): UserDocumentType {
        const { _id } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayloadExtended;
        const user = await UserModel.findOne({ _id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        return user;
    }
);

//for given schema we can provide middleware which will be executed before (UserSchema.pre()) or after (UserSchema.post()) the event (in this case 'run middleaware before saving user to db')
userSchema.pre('save', async function (next): Promise<void> {
    if (this.isModified('password')) {
        const salt: string = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } else {
        next();
    }
});

const UserModel = model<UserType, UserModelType>('User', userSchema);

export default UserModel;
