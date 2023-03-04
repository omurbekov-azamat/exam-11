import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createProduct, deleteProduct, fetchProducts, getOneProduct} from "./productsThunk";
import {OneProductApi, ProductApi, ValidationError} from "../../types";

interface ProductsState {
    createProductLoading: boolean;
    productError: ValidationError | null;
    products: ProductApi[];
    productsFetchingLoading: boolean;
    oneProduct: OneProductApi | null;
    oneProductFetchingLoading: boolean;
    deleteProductLoading: boolean;
}

const initialState: ProductsState = {
    createProductLoading: false,
    productError: null,
    products: [],
    productsFetchingLoading: false,
    oneProduct: null,
    oneProductFetchingLoading: false,
    deleteProductLoading: false,
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
        builder.addCase(fetchProducts.pending, (state) => {
            state.products = [];
            state.productsFetchingLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state,{payload: products}) => {
            state.productsFetchingLoading = false;
            state.products = products;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.productsFetchingLoading = false;
        });
        builder.addCase(getOneProduct.pending, (state) => {
            state.oneProduct = null;
            state.oneProductFetchingLoading = true;
        });
        builder.addCase(getOneProduct.fulfilled, (state, {payload: product}) => {
            state.oneProductFetchingLoading = false;
            state.oneProduct = product;
        });
        builder.addCase(getOneProduct.rejected, (state) => {
            state.productsFetchingLoading = false;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.deleteProductLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.deleteProductLoading = false;
        });
        builder.addCase(deleteProduct.rejected, (state) => {
            state.deleteProductLoading = false;
        });
    }
});

export const productsReducer = productsSlice.reducer;

export const selectCreateProductLoading = (state: RootState) => state.products.createProductLoading;
export const selectProductError = (state: RootState) => state.products.productError;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.productsFetchingLoading
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectOneProductLoading = (state: RootState) => state.products.oneProductFetchingLoading;
export const selectDeleteProduct = (state: RootState) => state.products.deleteProductLoading;