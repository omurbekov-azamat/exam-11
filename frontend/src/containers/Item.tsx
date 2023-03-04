import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hook";
import {useParams} from "react-router-dom";
import {getOneProduct} from "../features/product/productsThunk";
import {selectOneProduct, selectOneProductLoading} from "../features/product/productsSlice";
import ItemCard from "../features/product/components/ItemCard";
import Spinner from "../components/UI/Spinner/Spinner";

const Item = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams() as { id: string };
    const oneProduct = useAppSelector(selectOneProduct);
    const loading = useAppSelector(selectOneProductLoading)


    useEffect(() => {
        dispatch(getOneProduct(id))
    }, [dispatch, id]);

    return (
        <>
            {loading && <Spinner/>}
            {oneProduct && <ItemCard item={oneProduct}/>}
        </>
    );
};

export default Item;