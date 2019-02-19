import React from 'react';
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    }
});


class Login extends React.Component {
    constructor(props) {
        super(props);
        var token = localStorage.getItem('hack-nyu-auth');
        if (token) {
            this.state = {
                login: true,
                username: '',
                password: ''
            }
        } else {
            this.state = {
                login: false,
                username: '',
                password: ''
            }
        }

    }
    handleClick = (event) => {
        var opt = {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })
        }
        fetch('/auth', opt)
            .then(results => results.json())
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('hack-nyu-auth', response.data.token);
                    this.setState({ login: true });
                }
            });
    }
    render() {
        const { classes } = this.props;
        const { login } = this.state;

        if (login)
            return <Redirect exact to="/curation" />;
        else
            return <React.Fragment>
                <TextField
                    helperText="Enter your Username"
                    label="Username"
                    className={classes.textField}
                    onChange={(event) => this.setState({ username: event.target.value })}
                />

                <TextField
                    type="password"
                    helperText="Enter your Password"
                    label="Password"
                    className={classes.textField}
                    onChange={(event) => this.setState({ password: event.target.value })}
                />

                <Button 
                    variant="raised" 
                    color="primary" 
                    onClick={(event) => this.handleClick(event)} 
                    className={classes.button} 
                >
                    Login
                </Button>
            </React.Fragment>

    }
}

export default withStyles(styles)(Login);