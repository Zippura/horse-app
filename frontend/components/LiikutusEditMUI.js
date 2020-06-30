import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from "date-fns/locale/fi";

import axios from 'axios';
const url = 'http://localhost:3000/liikutukset/edit/';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function LiikutusEditMUI (props) {
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

  //parametrit
  let id = props.id;
  let paiva = props.paiva;
  let kuva = props.kuva;
  let hlo = props.hlo;
  let saatila = props.saatila;
  let kuvaus = props.kuvaus;

// tilamuuttujat ja niiden muuttamiskutsu
  const [liikutukset, setValues] = useState({
      id: id,
      paiva: new Date(),
      kuva: '',
      hlo: hlo,
      saatila: saatila,
      kuvaus: kuvaus
  });

  const [viesti, setViesti] = useState('');

// Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
     setValues({
       ...liikutukset,
       [e.target.name]: e.target.value
     });
   };

   const muutaKuva = (e) => {
     setValues({
      ...liikutukset,
      kuva: e.target.files[0]
     });
   }

   const muutaPaiva = date => {
     setValues({
      ...liikutukset,
      paiva: date
     });
   };

// Funktio painikkeen painallukselle
  const tallennaLiikutus = (e) => {
    e.preventDefault();

    const liikutusLomake = {
      'paiva':  liikutukset.paiva.getFullYear() + '-' + (liikutukset.paiva.getMonth() + 1) + '-' + liikutukset.paiva.getDate(),
      'kuva': liikutukset.kuva,
      'hlo': liikutukset.hlo,
      'saatila': liikutukset.saatila,
      'kuvaus': liikutukset.kuvaus
    }

    axios.post(url + props.id, liikutusLomake)
      .then(response => {
          if (response.status === 200) {
               setValues({
                  paiva: new Date(),
                  kuva: '',
                  hlo: '',
                  saatila: '',
                  kuvaus: ''
              });
              setViesti('Muutos onnistui');
          } else {
              setViesti('Muutos ei onnistunut');
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

  let kuvaNimi = '';
  if (liikutukset.kuva !== null) {
    kuvaNimi = liikutukset.kuva.name;
  }

  return (
    
    <div>
      <Button aria-describedby={props.id} variant="contained" color="primary" onClick={handleClick}>
        <EditIcon />Muokkaa
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
        <h4>Muokkaa liikutusmerkintää</h4>
        <form>
        { /*
          <TextField label='Päivä' name='paiva' value={ matka.paiva }
          onChange={ muuta }  margin='normal' required fullWidth />
        */ }
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
          <KeyboardDatePicker
            label='Päivä'
            cancelLabel='Peruuta'
            name='paiva'
            value={liikutukset.paiva}
            onChange={muutaPaiva}
            fullWidth
            required
            color='primary'
            format='dd.MM.yyyy'
          />
        </MuiPickersUtilsProvider>

        <TextField id='question' label='Liikuttaja' name='hlo' value={ liikutukset.hlo }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Sää' name='saatila' value={ liikutukset.saatila }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Kuvaus' name='kuvaus' value={ liikutukset.kuvaus }
        onChange={ muuta } margin='normal' multiline rows='4' fullWidth />
        <Input accept='image/*' name='kuva' id='kuva' type='file'
        onChange={ muutaKuva } style={ {display: 'none'} } />

        <InputLabel htmlFor='kuva'>
          Kuva
          <Button component='span' color='primary' style={ { marginLeft: 20, marginRight: 20} }>
              <AttachmentIcon />
          </Button>
          { kuvaNimi }
        </InputLabel>

        <div style={ {textAlign: 'center'} }>
          <Button onClick={tallennaLiikutus} variant='contained' color='primary' style={ {marginRight:20} }><SaveOutlinedIcon />Tallenna</Button>
          <Button onClick={handleClose} variant='contained' color='primary'><ClearIcon />Poistu</Button>
        </div>
      </form>
      <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
    </Paper>
  </Popover>
  </div>
  );
}

export default LiikutusEditMUI;
