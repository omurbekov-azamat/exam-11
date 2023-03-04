import React from 'react';
import {useNavigate} from "react-router-dom";
import {deleteProduct} from "../productsThunk";
import {selectDeleteProduct} from "../productsSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {selectUser} from "../../user/usersSlice";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import {LoadingButton} from "@mui/lab";
import {Grid} from "@mui/material";
import {apiURL} from "../../../constants";
import {OneProductApi} from "../../../types";

interface Props {
    item: OneProductApi;
}

const ItemCard: React.FC<Props> = ({item}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate()
    const loading = useAppSelector(selectDeleteProduct);

    const deleteCard = async (id: string) => {
        await dispatch(deleteProduct(id));
        await navigate('/items');
    };

    return (
        <Card sx={{maxWidth: 345, textTransform: 'capitalize'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        A
                    </Avatar>
                }
                title={'Name: ' + item.user.displayName}
                subheader={'Title: ' + item.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={apiURL + '/' + item.image}
                alt={item.title}
            />
            <CardContent>
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle1" color="black">
                            Category: {item.category}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="red">
                            Description: {item.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="blue">
                            Price: {item.price} som
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color='green'>
                            Phone: {item.user.phoneNumber}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {user && user.username === item.user.username && (
                            <LoadingButton
                                type='submit'
                                color='secondary'
                                variant='contained'
                                onClick={() => deleteCard(item._id)}
                                loading={loading}
                            >
                                Delete
                            </LoadingButton>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ItemCard;