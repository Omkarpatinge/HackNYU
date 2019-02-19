import React from "react";import { getProblems } from '../actions/problem';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    chip: {
        paddingRight: theme.spacing.unit * 2
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
});

const mapStateToProps = state => {
    return {
        problem: state.problem
    };
};

class Repository extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    loadData = (text = '') => {
        this.props.dispatch(getProblems(text));
    }
    componentDidMount() {
        this.loadData();
    }

    handleChangeSearch = (event) => {
        this.loadData(event.target.value);
    }

    render() {
        const {problem,classes } = this.props;
        console.log(problem.problemList);
        const { expanded } = this.state;

        return (
            <div>
                <Grid item xs={8}>
                    <TextField
                        id="standard-search"
                        label="Search"
                        type="search"
                        fullWidth="true"
                        margin="normal"
                        onChange={this.handleChangeSearch }
                    />
                </Grid>



                {problem.problemList.length > 0 && <div className={classes.root}>

                    {problem.problemList.map( (prob,idx) =>
                        <ExpansionPanel expanded={expanded === prob.id} onChange={this.handleChange(prob.id)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{prob.title}</Typography>

                                {prob.tags.map((tag) => <Chip className={classes.chip} label={tag} />)}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item sm={8}>
                                    <Typography className={classes.secondaryHeading}>{prob.description}</Typography>
                                </Grid>
                                <Grid item sm={4}>
                                    <div className={classes.root}>
                                        Progress: {prob.progress}%<LinearProgress variant="determinate" value={prob.progress} />

                                        <ThumbDown className={classes.icon} /> {prob.votes.down}
                                        <ThumbUp className={classes.icon}/> {prob.votes.up}

                                    </div>
                                </Grid>


                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>}
            </div>
        )
    }
}


Repository.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Repository));





