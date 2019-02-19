import React from "react";
import { connect } from 'react-redux';
import uuid from "uuid";

import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const tags = [
    {label:"Health"},
    {label:"Sustainability"},
    {label:"Finance"},
    {label:"illiteracy"},
    {label:"Education"},
    {label:"Poverty"},
    {label:"Ineffective Government"},
    {label:"Civil Rights"},
    {label:"Pollution"},
    {label:"Immigration"},
    {label:"Homelessness"},
    {label:"Terrorism"},
    {label:"Affordable Housing"},
    {label:"Student Loan Debt"},
    {label:"Police Brutality"},
    {label:"Racism"},
    {label:"Climate Change"},
    {label:"Moral Decline"},
    {label:"Unemployment"},
    {label:"Green Energy"},
    {label:"Bullying"},
    {label:"Income Inequality"},
    {label:"Corporate Influence"},
    {label:"Health Care Reform"},
    {label:"Animal Rights"},
    {label:"Abortion"},
    {label:"Nuclear Weapons"},
    {label:"Defense Spending"},
    {label:"Childhood Obesity"}
]

const suggestions = [
    {label:"Profession"},
    {label:"Professors"},
    {label:"Teachers"},
    {label:"Actors"},
    {label:"Clergy"},
    {label:"Musicians"},
    {label:"Philosophers"},
    {label:"Visual Artists"},
    {label:"Writers"},
    {label:"Audiologists"},
    {label:"Chiropractors"},
    {label:"Dentists"},
    {label:"Dietitians"},
    {label:"Doctors"},
    {label:"Medical Laboratory Scientists"},
    {label:"Midwives"},
    {label:"Nurses"},
    {label:"Occupational therapists"},
    {label:"Optometrists"},
    {label:"Pathologists"},
    {label:"Pharmacists"},
    {label:"Physical therapists"},
    {label:"Physicians"},
    {label:"Psychologists"},
    {label:"Speech-language pathologists"},
    {label:"Accountants"},
    {label:"Actuaries"},
    {label:"Agriculturists"},
    {label:"Architects"},
    {label:"Economists"},
    {label:"Engineers"},
    {label:"Interpreters"},
    {label:"Attorney at law"},
    {label:"Advocates"},
    {label:"Solicitors"},
    {label:"Librarians"},
    {label:"Statisticians"},
    {label:"Surveyors"},
    {label:"Urban planners"},
    {label:"Human resources"},
    {label:"Firefighters"},
    {label:"Judges"},
    {label:"Military officers"},
    {label:"Police officers"},
    {label:"Air traffic controllers"},
    {label:"Aircraft pilots"},
    {label:"Sea captains"},
    {label:"Scientists"},
    {label:"Astronomers"},
    {label:"Biologists"},
    {label:"Botanists"},
    {label:"Ecologists"},
    {label:"Geneticists"},
    {label:"Immunologists"},
    {label:"Pharmacologists"},
    {label:"Virologists"},
    {label:"Zoologists"},
    {label:"Chemists"},
    {label:"Geologists"},
    {label:"Meteorologists"},
    {label:"Oceanographers"},
    {label:"Physicists"},
    {label:"Programmers"},
    {label:"Web developers"},
    {label:"Designers"},
    {label:"Graphic designers"},
    {label:"Web designers"},
    {label:"Other"}
];

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

function getSuggestions(value,type) {

    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    if(type == "tags"){
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
    else{
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
                                    {getSuggestions(inputValue2,"tags").map((suggestion, index) =>
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
        margin: theme.spacing.unit * 2
    },
    container: {
        flexGrow: 1,
        position: "relative"
    },
    paper: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class LandingForm extends React.Component {
    state = {
        'profession': '',
        'text': '',
        'tags': []
    };
    handleProfessionChange = profession => {
        this.setState(state => {
            return { profession }
        });
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleTagsChange = item => {
        let { tags } = this.state;

        if (tags.indexOf(item) === -1) {
            tags = [...tags, item];
        }

        this.setState(state => {
            return { tags };
        });
    };

    handleTagsDelete = item => () => {
        this.setState(state => {
            const tags = [...state.tags];
            tags.splice(tags.indexOf(item), 1);
            return { tags };
        });
    };

    handleSubmit = () => {
        const opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...this.state,
                id: uuid.v4()
            })
        }
        fetch('/api/experience', opt)
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    this.setState(state => {
                        return {
                            'profession': '',
                            'text': '',
                            'tags': []
                        }
                    })
                }
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item sm={6} xs={10}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" gutterBottom>
                                What troubles you ?
                    </Typography>
                            <form className={classes.container} noValidate autoComplete="off">
                                <Downshift id="downshift-simple" 
                                    onChange={this.handleProfessionChange}>
                                    {({
                                        getInputProps,
                                        getItemProps,
                                        getMenuProps,
                                        highlightedIndex,
                                        inputValue,
                                        isOpen,
                                        selectedItem
                                    }) => (
                                            <div className={classes.container}>
                                                {renderInput({
                                                    fullWidth: true,
                                                    classes,
                                                    InputProps: getInputProps({
                                                        placeholder: "What do you do?"
                                                    })
                                                })}
                                                <div {...getMenuProps()}>
                                                    {isOpen ? (
                                                        <Paper className={classes.paper} square>
                                                            {getSuggestions(inputValue,"prof").map((suggestion, index) =>
                                                                renderSuggestion({
                                                                    suggestion,
                                                                    index,
                                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                                    highlightedIndex,
                                                                    selectedItem
                                                                })
                                                            )}
                                                        </Paper>
                                                    ) : null}
                                                </div>
                                            </div>
                                        )}
                                </Downshift>
                                <div className={classes.divider} />

                                <TextField
                                    id="standard-multiline-static"
                                    fullWidth="true"
                                    label="Text"
                                    multiline
                                    value={this.state.text}
                                    onChange={this.handleChange('text')}
                                    rows="4"
                                    rowsMax="8"
                                    placeholder="Describe your trouble"
                                    margin="normal"
                                />
                                <div className={classes.divider} />
                                <DownshiftMultiple tags={this.state.tags} classes={classes} handleTagsChange={this.handleTagsChange} handleTagsDelete={this.handleTagsDelete} />
                                <div className={classes.divider} />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };
}


LandingForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        experience: state.experience
    }
};

export default withStyles(styles)(connect(mapStateToProps)(LandingForm));