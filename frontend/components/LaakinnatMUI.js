import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LisaalaakintaMUI from './LisaalaakintaMUI';
import PoistalaakintaMUI from './PoistalaakintaMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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

function LaakinnatMUI(props) {
  const classes = useStyles();

  return (
    <Paper style={{ padding: '10px', margin: '30px' }}>
      <h2>Lääkinnät ja kengitykset</h2>
      <LisaalaakintaMUI />
      <Divider />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Toimenpide</TableCell>
            <TableCell>Pvm</TableCell>
            <TableCell>Tekijä</TableCell>
            <TableCell>Hinta</TableCell>
            <TableCell>Kuvaus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.laakinnat.map((toimenpiteet) => (
            <TableRow key={toimenpiteet.id}>
              <TableCell>{toimenpiteet.toimenpide}</TableCell>
              <TableCell>{toimenpiteet.paiva}</TableCell>
              <TableCell>{toimenpiteet.tekija}</TableCell>
              <TableCell>{toimenpiteet.hinta}</TableCell>
              <TableCell>{toimenpiteet.kuvaus}</TableCell>
              <TableCell><PoistalaakintaMUI {...toimenpiteet}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
    </Paper>
  );
}

export default LaakinnatMUI;
