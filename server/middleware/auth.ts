// middleware which retrieve token from the request and verifies if given user is authorized to access restricted areas of REST API
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get token from request's header
        const token = req.header('x-auth') as string;
        //use jwt.verify with provided secret to parse token and be able to retrieved data stored there (i.e.: _id of the user).
        const result = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        const { _id } = result;

        //try to get user with given id from database and which still have in tokens array given token -> user is still logged in. Otherwise it means, that user has logged out and is no more priviled to access restricted area
        const user = await UserModel.findOne({ _id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        next();
    } catch (err) {
        res.status(401).send({ error: 'NOT_PRIVILEGED' });
    }
};

export default auth;
