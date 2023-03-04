import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiURL} from "../../../constants";
import {NavLink} from "react-router-dom";
import {ProductApi} from "../../../types";

interface Props {
    item: ProductApi;
}

const ProductItem: React.FC<Props> = ({item}) => {
    return (
        <Grid item>
            <Card sx={{ width: 200 }}>
                <CardActionArea component={NavLink} to={'/items/' + item._id}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={apiURL + '/' + item.image}
                        alt={item.category}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Title: {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {item.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default ProductItem;