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
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Pizza from "../components/Pizza";
import AddPizzaDialog from "./dialogs/AddPizzaDialog";


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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Main extends Component {


    state = {
        showAddPizzaDialog: false
    };

    componentDidMount() {
        this.props.fetchPizzas();
    }

    dialogClose = (event) => {
        this.setState({showAddPizzaDialog: false});
    };

    openAddPizzaDialog = (event) => {
        this.setState({showAddPizzaDialog: true});
    };

    render() {
        const {classes, pizzas} = this.props;

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
                                        onClick={this.openAddPizzaDialog}
                                        variant="contained"
                                        color="primary">
                                        Add a new pizza!
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
                                        <Pizza data={pizza}/>
                                    ))}
                                </Grid>
                                :
                                <Typography> No pizzas found, try and add one!</Typography>
                        }

                    </Container>
                    <AddPizzaDialog
                        open={this.state.showAddPizzaDialog}
                        onClose={this.dialogClose}
                    />

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
    return bindActionCreators({...pizzaActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Main)))
