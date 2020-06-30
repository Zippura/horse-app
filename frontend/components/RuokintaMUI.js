import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import RuokintaEditMUI from './RuokintaEditMUI';

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

function RuokintaMUI (props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
        { props.ruokintatiedot.map(ruokinnat => {
          return (
            <Grid item key={ ruokinnat.id }>
              <Card className={ classes.card }>
                <CardContent>
                    <h3>Ruokinta</h3>
                    <Typography>{ ruokinnat.sisaverkko }</Typography>
                    <Typography>{ ruokinnat.ulkoverkko }</Typography>
                    <Typography>{ ruokinnat.muutrehut }</Typography>
                </CardContent>
                <CardActions>
                  <RuokintaEditMUI {...ruokinnat}/>
                </CardActions>
              </Card>
            </Grid>
          )}
        )}
    </Grid>
  )
}

export default RuokintaMUI;
