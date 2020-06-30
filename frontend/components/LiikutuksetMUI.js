import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LiikutusEditMUI from './LiikutusEditMUI';

const url = 'http://localhost:3000';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function LiikutuksetMUI(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              Liikutukset
          </Typography><hr />
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.liikutustiedot.map(liikutukset => {
              return (
                <Grid item key={liikutukset.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography variant='h5'>{liikutukset.paiva}</Typography>
                      {
                        liikutukset.kuva ?
                          <CardMedia
                            className={classes.cardMedia}
                            image={url + '/download/' + liikutukset.kuva}
                            title={liikutukset.paiva} />
                          :
                          <Typography className={classes.typo}>Ei kuvaa</Typography>
                      }
                      <Typography>{liikutukset.hlo}</Typography>
                      <Typography>{liikutukset.saatila}</Typography>
                      <Typography>{liikutukset.kuvaus}</Typography>
                    </CardContent>
                    <CardActions>
                      <LiikutusEditMUI {...liikutukset} />
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
            )}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default LiikutuksetMUI;
