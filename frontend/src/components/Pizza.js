import React, {Component} from "react";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles/withStyles";

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    }
});

function Pizza(props) {
    const {classes, data, onAddDeleteTopping} = props;
    const {toppings} = data;
    const displayToppings = toppings.map(topping => topping.name + " ");

    return (
        <Grid item key={data.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="data:image/png;base64,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"
                    title="Pizza"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography>
                        {displayToppings}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => onAddDeleteTopping(data.id, data.toppings, false)}>
                        Add topping
                    </Button>
                    <Button size="small" color="primary" onClick={() => onAddDeleteTopping(data.id, data.toppings, true)}>
                        Delete topping
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(Pizza);

