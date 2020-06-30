import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LisaamaksuMUI from './LisaamaksuMUI';
import PoistamaksuMUI from './PoistamaksuMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  card: {
    marginTop: 15,
    maxWidth: 200, minWidth: 200,
    color: pink[700],
  },
  image: {
    height: 100,
    width: 170,
  },
  typo: {
    height: 75,
    width: 170,
  },
  button: {
    textAlign: 'center',
  },
  icon: {
    color: pink[200],
  }
});

function MaksutMUI(props) {
  const classes = useStyles();

  return (
    <Paper style={{ padding: '10px', margin: '30px' }}>
      <h2>Maksut</h2>
      <LisaamaksuMUI />
      <Divider />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pvm</TableCell>
            <TableCell>Maksu</TableCell>
            <TableCell>Kuka</TableCell>
            <TableCell>Suoritus</TableCell>
            <TableCell>Summa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.maksutiedot.map((maksut) => (
            <TableRow key={maksut.id}>
              <TableCell>{maksut.paiva}</TableCell>
              <TableCell>{maksut.kuvaus}</TableCell>
              <TableCell>{maksut.maksaja}</TableCell>
              <TableCell>{maksut.tapa}</TableCell>
              <TableCell>{maksut.summa}</TableCell>
              <TableCell><PoistamaksuMUI {...maksut} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
    </Paper>
  );
}

export default MaksutMUI;
