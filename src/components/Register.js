import React from 'react';
import { Redirect } from 'react-router-dom'

import uuid from "uuid";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';



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



class Register extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
        netId: '',
        login: false,
        redirect: false
    }

    auth = () => {
        console.log('in auth');
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




    }
    handleClick = (event) => {
        var opt = {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: uuid.v4(),
                email: this.state.username,
                password: this.state.password,
                name: this.state.name,
                netId: this.state.netId,
                reputation: 0
            })
        }
        var bindthis = this;
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "https://sandbox.api.it.nyu.edu/staff-exp/users/net-ids/"+this.state.netId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer 57799210-113b-31dc-a6c6-4ef799ee766c");
            },
            success: function(data){
                if(data && data.length>0){
                    fetch('/register', opt)
                        .then(results => results.json())
                        .then(response => {
                            if (response.ok) {
                                bindthis.auth();
                                bindthis.setState({redirect: true})

                            }
                        });// or .json() or .blob() ...
                }
                else{
                    alert("Not an NYU staff ID");
                }
            }
        });



    }
    render() {
        if(this.state.redirect){
            <Redirect path="/login"/>
        }
        const { classes } = this.props;
        const { login } = this.state;

        if (login)
            return <Redirect exact to="/curation" />;
        else
            return <React.Fragment>
                <TextField
                    helperText="Enter your Name"
                    label="Name"
                    className={classes.textField}
                    onChange={(event) => this.setState({ name: event.target.value })}
                />

                <TextField
                    helperText="Enter your NetId"
                    label="NetId"
                    className={classes.textField}
                    onChange={(event) => this.setState({ netId: event.target.value })}
                />

                <TextField
                    helperText="Enter your Email"
                    label="Email"
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
                    Register
                </Button>
            </React.Fragment>

    }
}

export default withStyles(styles)(Register);