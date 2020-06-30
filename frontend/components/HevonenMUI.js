import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import HevonenEditMUI from './HevonenEditMUI';

//Komponentin omaa tyyliä
const useStyles = makeStyles({
  card: {
    marginTop: 15, 
    maxWidth: 200, minWidth: 200,
    color: pink[700],
  },
  image: {
    height: 100,
    width: 170,
  },
  typo: {
    height: 75, 
    width: 170,
  },
  button: {
    textAlign: 'center',
  },
  icon: {
    color: pink[200],
  }
});

function HevonenMUI (props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      { props.hevoset.map(heppa => {
          return (
          <Grid item key={ heppa.id }>
            <Card className={ classes.card }>
              <CardContent>
                  <h3>Hevosen tiedot</h3>
              <Typography>{ heppa.nimi }</Typography>
              <Typography>{ heppa.saika }</Typography>
              <Typography>{ heppa.rotu }</Typography>
              <Typography>{ heppa.isa }</Typography>
              <Typography>{ heppa.ema }</Typography>
              <Typography>{ heppa.emanisa }</Typography>
              <Typography>{ heppa.om }</Typography>
            </CardContent>

            <CardActions>
              <HevonenEditMUI {...heppa} />
            </CardActions>
          </Card>
        </Grid>
          )}
      )}
    </Grid>
  );
}

export default HevonenMUI;
