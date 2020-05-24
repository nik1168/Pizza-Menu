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
const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

class AddPizzaDialog extends Component {


    state = {
        activeStep: 0,
        checkedValues: [],
        data: ["apple", "kiwi", "banana", "lime", "orange", "grape"]
    };

    handleCheck(e,x) {
        this.setState(state => ({
            checkedValues: state.checkedValues.includes(x)
                ? state.checkedValues.filter(c => c !== x)
                : [...state.checkedValues, x]
        }));
    }

    handleClose = () => {
        this.props.onClose(this.props.identifier)
    };



    render() {
        const {classes, open, onClose} = this.props;

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
                        id="name"
                        label="name"
                        fullWidth
                    />
                    {
                        this.state.data.map((x, index) =>
                            <List>
                                <ListItem key={index} button>
                                    <ListItemText id={index} primary={x}/>
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            key={index}
                                            label={x}
                                            onChange={e => this.handleCheck(e,x)}
                                            checked={this.state.checkedValues.includes(x)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>

                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>

            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        holes: [],
    }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(AddPizzaDialog)))
