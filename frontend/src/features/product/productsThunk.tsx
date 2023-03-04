import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi";
import {OneProductApi, ProductApi, ProductMutation, ValidationError} from "../../types";

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState, rejectValue: ValidationError}>(
    'products/createProduct',
    async (data,{getState, rejectWithValue}) => {
        const user = getState().users.user;
        try {
            if (user) {
                const formData = new FormData();
                const keys = Object.keys(data) as (keyof ProductMutation)[];

                keys.forEach(key => {
                    const value = data[key];

                    if (value !== null) {
                        formData.append(key, value);
                    }
                });

                await axiosApi.post('/products', formData, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }

            throw e;
        }
    }
);

export const fetchProducts = createAsyncThunk<ProductApi[], string | undefined>(
    'products/fetchAll',
    async (category) => {
        try {
            let url = '/products';

            if (category) {
                url = '/products?category_name=' + category;
            }

            const response = await axiosApi.get<ProductApi[]>(url);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const getOneProduct = createAsyncThunk<OneProductApi , string>(
    'products/getOneProduct',
    async (id) => {
        try {
            const response = await axiosApi.get<OneProductApi>('/products?item_id=' + id);
            return response.data
        } catch (e) {
            throw e;
        }
    }
);