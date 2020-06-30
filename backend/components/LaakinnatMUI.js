import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from "date-fns/locale/fi";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LisaalaakintaMUI from './LisaalaakintaMUI';
import PoistalaakintaMUI from './PoistalaakintaMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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

function createData(id, operation, date, doer, amount, description) {
  return { id, operation, date, doer, amount, description };
}

const rows = [
  createData(0, 'Vuolu', '23.3.2020', 'Mira', 10.00, 'Viilausta reunoista'),
  createData(1, 'Raspaus ja rokotus', '27.3.2020', 'Ell Anna', 200.00, 'Piikkejä hampaissa'),
  createData(2, 'Vuolu', '2.4.2020', 'Mira', 10.00, 'Etusten lyhennys varpaalta'),
];

function LaakinnatMUI () {
  const classes = useStyles();

  const [laakinta, setValues] = useState({
      toimenpide: '',
      paiva: new Date(),
      tekija: '',
      hinta: '',
      kuvaus: '',
  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setValues({
      ...laakinta,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const muutaSuurella = (e) => {
    setValues({
      ...laakinta,
      [e.target.name]: e.target.value.toUpperCase()
    });
      
    setViesti('');
  };

  const muutaPaiva = (date) => {
    setValues({
      ...laakinta,
      paiva: date
     });

    setViesti('');
  };

   


  return (
    <Paper style={ {padding:'10px', margin:'30px' } }>
      <h2>Lääkinnät ja kengitykset</h2>
        <Button>
        <LisaalaakintaMUI />
        </Button>
        <Divider />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Toimenpide</TableCell>
            <TableCell>Pvm</TableCell>
            <TableCell>Tekijä</TableCell>
            <TableCell align="right">Hinta</TableCell>
            <TableCell>Kuvaus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.operation}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.doer}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell><Button><PoistalaakintaMUI /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />


    </Paper>

  );
}

export default LaakinnatMUI;
