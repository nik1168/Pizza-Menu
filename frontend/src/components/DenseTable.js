import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        overflow: "auto"
    },
});


export default function DenseTable(data) {
    const classes = useStyles();
    const rows = data.rows;

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Type</b></TableCell>
                        <TableCell align="right"><b>Start Date</b></TableCell>
                        <TableCell align="right"><b>End Date</b></TableCell>
                        <TableCell align="right"><b>Duration (min)</b></TableCell>
                        <TableCell align="right"><b>Mode/ Significance</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="right">{moment(row.start).format("YYYY/MM/DD hh:mm")}</TableCell>
                            <TableCell align="right">{moment(row.end).format("YYYY/MM/DD hh:mm")}</TableCell>
                            <TableCell align="right">{Math.round(row.duration*60)}</TableCell>
                            <TableCell
                                align="right">{row.hasOwnProperty("location") ? row.location.significance : row.mode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
