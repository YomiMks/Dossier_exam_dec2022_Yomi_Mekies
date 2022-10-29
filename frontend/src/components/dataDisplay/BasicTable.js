import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable(props) {
    const {cell, data} = props
  /*  const datasKey = [];
    console.log(data)
    const extractDataPerCell = () => {
        cell.map((obj) => {
            data.map((dat) => {

         /!*       const dataKey = Object.keys(dat);
                dataKey.map((d) => {
                    if(d === obj.slug){
                        datasKey.push(dat[d])
                    }
                })*!/
            })
        })
    }
    extractDataPerCell()
    console.log("datasKey", datasKey)*/
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    {
                        cell.map((item) => <TableCell key={item.id} >{item.cell}</TableCell>)
                    }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        props.structure ?
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.address}
                            </TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell >{row.description}</TableCell>
                        </TableRow>
                            :
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.city}</TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
