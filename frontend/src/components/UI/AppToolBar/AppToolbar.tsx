import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hook";
import {selectUser} from "../../../features/user/usersSlice";
import {styled, AppBar, Toolbar, Grid, Typography} from "@mui/material";
import AnonymousMenu from "./AnonymousMenu";
import UserMenu from "./UserMenu";


const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        <Link to="/items">Flea market</Link>
                    </Typography>
                    <Grid item>
                        {user ? (
                            <UserMenu user={user}/>
                        ) : (
                            <AnonymousMenu/>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;