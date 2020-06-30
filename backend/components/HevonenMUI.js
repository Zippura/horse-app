import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import Button from '@material-ui/core/Button';
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

function createHev(id, nimi, synt, rotu, isa, ema, emanisa, om) {
    return { id, nimi, synt, rotu, isa, ema, emanisa, om };
  }
  
  const rows = [
    createHev(0, 'Nimi: Tallulah', 'S.: 8.6.2012', 'Rotu: Suomenhevonen', 'Isä: Apassi', 'Emä: Remman Ryminä', 'Emänisä: Teme', 'Om.: Mira ja Suvi'),
  ];


function HevonenMUI (props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
          <Grid>
            <Card className={ classes.card }>
              <CardContent>
                  <h3>Hevosen tiedot</h3>
              {rows.map((row) => (
            <Card key={row.id}>
              <Typography>{row.nimi}</Typography>
              <Typography>{ row.synt }</Typography>
              <Typography>{ row.rotu }</Typography>
              <Typography>{ row.isa }</Typography>
              <Typography>{ row.ema }</Typography>
              <Typography>{ row.emanisa }</Typography>
              <Typography>{ row.om }</Typography>
            </Card>
            ))}
            </CardContent>
            <CardActions>
              <div className={ classes.button }>
                <Button>
                    <HevonenEditMUI />
                </Button>
              </div>
            </CardActions>
          </Card>
        </Grid>
    </Grid>
  )
}

export default HevonenMUI;
