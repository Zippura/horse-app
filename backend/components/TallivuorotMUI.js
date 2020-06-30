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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LisaatallivuoroMUI from './LisaatallivuoroMUI';
import PoistatalliMUI from './PoistatalliMUI';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

function createData(id, date, person, time, work) {
  return { id, date, person, time, work };
}

const rows = [
  createData(0, '20.3.2020', 'Mira', '2 tuntia', 'Pihaton siivous ja kuivitus'),
  createData(1, '27.3.2020', 'Suvi', '1 tunti', 'Ponitallin siivous'),
  createData(2, '2.4.2020', 'Mira ja Suvi', '2 tuntia', 'Tallin teko'),
  createData(3, '8.4.2020', 'Suvi', '1 tunti', 'Pihaton siivous'),
  createData(4, '10.4.2020', 'Mira', '2 tuntia', 'Tallin teko'),
];

function TallivuorotMUI () {

  const [tallivuoro, setValues] = useState({
      paiva: new Date(),
      tekija: '',
      aika: '',
      kuvaus: '',
  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setValues({
      ...tallivuoro,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const muutaSuurella = (e) => {
    setValues({
      ...tallivuoro,
      [e.target.name]: e.target.value.toUpperCase()
    });
      
    setViesti('');
  };

  const muutaPaiva = (date) => {
    setValues({
      ...tallivuoro,
      paiva: date
     });

    setViesti('');
  };

  const lisaaTallivuoro = (e) => {
    e.preventDefault();

    setValues({
        paiva: new Date(),
        tekija: '',
        aika: '',
        kuvaus: '',
    });

    setViesti('Toimenpide lisätty!'); 
  }
   
  const tyhjenna = (e) => {
    e.preventDefault();

    setValues({
        paiva: new Date(),
        tekija: '',
        aika: '',
        kuvaus: '',
    });

    setViesti('');
  }

  return (
    <Paper style={ {padding:'10px', margin:'30px' } }>
      <h2>Tallivuorot</h2>
      <Button>
          <LisaatallivuoroMUI />
        </Button>
        <Divider />
    <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.person}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.work}</TableCell>
              <TableCell><Button><PoistatalliMUI /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><br />
    </Paper>
  );
}

export default TallivuorotMUI;
