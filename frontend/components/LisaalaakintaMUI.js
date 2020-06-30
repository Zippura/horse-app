import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from "date-fns/locale/fi";

import axios from 'axios';

const url = 'http://localhost:3000';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function LisaalaakintaMUI () {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pop = open ? 'simple-popover' : undefined;

  let { id, paiva, tekija, hinta, kuvaus } = useParams();

// tilamuuttujat ja niiden muuttamiskutsu
  const [toimenpiteet, setValues] = useState({
      toimenpide: '',
      paiva: new Date(),
      tekija: '',
      hinta: '',
      kuvaus: ''
  });

  const [viesti, setViesti] = useState('');

// Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
     setValues({
       ...toimenpiteet,
       [e.target.name]: e.target.value
     });
   };


   const muutaPaiva = date => {
     setValues({
      ...toimenpiteet,
      paiva: date
     });
   };

// Funktio painikkeen painallukselle
  const lisaaToimenpide = (e) => {
    e.preventDefault();

    const formData = {
      'toimenpide': toimenpiteet.toimenpide,
      'paiva': toimenpiteet.paiva.getFullYear() + '-' + (toimenpiteet.paiva.getMonth() + 1) + '-' + toimenpiteet.paiva.getDate(),
      'tekija': toimenpiteet.tekija,
      'hinta': toimenpiteet.hinta,
      'kuvaus': toimenpiteet.kuvaus,
    }
    axios.post(url + '/toimenpiteet/add', formData)
      .then(response => {
          if (response.status === 200) {
              setValues( {
                toimenpide: '',
                paiva: new Date(),
                tekija:'',
                hinta: '',
                kuvaus: '',
                } );
              setViesti('Toimenpide lisätty!');
          } else {
            setViesti('Toimenpiteen lisäys ei onnistunut');
          }
      })

  if (document.getElementById('question').value.length === 0) {
    setViesti(<p>Täytä kaikki kentät!</p>);
  } else {
    setViesti(<p>Lisäys onnistui!</p>)
  }
  }

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <EditIcon />Lisää toimenpide
      </Button>
      <Popover
        pop={pop}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
      <Paper style={{padding:'10px', margin:'30px'}}>
        <h4>Lisää toimenpide</h4>
      <form>
        <TextField label='Toimenpide' name='toimenpide' value={ toimenpiteet.toimenpide }
          onChange={ (e) => muuta(e) } required fullWidth />
        { /*
          <TextField label='Päivä' name='paiva' value={ matka.paiva }
          onChange={ muuta } required fullWidth />
        */ }
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
          <KeyboardDatePicker label='Päivä' name='paiva'
          fullWidth required
          cancelLabel='Peruuta'
          value={toimenpiteet.paiva}
          onChange={muutaPaiva}
          format='dd.MM.yyyy' />
        </MuiPickersUtilsProvider>

        <TextField id='question' label='Tekijä' name='tekija' value={ toimenpiteet.tekija }
        onChange={ (e) => muuta(e) } required fullWidth />
		
        <TextField id='question' label='Hinta' name='hinta' value={ toimenpiteet.hinta }
        onChange={ (e) => muuta(e) } required fullWidth />
		
        <TextField id='question' label='Kuvaus' name='kuvaus' value={ toimenpiteet.kuvaus }
        onChange={ (e) => muuta(e) } multiline rows='4' fullWidth />

        <div style={ {textAlign: 'center'} }><br />
          <Button onClick={lisaaToimenpide} variant='contained' color='primary' style={ {marginRight:20} } startIcon={ <CreateIcon /> }>Lisää toimenpide</Button>
          <Button onClick={handleClose} variant='contained' color='primary'><ClearIcon />Poistu</Button>
        </div>
      </form>
      <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
    </Paper>
  </Popover>
  </div>
  );
}

export default LisaalaakintaMUI;
