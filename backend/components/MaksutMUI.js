import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from "date-fns/locale/fi";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LisaamaksuMUI from './LisaamaksuMUI';
import PoistamaksuMUI from './PoistamaksuMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';

function createData(id, date, payment, payer, paymentMethod, amount) {
  return { id, date, payment, payer, paymentMethod, amount };
}

const rows = [
  createData(0, '23.3.2020', 'Hevosauton vuokra', 'Suvi', 'Tilisiirto', 20.00),
  createData(1, '27.3.2020', 'Tallivuokra maaliskuu', 'Suvi', 'Tilisiirto', 110.00),
  createData(2, '28.3.2020', 'Heinäverkot', 'Suvi', 'Korttimaksu', 34.90),
  createData(3, '30.3.2020', 'Hiekka', 'Suvi', 'Tilisiirto', 82.50),
  createData(4, '1.4.2020', 'Varusteita', 'Mira', 'Käteinen', 40.00),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function MaksutMUI () {
  
  const [maksu, setValues] = useState({
    paiva: new Date(),
    kuvaus: '',
    maksaja: '',
    tapa: '',
    summa: '',
});

const [viesti, setViesti] = useState('');

const muuta = (e) => {
  setValues({
    ...maksu,
    [e.target.name]: e.target.value
  });

  setViesti('');
};

const muutaSuurella = (e) => {
  setValues({
    ...maksu,
    [e.target.name]: e.target.value.toUpperCase()
  });
    
  setViesti('');
};

const muutaPaiva = (date) => {
  setValues({
    ...maksu,
    paiva: date
   });

  setViesti('');
};

const lisaaMaksu = (e) => {
  e.preventDefault();

  setValues({
    paiva: new Date(),
    kuvaus: '',
    maksaja: '',
    tapa: '',
    summa: '',
  });

  setViesti('Maksu lisätty!'); 
}
 
const tyhjenna = (e) => {
  e.preventDefault();

  setValues({
    paiva: new Date(),
    kuvaus: '',
    maksaja: '',
    tapa: '',
    summa: '',
  });

  setViesti('');
}



  return (
    <Paper style={ {padding:'10px', margin:'30px' } }>
         <h2>Maksut</h2>
         <Button>
          <LisaamaksuMUI />
        </Button>
        <Divider />
          <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pvm</TableCell>
            <TableCell>Maksu</TableCell>
            <TableCell>Maksaja</TableCell>
            <TableCell>Suoritustapa</TableCell>
            <TableCell align="right">Summa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maksut.map((maksu) => (
            <TableRow key={maksu.id}>
              <TableCell>{maksu.paiva}</TableCell>
              <TableCell>{maksu.kuvaus}</TableCell>
              <TableCell>{maksu.maksaja}</TableCell>
              <TableCell>{maksu.tapa}</TableCell>
              <TableCell align="right">{maksu.summa}</TableCell>
              <TableCell><Button><PoistamaksuMUI /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
    </Paper>
  );
}

export default MaksutMUI;
