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

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
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

  let { id, heinasis, heinaulos, vakirehut } = useParams();
  
  // tilamuuttujat ja niiden muuttamiskutsu
  const [ruokinta, setValues] = useState({
      id: id,
      heinasis: heinasis,
      heinaulos: heinaulos,
      vakirehut: vakirehut,
  });
  
  const [viesti, setViesti] = useState('');
  
  // Funktio, jolla muutetaan tilaa
  const muuta = (e) => {
     setValues({
       ...ruokinta,
       [e.target.name]: e.target.value
     });
   };
  
  // Funktio painikkeen painallukselle
  const lisaaRuokinta = (e) => {
    e.preventDefault();

    setValues({
      heinasis: '',
      heinaulos: '',
      vakirehut: '',
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

        <TextField id='question' label='Heinä sisään:' name='heinasis' value={ ruokinta.heinasis }
        onChange={ muuta } margin='normal' required fullWidth autoFocus/>

        <TextField id='question' label='Heinä ulos:' name='heinaulos' value={ ruokinta.heinaulos }
        onChange={ muuta } margin='normal' required fullWidth />
        
        <TextField id='question' label='Väkirehut:' name='vakirehut' value={ ruokinta.vakirehut }
        onChange={ muuta } margin='normal' multiline rows='4' required fullWidth />

        <div style={ {textAlign: 'center'} }>
            <Button onClick={lisaaRuokinta} variant='contained' color='primary' style={ {marginRight:20} }><CreateIcon />Tallenna</Button>
            <Button onClick={handleClose} variant='contained' color='secondary'><ClearIcon />Poistu</Button>
        </div>
        </form>
        <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
        </Paper>
      </Popover>
    </div>
  );
}
