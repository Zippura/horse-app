import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';

import axios from 'axios';
const url = 'http://localhost:3000/heppa/edit/';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function HevonenEditMUI(props) {
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
  let id = props.id;
  let nimi = props.nimi;
  let saika = props.saika;
  let rotu = props.rotu;
  let ema = props.ema;
  let isa = props.isa;
  let emanisa = props.emanisa;
  let om = props.om;

// tilamuuttujat ja niiden muuttamiskutsu
const [heppa, setValues] = useState({
    id: id,
    nimi: nimi,
    saika: saika,
    rotu: rotu,
    isa: isa,
    ema: ema,
    emanisa: emanisa,
    om: om
});

const [viesti, setViesti] = useState('');

// Funktio, jolla muutetaan tilaa
const muuta = (e) => {
   setValues({
     ...heppa,
     [e.target.name]: e.target.value
   });
 };

// Funktio painikkeen painallukselle
const lisaaHeppa = (e) => {
  e.preventDefault();

  const heppaLomake = {
    'nimi': heppa.nimi,
    'saika': heppa.saika,
    'rotu': heppa.rotu,
    'isa': heppa.isa,
    'ema': heppa.ema,
    'emanisa': heppa.emanisa,
    'om': heppa.om
  }

  axios.post(url + props.id, heppaLomake)
  .then(response => {
      if (response.status === 200) {
           setValues({
            nimi: '',
            saika: '',
            rotu: '',
            isa: '',
            ema: '',
            emanisa: '',
            om: ''
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

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
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
      <form>
        { /*
        <TextField label='Päivä' name='paiva' value={ matka.paiva }
        onChange={ muuta }  margin='normal' required fullWidth />
        */ }

        <TextField id='question' label='Nimi:' name='nimi' value={ heppa.nimi }
        onChange={ muuta } margin='normal' required fullWidth autoFocus/>
        <TextField id='question' label='S.:' name='saika' value={ heppa.saika }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Rotu:' name='rotu' value={ heppa.rotu }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Isä:' name='isa' value={ heppa.isa }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Emä:' name='ema' value={ heppa.ema }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Emänisä:' name='emanisa' value={ heppa.emanisa }
        onChange={ muuta } margin='normal' required fullWidth />
        <TextField id='question' label='Om.:' name='om' value={ heppa.om }
        onChange={ muuta } margin='normal' required fullWidth />

        <div style={ {textAlign: 'center'} }>
          <Button onClick={lisaaHeppa} variant='contained' color='primary' style={ {marginRight:20} }><CreateIcon />Tallenna</Button>
          <Button onClick={handleClose} variant='contained' color='secondary'><ClearIcon />Poistu</Button>
        </div>
      </form>
      <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
    </Paper>
    </Popover>
  </div>
  );
}

export default HevonenEditMUI;
