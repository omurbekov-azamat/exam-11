import {ObjectId} from "mongoose";

export interface IUser {
    username: string
    password: string;
    displayName: string;
    phoneNumber: string;
    token: string;
}

export interface IProduct {
    user: ObjectId
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
}