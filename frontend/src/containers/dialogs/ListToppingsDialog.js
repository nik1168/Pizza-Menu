import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {bindActionCreators} from "redux";
import * as toppingActions from "../../actions/topping";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListToppings from "../../components/ListToppings";
import {TRASH_ACTION} from "../../utils/constants";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

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

class ListToppingsDialog extends Component {

    /**
     * Local state
     * @type {{toppingName: string}}
     */
    state = {
        toppingName: ""
    };

    /**
     * Close button of dialog
     */
    handleClose = () => {
        this.props.onClose(this.props.identifier)
    };

    /**
     * Ok button of dialog
     */
    handleAccept = () => {
        this.props.onClose(this.props.identifier)
    };

    /**
     * Updates the name of the topping
     * @param name
     */
    handleTextFieldChange = (name) => {
        this.setState(state => ({
            toppingName: name
        }));
    };

    /**
     * Deletes a topping
     * @param toppingId
     */
    handleClick = (toppingId) => {
        this.props.fetchDeleteTopping(toppingId, () => {
            this.props.fetchToppings();
        });


    };

    /**
     * Adds a topping
     */
    addTopping = () => {
        if(this.state.toppingName.length > 0){
            this.props.fetchAddTopping({name: this.state.toppingName}, () => {
                this.props.fetchToppings();
                this.setState(state => ({
                    toppingName: ""
                }));
            });
        }
        else{
            alert("Topping name is empty!")
        }

    };

    render() {
        const {classes, title, open, onClose, toppings, isFetchingToppings, clickToppings} = this.props;
        const AddButton = (props) => (
            <IconButton>
                <AddIcon onClick={props.onAdd}/>
            </IconButton>
        );
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
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Add new Topping"
                        value={this.state.toppingName}
                        fullWidth
                        InputProps={{endAdornment: <AddButton onAdd={this.addTopping}/>}}
                        onChange={(event) => this.handleTextFieldChange(event.target.value)}
                    />

                    {
                        !isFetchingToppings ?
                            <ListToppings
                                toppings={toppings}
                                iconAction={TRASH_ACTION}
                                handleClick={clickToppings ? this.handleClick : null}
                                checkedValues={this.state.checkedValues}/>
                            :
                            <CircularProgress/>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAccept} color="primary">
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ListToppingsDialog)))
