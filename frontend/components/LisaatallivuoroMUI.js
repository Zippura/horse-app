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

function LisaatallivuoroMUI () {
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

  let { id, paiva, tekija, aika, tehtava } = useParams();

// tilamuuttujat ja niiden muuttamiskutsu
  const [tallivuorot, setValues] = useState({
      paiva: new Date(),
      tekija: '',
      aika: '',
      tehtava: ''
  });

  const [viesti, setViesti] = useState('');

// Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
     setValues({
       ...tallivuorot,
       [e.target.name]: e.target.value
     });
   };

   const muutaPaiva = date => {
     setValues({
      ...tallivuorot,
      paiva: date
     });
   };

// Funktio painikkeen painallukselle
  const lisaaTalli = (e) => {
    e.preventDefault();

    const formData = {
      paiva: tallivuorot.paiva.getFullYear() + '-' + (tallivuorot.paiva.getMonth() + 1) + '-' + tallivuorot.paiva.getDate(),
      tekija: tallivuorot.tekija,
      aika: tallivuorot.aika,
      tehtava: tallivuorot.tehtava,
  }
  axios.post(url + '/tallivuorot/add', formData)
  .then(response => {
      if (response.status === 200) {
          setValues( {
            paiva: new Date(),
            tekija:'',
            aika: '',
            tehtava: '',
            } );
          setViesti('Tallivuoro lisätty!');
      } else {
        setViesti('Tallivuoron lisäys ei onnistunut');
      }
  })
/*
if (document.getElementById('question').value.length === 0) {
setViesti(<p>Täytä kaikki kentät!</p>);
} else {
setViesti(<p>Lisäys onnistui!</p>)
}
*/
}

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <EditIcon />Lisää tallivuoro
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
        <h4>Lisää tallivuoro</h4>
      <form>
      { /*
        <TextField label='Päivä' name='paiva' value={ matka.paiva }
        onChange={ muuta } required fullWidth />
      */ }
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
        <KeyboardDatePicker label='Päivä' name='paiva'
          fullWidth required
          cancelLabel='Peruuta'
          value={tallivuorot.paiva}
          onChange={muutaPaiva}
          format='dd.MM.yyyy' />
      </MuiPickersUtilsProvider>

      <TextField id='question' label='Tekijä' name='tekija' value={ tallivuorot.tekija }
      onChange={ (e) => muuta(e) } required fullWidth />
		
      <TextField id='question' label='Aika' name='aika' value={ tallivuorot.aika }
      onChange={ (e) => muuta(e) } required fullWidth />
		
      <TextField id='question' label='Kuvaus' name='tehtava' value={ tallivuorot.kuvaus }
      onChange={ (e) => muuta(e) } required fullWidth />

      <div style={ {textAlign: 'center'} }><br />
        <Button onClick={lisaaTalli} variant='contained' color='primary' style={ {marginRight:20} } startIcon={ <CreateIcon /> }>Lisää tallivuoro</Button>
        <Button onClick={handleClose} variant='contained' color='primary'><ClearIcon />Poistu</Button>
      </div>
    </form>
    <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
  </Paper>
  </Popover>
  </div>
  );
}

export default LisaatallivuoroMUI;
