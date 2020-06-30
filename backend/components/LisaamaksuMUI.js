import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from "date-fns/locale/fi";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function LisaamaksuMUI () {
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

  let { id, paiva, maksu, maksaja, tapa, summa } = useParams();

// tilamuuttujat ja niiden muuttamiskutsu
  const [maksut, setValues] = useState({
      id: '',
      paiva: new Date(),
      maksu: '',
      maksaja: '',
      tapa: '',
      summa: ''
  });

  const [viesti, setViesti] = useState('');

// Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
     setValues({
       ...maksut,
       [e.target.name]: e.target.value
     });
   };

   const muutaPaiva = date => {
     setValues({
      ...maksut,
      paiva: date
     });
   };

// Funktio painikkeen painallukselle
  const lisaaMaksut = (e) => {
    e.preventDefault();

    setValues({
      paiva: new Date(),
      maksu: '',
      maksaja: '',
      tapa: '',
      summa: ''
  });
  if (document.getElementById('question').value.length === 0) {
    setViesti(<p>Täytä kaikki kentät!</p>);
  } else {
    setViesti(<p>Lisäys onnistui!</p>)
  }
  }

  return (
    <div>
  <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      <EditIcon />Lisää maksu
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
    <h4>Lisää maksu</h4>
    <form>
  { /*
      <TextField label='Päivä' name='paiva' value={ matka.paiva }
        onChange={ muuta } required fullWidth />
  */ }
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
          <KeyboardDatePicker label='Päivä' name='paiva'
          fullWidth required
          cancelLabel='Peruuta'
          value={maksut.paiva}
          onChange={muutaPaiva}
          format='dd.MM.yyyy' />
      </MuiPickersUtilsProvider>

      <TextField label='Maksu' name='maksu' value={ maksut.maksu }
        onChange={ (e) => muuta(e) } required fullWidth />
		
        <TextField label='Hinta' name='maksaja' value={ maksut.maksaja }
        onChange={ (e) => muuta(e) } required fullWidth />
		
      <TextField label='Suoritustapa' name='tapa' value={ maksut.tapa }
        onChange={ (e) => muuta(e) } required fullWidth />

      <TextField label='Summa' name='summa' value={ maksut.summa }
        onChange={ (e) => muuta(e) } required fullWidth />

      <div style={ {textAlign: 'center'} }><br />
        <Button onClick={ (e) => lisaaMaksut(e) } variant='contained' color='primary' style={ {marginRight:20} } startIcon={ <CreateIcon /> }>Lisää maksu</Button>
        <Button onClick={handleClose} variant='contained' color='secondary'><ClearIcon />Poistu</Button>
      </div>
    </form>
    <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
  </Paper>
  </Popover>
  </div>
  );
}

export default LisaamaksuMUI;
