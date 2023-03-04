import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createProduct} from "./productsThunk";
import {ValidationError} from "../../types";

interface ProductsState {
    createProductLoading: boolean;
    productError: ValidationError | null;
}

const initialState: ProductsState = {
    createProductLoading: false,
    productError: null,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.productError = null;
            state.createProductLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state) => {
            state.createProductLoading = false;
        });
        builder.addCase(createProduct.rejected, (state,{payload: error}) => {
            state.createProductLoading = false;
            state.productError = error || null;
        });
    }
});

export const productsReducer = productsSlice.reducer;

export const selectCreateProductLoading = (state: RootState) => state.products.createProductLoading;
export const selectProductError = (state: RootState) => state.products.productError;