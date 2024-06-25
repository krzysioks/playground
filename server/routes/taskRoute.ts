import express, { Express, Request, Response } from 'express';
import type { CatchErrorType, ErrorReturnType } from '../common/types';
import { isValidObjectId } from 'mongoose';
//UserModel,TaskModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)).
import UserModel from '../models/user';
import TaskModel from '../models/task';
import _ from 'lodash';
import { handleError } from '../common/utils';
import auth from '../middleware/auth';

const taskRouter: Express = express();

taskRouter.post(
    '/task/login',
    async (req: Request, res: Response): Promise<void> => {
        const { username, password } = _.pick(req.body, [
            'username',
            'password'
        ]);
        try {
            //checking if user with provided credenatials exists
            const user = await UserModel.findByCredentials(username, password);

            //if user exists and password match -> send success response to front end and generate authentication token
            const token: string = await user.generateAuthToken();
            res.status(200).send({
                isUser: true,
                passwordMatched: true,
                token
            });
        } catch (err: any) {
            res.status(200).send(err?.message);
        }
    }
);

taskRouter.post(
    '/task/signupUser',
    async (req: Request, res: Response): Promise<void> => {
        const { username, password, email } = _.pick(req.body, [
            'username',
            'password',
            'email'
        ]);

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
            const statusList: ErrorReturnType[] = handleError(
                err as CatchErrorType,
                ['username', 'email']
            );
            res.status(200).send({ userRegistered: false, statusList });
        }
    }
);

taskRouter.post('/task/add', auth, async (req: Request, res: Response) => {
    const { name, status } = _.pick(req.body, ['name', 'status']);
    const token = req.header('x-auth') as string;
    const user = await UserModel.findUserByToken(token);
    const task = new TaskModel({
        name,
        status,
        creationDate: new Date().getTime(),
        taskOwnerId: user._id
    });
    try {
        await task.save();
        res.status(200).send({ taskAdded: true });
    } catch (err) {
        const statusList: ErrorReturnType[] = handleError(
            err as CatchErrorType
        );
        res.status(200).send({ taskAdded: false, statusList });
    }
});

taskRouter.post('/task/edit', auth, async (req: Request, res: Response) => {
    //prepare list of keys to update except for _id
    const keysToUpdate: string[] = Object.keys(req.body).filter(
        key => key !== '_id'
    );
    let updateObj: Record<string, string> = {};
    keysToUpdate.forEach((key: string) => {
        updateObj[key] = req.body[key];
    });

    //if req.body._id is not valid -> return error
    if (!isValidObjectId(req.body._id)) {
        res.status(400).send({ errorMessage: 'Provided task id is not valid' });
        return;
    }
    const token = req.header('x-auth') as string;
    const user = await UserModel.findUserByToken(token);
    await TaskModel.findOneAndUpdate(
        { _id: req.body._id, taskOwnerId: user._id },
        updateObj,
        {
            useFindAndModify: false
        }
    );
    res.status(200).send({});
});

taskRouter.post('/task/delete', auth, async (req: Request, res: Response) => {
    //if req.body._id is not valid -> return error
    if (!isValidObjectId(req.body._id)) {
        res.status(400).send({ errorMessage: 'Provided task id is not valid' });
        return;
    }

    try {
        const result = await TaskModel.deleteOne({ _id: req.body._id });
        if (!result.deletedCount) {
            throw new Error();
        }
        res.status(200).send({});
    } catch (error) {
        res.status(400).send({
            errorMessage: 'Failed to remove task - already deleted'
        });
    }
});

taskRouter.post('/task/logout', auth, async (req: Request, res: Response) => {
    const token = req.header('x-auth') as string;

    try {
        const user = await UserModel.findUserByToken(token);
        await user.removeToken(token);
        res.status(200).send({});
    } catch (error) {
        res.status(400).send({});
    }
});

taskRouter.get('/task/all', auth, async (req: Request, res: Response) => {
    const token = req.header('x-auth') as string;

    try {
        const user = await UserModel.findUserByToken(token);
        const tasks = await TaskModel.find({ taskOwnerId: user._id });
        res.status(200).send({ tasks });
    } catch (error) {
        res.status(200).send({ tasks: [] });
    }
});

export default taskRouter;
