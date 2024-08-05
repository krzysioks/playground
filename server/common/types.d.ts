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
    _id: Types.ObjectId;
    name: string;
    creationDate: number;
    status: boolean;
    taskOwnerId?: Types.ObjectId;
}

// types for tests
export interface UserTestType extends UserType {
    _id: Types.ObjectId;
    username?: string;
    email?: string;
    password?: string;
    tokens?: TokenType[];
}

export interface TaskTestType extends TaskType {
    _id?: Types.ObjectId;
    name?: string;
    creationDate?: number;
    status?: boolean;
    taskOwnerId?: Types.ObjectId;
}

interface ViewPortOptionType {
    width: number;
    height: number;
}

export interface ViewPortType {
    vpQHD: ViewPortOptionType;
    vpHD: ViewPortOptionType;
}
