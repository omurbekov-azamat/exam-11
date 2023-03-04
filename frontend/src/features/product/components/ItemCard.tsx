import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import {apiURL} from "../../../constants";
import {OneProductApi} from "../../../types";

interface Props {
    item: OneProductApi;
}

const ItemCard: React.FC<Props> = ({item}) => {
    return (
        <Card sx={{ maxWidth: 345, textTransform: 'capitalize' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
                <Typography variant="body2" color="black">
                    Category: {item.category}
                </Typography>
                <Typography variant="body2" color="red">
                    Description: {item.description}
                </Typography>
                <Typography variant="body2" color="blue">
                    Price: {item.price}
                </Typography>
                <Typography variant="body2" color='green'>
                    Phone: {item.user.phoneNumber}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ItemCard;