import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import {bindActionCreators} from "redux";
import * as toppingActions from "../../actions/topping";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
    container: {
        maxWidth: 600,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    stepsContainer: {
        marginLeft: 72,
        textAlign: 'left',
        marginTop: 20,
        height: 65
    },
    bottomMargin: {
        marginBottom: theme.spacing(2)
    },
    buttonOk: {
        marginTop: theme.spacing(2),
        textAlign: 'right'
    }
});

class AddPizzaDialog extends Component {


    state = {
        activeStep: 0,
        checkedValues: [],
        pizzaName: ""
    };

    handleCheck(e, x) {
        this.setState(state => ({
            checkedValues: state.checkedValues.includes(x)
                ? state.checkedValues.filter(c => c !== x)
                : [...state.checkedValues, x]
        }));
    }

    handleTextFieldChange = (name) => {
        this.setState(state => ({
            pizzaName: name
        }));
    };

    handleClose = () => {
        this.props.onClose(this.props.identifier)
    };

    createPizza = () => {
        const toppings = this.state.checkedValues.map(val => ({id: val}));
        const name = this.state.pizzaName;
        const pizzaTopping = {
            name,
            toppings
        };

        this.props.onAcceptCreate(pizzaTopping)
    };


    render() {
        const {classes, open, onClose, toppings, isFetchingToppings} = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='paper'
            >
                <DialogTitle id="form-dialog-title">Add Pizza</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="name"
                        value={this.state.pizzaName}
                        onChange={(event) => this.handleTextFieldChange(event.target.value)}
                        fullWidth
                    />
                    {
                        !isFetchingToppings ? toppings.map((topping, index) =>
                                <List>
                                    <ListItem key={index} button>
                                        <ListItemText id={index} primary={topping.name}/>
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                key={index}
                                                label={topping.name}
                                                onChange={e => this.handleCheck(e, topping.id)}
                                                checked={this.state.checkedValues.includes(topping.id)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            ) :
                            <CircularProgress/>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.createPizza} color="primary">
                        Ok
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        toppings: state.topping.toppings,
        isFetchingToppings: state.topping.isFetchingToppings
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...toppingActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AddPizzaDialog)))
