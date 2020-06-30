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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
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

function PoistamaksuMUI () {
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

   const muutaKuva = (e) => {
     setValues({
      ...maksut,
      kuva: e.target.files[0]
     });
   }

   const muutaPaiva = date => {
     setValues({
      ...maksut,
      paiva: date
     });
   };

// Funktio painikkeen painallukselle
const poistaMaksu = (e) => {
    e.preventDefault();

    setValues({
        id: '',
        paiva: new Date(),
        maksu: '',
        maksaja: '',
        tapa: '',
        summa: ''
    });

    setViesti('Maksu poistettu!');
  }

  return (
    <div>
  <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      <DeleteOutlinedIcon />Poista
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

      <div style={ {textAlign: 'center'} }><br />
        <Button onClick={ (e) => poistaMaksu(e) } variant='contained' color='primary' style={ {marginRight:20} } startIcon={ <DeleteOutlinedIcon /> }>Poista maksu</Button>
        <Button onClick={handleClose} variant='contained' color='primary'><ClearIcon />Peruuta</Button>
      </div>
    <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
    </Paper>
  </Popover>
  </div>
  );
}

export default PoistamaksuMUI;
