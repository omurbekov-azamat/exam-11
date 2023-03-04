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

export interface ProductMutation {
    title: string;
    category: string;
    description: string;
    price: string;
    image: File | null;
}

export interface ProductApi {
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    user: string;
    _id: string;
}

export interface OneProductApi {
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    user: {
        _id: string;
        username: string;
        displayName: string;
        phoneNumber: string;
    };
    _id: string;
}