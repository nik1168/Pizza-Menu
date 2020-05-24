import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import Topbar from './Topbar';
import {bindActionCreators} from "redux";
import * as pizzaActions from "../actions/pizza";
import * as toppingActions from "../actions/topping";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Pizza from "../components/Pizza";
import AddPizzaDialog from "./dialogs/AddPizzaDialog";
import ListToppingsDialog from "./dialogs/ListToppingsDialog";
import ToppingsPizzaDialog from "./dialogs/ToppingsPizzaDialog";


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    grid: {
        width: 1200,
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 20px)'
        }
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    rangeLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2)
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32
    },
    blockCenter: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    block: {
        padding: theme.spacing(2),
    },
    box: {
        marginBottom: 40,
        height: 180
    },
    inlining: {
        display: 'inline-block',
        marginRight: 10
    },
    buttonBar: {
        display: 'flex'
    },
    alignRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    noBorder: {
        borderBottomStyle: 'hidden'
    },
    loadingState: {
        opacity: 0.05
    },
    loadingMessage: {
        position: 'absolute',
        top: '40%',
        left: '40%'
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    }
});

class Main extends Component {


    state = {
        showAddPizzaDialog: false,
        showAddToppingToPizzaDialog: false,
        showDeleteToppingFromPizzaDialog: false,
        showToppingsDialog: false,
        showDeleteToppingsDialog: false,
        selectedPizza: 0,
        toppingsInPizza: [],
        deleteToppings: false
    };

    componentDidMount() {
        this.props.fetchPizzas();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            showAddPizzaDialog,
            showToppingsDialog,
            showAddToppingToPizzaDialog,
            showDeleteToppingFromPizzaDialog
        } = this.state;

        if (showAddPizzaDialog || showToppingsDialog || showAddToppingToPizzaDialog || showDeleteToppingFromPizzaDialog) {
            this.props.fetchToppings();
        }
    }

    /**
     * Close dialog
     */
    dialogClose = () => {
        this.props.fetchPizzas();
        this.setState(
            {
                showAddPizzaDialog: false,
                showToppingsDialog: false,
                showAddToppingToPizzaDialog: false,
                showDeleteToppingFromPizzaDialog: false
            });
    };

    /**
     * Creates pizza
     * @param pizzaTopping
     */
    createPizza = (pizzaTopping) => {
        this.props.fetchAddPizza(pizzaTopping, () => {
            this.props.fetchPizzas();
            this.setState({showAddPizzaDialog: false});
        });

    };


    /**
     * Adds or Deletes toppings to a pizza
     * @param toppings
     */
    addDeleteToppingsToPizza = (toppings) => {
        const {selectedPizza, showDeleteToppingFromPizzaDialog} = this.state;
        this.props.fetchAddDeleteToppingsToPizza(selectedPizza, toppings, showDeleteToppingFromPizzaDialog, () => {
            this.props.fetchPizzas();
            this.setState(
                {
                    showAddToppingToPizzaDialog: false,
                    showDeleteToppingFromPizzaDialog: false,
                })
        });


    };


    /**
     * Opens dialog to create a pizza
     */
    openAddPizzaDialog = () => {
        this.setState({showAddPizzaDialog: true});
    };

    /**
     * Opens dialog to create a pizza
     */
    openDialogs = (dialogId) => {

        switch (dialogId) {
            case 1:
                this.setState({showAddPizzaDialog: true});
                break;
            case 2:
                this.setState({showToppingsDialog: true});
                break;

        }

    };

    handleAddDeleteToppingToPizza = (idPizza, toppings, deleteToppings) => {
        this.setState(
            {
                toppingsInPizza: toppings,
                selectedPizza: idPizza,
                showAddToppingToPizzaDialog: !deleteToppings,
                showDeleteToppingFromPizzaDialog: deleteToppings,
            })
    };


    /**
     * Opens dialog to list toppings
     */
    openListToppingsDialog = () => {
        this.setState({showToppingsDialog: true});
    };

    render() {
        const {classes, pizzas, toppings, isFetchingToppings} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar/>

                <div className={classes.root}>

                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="left">
                                <Grid item>
                                    <Button
                                        onClick={() => this.openDialogs(1)}
                                        variant="contained"
                                        color="primary">
                                        Add a new pizza!
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        onClick={() => this.openDialogs(2)}
                                        variant="contained"
                                        color="primary">
                                        Toppings
                                    </Button>
                                </Grid>

                            </Grid>
                        </div>
                    </Container>

                    <Container className={classes.cardGrid} maxWidth="md">
                        {
                            pizzas.length > 0 ?
                                <Grid container spacing={4}>
                                    {pizzas.map((pizza) => (
                                        <Pizza data={pizza} onAddDeleteTopping={this.handleAddDeleteToppingToPizza}/>
                                    ))}
                                </Grid>
                                :
                                <Typography> No pizzas found, try and add one!</Typography>
                        }

                    </Container>

                    <div id={"dialogs"}>
                        <AddPizzaDialog
                            open={this.state.showAddPizzaDialog}
                            onClose={this.dialogClose}
                            onAcceptCreate={this.createPizza}
                        />
                        <ListToppingsDialog
                            open={this.state.showToppingsDialog}
                            clickToppings={true}
                            deleteToppingsInPizza={this.state.toppingsInPizza}
                            onClose={this.dialogClose}
                            onAccept={this.dialogClose}
                            title={"List of available toppings"}
                        />

                        <ToppingsPizzaDialog
                            open={this.state.showAddToppingToPizzaDialog}
                            clickToppings={true}
                            deleteToppingsInPizza={false}
                            toppingsInPizza={this.state.toppingsInPizza.map((topping => topping.id))}
                            onClose={this.dialogClose}
                            onAccept={this.addDeleteToppingsToPizza}
                            title={"Add toppings to Pizza"}
                        />

                        <ToppingsPizzaDialog
                            open={this.state.showDeleteToppingFromPizzaDialog}
                            clickToppings={true}
                            deleteToppingsInPizza={true}
                            toppingsInPizza={this.state.toppingsInPizza.map((topping => topping.id))}
                            onClose={this.dialogClose}
                            onAccept={this.addDeleteToppingsToPizza}
                            title={"Select toppings to delete from pizza"}
                        />

                    </div>

                </div>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        pizzas: state.pizza.pizzas
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...pizzaActions, ...toppingActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Main)))
