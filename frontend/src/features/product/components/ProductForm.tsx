import React, {useState} from "react";
import {useAppSelector} from "../../../app/hook";
import {selectCreateProductLoading, selectProductError} from "../productsSlice";
import {Grid, MenuItem, TextField, Typography} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import FileInput from '../../../components/UI/FileInput/FileInput';
import {categories} from "../../../constants";
import {ProductMutation} from '../../../types';

interface Props {
    onSubmit: (mutation: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmit}) => {
    const error = useAppSelector(selectProductError);
    const loading = useAppSelector(selectCreateProductLoading);

    const [product, setProduct] = useState<ProductMutation>({
        title: '',
        category: '',
        description: '',
        price: '',
        image: null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(product);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProduct(prev => {
            return {...prev, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        setProduct(prev => ({
            ...prev, [name]: files && files[0] ? files[0] : null,
        }));
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography component='div' variant='h5'>
                        Add new post
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="title" label="Title"
                        value={product.title}
                        onChange={inputChangeHandler}
                        name="title"
                        error={Boolean(getFieldError('title'))}
                        helperText={getFieldError('title')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={inputChangeHandler}
                        sx={{width: '233px'}}
                        error={Boolean(getFieldError('category'))}
                        helperText={getFieldError('category')}
                        required
                    >
                        <MenuItem value="" disabled>Please select a category</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        id="description" label="Description"
                        value={product.description}
                        onChange={inputChangeHandler}
                        name="description"
                        error={Boolean(getFieldError('description'))}
                        helperText={getFieldError('description')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        type='number'
                        id="price" label="Price"
                        value={product.price}
                        onChange={inputChangeHandler}
                        name="price"
                        error={Boolean(getFieldError('price'))}
                        helperText={getFieldError('price')}
                        required
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        label="Image"
                        onChange={fileInputChangeHandler}
                        name="image"/>
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type='submit'
                        color='warning'
                        loading={loading}
                        variant='contained'
                        sx={{mb: 2}}
                    >
                        Create
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;