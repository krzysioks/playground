import { HydratedDocument, Model, Types } from 'mongoose';

interface ErrorsOptions {
    kind: string;
    message: string;
}

export interface CatchErrorType {
    errors: Record<string, ErrorsOptions>;
    errmsg: string;
}

export type ErrorReturnType = [string, string, string];

export interface TokenType {
    token: string;
}

export interface UserType {
    username: string;
    email: string;
    password: string;
    tokens: TokenType[];
}

export interface TaskType {
    name: string;
    creationDate: number;
    status: boolean;
    taskOwnerId?: Types.ObjectId;
}
