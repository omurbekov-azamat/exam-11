export interface User {
    username: string;
    displayName: string;
    phoneNumber: string;
    _id: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export type GlobalError = {
    error: string;
}