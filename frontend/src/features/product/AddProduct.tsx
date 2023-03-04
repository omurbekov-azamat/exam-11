import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectUser} from "../user/usersSlice";
import {useNavigate} from "react-router-dom";
import {createProduct} from "./productsThunk";
import ProductForm from "./components/ProductForm";
import {ProductMutation} from "../../types";

const AddProduct = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/items');
        }
    }, [user]);

    const onFormSubmit = async (product: ProductMutation) => {
        await dispatch(createProduct(product)).unwrap();
        await navigate('/items')
    }

    return (
        <ProductForm onSubmit={onFormSubmit}/>
    );
};

export default AddProduct;