import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import RuokintaEditMUI from './RuokintaEditMUI';
import Button from '@material-ui/core/Button';

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

function createRuok(id, heinasis, heinaulos, vakirehu) {
    return { id, heinasis, heinaulos, vakirehu };
  }
  
  const rows = [
    createRuok(0, '6 kg sisäverkkoon', '6 kg ulkoverkkoon', '1 dl pellavaa'),
  ];

function RuokintaMUI (props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
          <Grid>
            <Card className={ classes.card }>
              <CardContent>
                  <h3>Ruokinta</h3>
               {rows.map((row) => (
              <Card key={row.id}>
                <Typography>{row.heinasis}</Typography>
                <Typography>{ row.heinaulos }</Typography>
                <Typography>{ row.vakirehu }</Typography>
              </Card>
            ))}
            </CardContent>
            <CardActions>
            <div className={ classes.button }>  
              <Button>
                  <RuokintaEditMUI />
              </Button>
            </div>
            </CardActions>
          </Card>
        </Grid>
    </Grid>
  )
}

export default RuokintaMUI;
