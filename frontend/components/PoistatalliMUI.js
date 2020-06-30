import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const url = 'http://localhost:3000';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function PoistatalliMUI (props) {
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

  const [viesti, setViesti] = useState('');

// Funktio painikkeen painallukselle
const poistaTalli = (id) => {
  return fetch(url + "/tallivuorot/delete/" + id)
  .then((response) => response.json())
  .then((responseJson) => {
    setViesti('Tallivuoro poistettu');
  })
  .catch((error) => {
    setViesti('Tietojen poisto ei onnistunut');
  })
  }

  return (
    <div>
      <IconButton aria-describedby={props.id} variant="contained" color="primary" onClick={handleClick}>
        <DeleteOutlinedIcon />
      </IconButton>
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
          <Button onClick={poistaTalli.bind(null, props.id)} variant='contained' color='primary' style={{ marginRight: 20 }} startIcon={<DeleteOutlinedIcon />}>Poista tallivuoro</Button>
          <Button onClick={handleClose} variant='contained' color='primary'><ClearIcon />Sulje</Button>
        </div>
      <Typography style={ {marginTop: 20} }>{ viesti }</Typography>
      </Paper>
    </Popover>
  </div>
  );
}

export default PoistatalliMUI;
