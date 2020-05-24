import React, {Component} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import {withRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import Topbar from './Topbar';
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis,} from 'recharts';
import {bindActionCreators} from "redux";
import * as pizzaActions from "../actions/pizza";

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        background: `url(${backgroundShape}) no-repeat`,
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
    }
});

class Main extends Component {

    state = {};

    componentDidMount() {
        console.log("Component mounted");
    }

    render() {
        const {classes, distance, duration, amount} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Topbar/>
                <div className={classes.root}>
                    <Grid container justify="center">
                        UI for Pizzas
                    </Grid>
                </div>


            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...pizzaActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Main)))
