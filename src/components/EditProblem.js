import React from "react";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Typography from '@material-ui/core/Typography';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";

import deburr from "lodash/deburr";

import PropTypes, { element } from "prop-types";
import Downshift from "downshift";

const tags = [
    { label: "Health" },
    { label: "Sustainability" },
    { label: "Finance" },
    { label: "illiteracy" },
    { label: "Education" },
    { label: "Poverty" },
    { label: "Ineffective Government" },
    { label: "Civil Rights" },
    { label: "Pollution" },
    { label: "Immigration" },
    { label: "Homelessness" },
    { label: "Terrorism" },
    { label: "Affordable Housing" },
    { label: "Student Loan Debt" },
    { label: "Police Brutality" },
    { label: "Racism" },
    { label: "Climate Change" },
    { label: "Moral Decline" },
    { label: "Unemployment" },
    { label: "Green Energy" },
    { label: "Bullying" },
    { label: "Income Inequality" },
    { label: "Corporate Influence" },
    { label: "Health Care Reform" },
    { label: "Animal Rights" },
    { label: "Abortion" },
    { label: "Nuclear Weapons" },
    { label: "Defense Spending" },
    { label: "Childhood Obesity" }
]


function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput
                },
                ...InputProps
            }}
            {...other}
        />
    );
}

function renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value, type) {

    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if (type == "tags") {
        return inputLength === 0
            ? []
            : tags.filter(suggestion => {
                const keep =
                    count < 5 &&
                    suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }
    else {
        return inputLength === 0
            ? []
            : suggestions.filter(suggestion => {
                const keep =
                    count < 5 &&
                    suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: ""
    };

    handleKeyDown = event => {
        const { inputValue } = this.state;
        const { tags } = this.props;
        if (
            tags.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1)
            });
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = item => {
        let { selectedItem } = this.state;
        const { handleTagsChange } = this.props;

        this.setState({
            inputValue: ""
        });
        handleTagsChange(item);
    };

    handleDelete = item => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        });
    };

    render() {
        const { classes, handleTagsDelete, tags } = this.props;
        const { inputValue } = this.state;

        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
                selectedItem={tags}
            >
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex
                }) => (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    startAdornment: tags.map(item => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleTagsDelete(item)}
                                        />
                                    )),
                                    onChange: this.handleInputChange,
                                    placeholder: "Select tags for your problem"
                                }),
                                label: "Tags"
                            })}
                            {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {getSuggestions(inputValue2, "tags").map((suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion.label }),
                                            highlightedIndex,
                                            selectedItem: selectedItem2
                                        })
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    )}
            </Downshift>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        margin: theme.spacing.unit * 4
    },
    chip: {
        paddingRight: theme.spacing.unit * 2
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class EditProblem extends React.Component {
    state = {

    }
    componentWillMount() {
        const { problem, experience } = this.props;
        let tags = problem && problem.tags || [];
        for (var i = 0; i < experience.experienceList.length; i++) {
            if (experience.experienceList[i].checked)
                tags = tags.concat(experience.experienceList[i].tags);
        }
        tags = Array.from(new Set(tags));
        this.setState({ ...problem, tags });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    handleTagsChange = item => {
        let { tags } = this.state;

        if (tags.indexOf(item) === -1) {
            tags = [...tags, item];
        }

        this.setState({ tags });
    };

    handleTagsDelete = item => () => {
        this.setState(state => {
            const tags = [...state.tags];
            tags.splice(tags.indexOf(item), 1);
            return { tags };
        });
    };
    render() {
        const { problem, experience, classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={24}>
                    <Grid className={classes.paper} item xs={8}>
                        <Typography variant="h4" align={"center"} gutterTop gutterBottom>
                            Create problem statement
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="title"
                                fullWidth="true"
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                rowsMax="4"
                                margin="normal"
                            />

                            <TextField
                                id="standard-multiline-static"
                                label="Description"
                                fullWidth="true"
                                multiline
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                rows="4"
                                rowsMax="8"
                                margin="normal"
                            />
                            <div className={classes.divider} />

                            <DownshiftMultiple tags={this.state.tags || []} classes={classes} handleTagsChange={this.handleTagsChange} handleTagsDelete={this.handleTagsDelete} />
                        </form>
                    </Grid>
                    <Grid container flex direction="row" justify="center" alignItems="flex-start" spacing={12}>
                        {experience.experienceList.length > 0 && <Grid item sm={5}>
                            <Typography variant="h5" align={"center"} gutterBottom>
                                Experiences
                            </Typography>
                            {experience.experienceList.map((items) =>
                                items.checked &&
                                <Paper className={classes.paper} >
                                    {items.tags.map((tag) => <Chip className={classes.chip} label={tag} />)}
                                    <Typography variant="h5" gutterBottom>{items.text}</Typography>
                                </Paper>
                            )}
                        </Grid>}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        experience: state.experience,
        problem: state.problem.problem
    };
};


export default withStyles(styles)(connect(mapStateToProps)(EditProblem));