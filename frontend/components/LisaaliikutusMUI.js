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

function LisaaliikutusMUI () {
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

  let { id, paiva, hlo, saatila, kuvaus } = useParams();

// tilamuuttujat ja niiden muuttamiskutsu
  const [liikutukset, setValues] = useState({
      kuva: '',
      paiva: new Date(),
      hlo: '',
      saatila: '',
      kuvaus: ''
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
  const lisaaLiikutus = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('kuva', liikutukset.kuva);
    let paiva = liikutukset.paiva.getFullYear() + '-' + (liikutukset.paiva.getMonth() + 1) + '-' + liikutukset.paiva.getDate();
    formData.append('paiva', paiva);
    formData.append('hlo', liikutukset.hlo);
    formData.append('saatila', liikutukset.saatila);
    formData.append('kuvaus', liikutukset.kuvaus);

    axios.post(url + '/liikutukset/add', formData)
    .then(response => {
        if (response.status === 200) {
            setValues({
                kuva: '',
                paiva: new Date(),
                hlo: '',
                saatila: '',
                kuvaus: ''
            });
            setViesti('Liikutusmerkintä lisätty!');
        } else {
            setViesti('Merkinnän lisääminen ei onnistunut');
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
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        <EditIcon />Lisää liikutus
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
        <h4>Lisää liikutusmerkintä</h4>
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
        <Button onClick={lisaaLiikutus} variant='contained' color='primary' style={ {marginRight:20} }><CreateIcon />Lisää liikutus</Button>
        <Button onClick={handleClose} variant='contained' color='secondary'><ClearIcon />Poistu</Button>
      </div>
    </form>
    <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
  </Paper>
  </Popover>
  </div>
  );
}

export default LisaaliikutusMUI;
