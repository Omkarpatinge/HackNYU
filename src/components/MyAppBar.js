import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MyAppBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.root}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <span class={classes.flex} />
                        <Link to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button color="inherit">Register</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAppBar);