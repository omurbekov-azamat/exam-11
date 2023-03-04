import {model, Schema, Types} from "mongoose";
import User from "./User";
import {IProduct} from "../types";

const ProductSchema = new Schema<IProduct>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist',
        },
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    image: {
        type: String,
        required: true,
    },
});

const Product = model('Product', ProductSchema);

export default Product;