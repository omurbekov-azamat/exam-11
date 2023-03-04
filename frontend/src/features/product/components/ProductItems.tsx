import React from 'react';
import {Grid, Typography} from "@mui/material";
import ProductItem from "./ProductItem";
import {useAppSelector} from "../../../app/hook";
import {selectProductsLoading} from "../productsSlice";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {ProductApi} from "../../../types";

interface Props {
    items: ProductApi[]
    category: string | undefined;
}

const ProductItems: React.FC<Props> = ({items, category}) => {
    const loading = useAppSelector(selectProductsLoading);

    let textCategory = 'All Categories';

    if (category) {
        textCategory = category;
    }

    return (
        <Grid item xs>
            <Typography component='div' variant='h5' textTransform='capitalize' color='lightseagreen' sx={{mb:1}}>
                {textCategory}
            </Typography>
            {loading && <Spinner/>}
            <Grid container spacing={2} justifyContent='flex-start'>
                {items.map(product => (
                    <ProductItem
                        key={product._id}
                        item={product}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default ProductItems;