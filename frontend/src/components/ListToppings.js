import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import List from "@material-ui/core/List";
import {CHECK_ACTION} from "../utils/constants";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    primary: {
        marginRight: theme.spacing(2)
    },
    secondary: {
        background: theme.palette.secondary['100'],
        color: 'white'
    },
    spaceTop: {
        marginTop: 20
    }
});

class ListToppings extends Component {
    state = {
        checkedValues: []
    };


    render() {
        const {classes, toppings, handleClick, checkedValues, iconAction} = this.props;
        return (
            <List>
                {toppings.map((topping, index) =>
                    <ListItem key={index} button>
                        <ListItemText id={index} primary={topping.name}/>
                        {
                            handleClick && (
                                <ListItemSecondaryAction>
                                    {
                                        iconAction === CHECK_ACTION
                                            ? <Checkbox
                                                key={index}
                                                label={topping.name}
                                                onChange={e => handleClick(e, topping.id)}
                                                checked={checkedValues.includes(topping.id)}
                                            />
                                            : <ListItemIcon style={{cursor: "pointer"}} >
                                                <DeleteIcon onClick={()=>{handleClick(topping.id)}}/>
                                            </ListItemIcon>
                                    }
                                </ListItemSecondaryAction>
                            )
                        }

                    </ListItem>)
                }
            </List>
        )
    }
}

export default withStyles(styles)(ListToppings);
