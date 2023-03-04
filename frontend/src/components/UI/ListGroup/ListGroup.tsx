import React from 'react';
import {NavLink} from "react-router-dom";
import {Grid, Typography} from "@mui/material";
import {CATEGORIES} from "../../../constants";

const ListGroup = () => {
    return (
        <Grid item xs={2}>
            <Grid container direction='column'>
                <Grid item>
                    <Typography component='div' variant='h6' textTransform='uppercase'>
                        <NavLink to={'/items'}>Items</NavLink>
                    </Typography>
                </Grid>
                {CATEGORIES.map(category =>(
                    <Grid item key={category.id}>
                        <Typography component='div' variant='h6' textTransform='uppercase'>
                            <NavLink to={'/category/' + category.id}>{category.title}</NavLink>
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default ListGroup;