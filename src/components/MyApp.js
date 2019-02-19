import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import MyAppBar from "./MyAppBar";
import LandingForm from "./LandingForm";
import CurationForm from "./CurationForm";
import Login from "./Login";
import Register from "./Register";
import EditProblem from "./EditProblem";
import Repository from "./Repository"

const theme = createMuiTheme({
    palette: {
        primary: grey,
    }
});


export default (props) => {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <MyAppBar />
                <Switch>
                    <Route exact path="/" component={LandingForm} />
                    <Route path="/signup" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/curation" component={CurationForm} />
                    <Route path="/edit_problem" component={EditProblem}/>
                    <Route path="/repository" component={Repository}/>
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}