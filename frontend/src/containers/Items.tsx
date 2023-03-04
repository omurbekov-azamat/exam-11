import React, {useEffect} from 'react';
import ListGroup from "../components/UI/ListGroup/ListGroup";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../app/hook";
import {fetchProducts} from "../features/product/productsThunk";
import {useSelector} from "react-redux";
import {selectProducts} from "../features/product/productsSlice";
import ProductItems from "../features/product/components/ProductItems";
import {Grid} from "@mui/material";

interface RouteParams extends Record<string, string> {
    categoryName: string;
}

const Items = () => {
    const {categoryName} = useParams<RouteParams>();
    const dispatch = useAppDispatch()
    const products = useSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts(categoryName))
    }, [dispatch, categoryName]);

    return (
        <Grid container direction='row'>
            <ListGroup/>
            <ProductItems items={products} category={categoryName}/>
        </Grid>
    );
};

export default Items;