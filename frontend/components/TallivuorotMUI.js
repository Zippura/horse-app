import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LisaatallivuoroMUI from './LisaatallivuoroMUI';
import PoistatalliMUI from './PoistatalliMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

//Komponentin omaa tyyliä
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

function TallivuorotMUI(props) {
  const classes = useStyles();

  return (
    <Paper style={{ padding: '10px', margin: '30px' }}>
      <h2>Tallivuorot</h2>
      <LisaatallivuoroMUI />
      <Divider />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pvm</TableCell>
            <TableCell>Tekijä</TableCell>
            <TableCell>Aika</TableCell>
            <TableCell>Työ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tallit.map((tallivuorot) => (
            <TableRow key={tallivuorot.id}>
              <TableCell>{tallivuorot.paiva}</TableCell>
              <TableCell>{tallivuorot.tekija}</TableCell>
              <TableCell>{tallivuorot.aika}</TableCell>
              <TableCell>{tallivuorot.tehtava}</TableCell>
              <TableCell><PoistatalliMUI {...tallivuorot}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
    </Paper>
  );
}

export default TallivuorotMUI;
