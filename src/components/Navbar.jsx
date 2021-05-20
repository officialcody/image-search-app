import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    appbar: {
        backgroundColor: '#efa013'
    }
}));


const Navbar = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Pixabay Image Search App
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
