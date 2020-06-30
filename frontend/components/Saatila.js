import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

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

function Saatila () {
    const classes = useStyles();

    const [saatieto, setSaatieto] = useState( {
        paikkakunta: '',
        kuva: '',
        lampotila: '',
        kuvaus: '',
        tuuli: ''
    } );
    const[virhe, setVirhe] = useState('');
    const[paikkakunta, setPaikkakunta] = useState('');

    const fetchUrl = async () => {
        try {
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?lang=fi&q=' + paikkakunta + '&units=metric&APPID=a5939b02e77a71859900cf3cade27e45');
            const json = await response.json();
            setSaatieto(
                {
                    paikkakunta: json.name,
                    kuva: 'http://api.openweathermap.org/img/w/' + json.weather[0].icon,
                    lampotila: json.main.temp.toFixed(1),
                    kuvaus: json.weather[0].description,
                    tuuli: json.wind.speed.toFixed(0)
                }
            );
            setVirhe('');
        } catch (error) {
            setVirhe('Better luck next time!');
        }
    }

    const hae = (e) => {
        if (paikkakunta.length > 0) {
            fetchUrl();
        } else {
            setVirhe('Anna paikkakunta!');
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid>
            <Card className={ classes.card }>
                <CardContent>
            <br /><h3>Säätila</h3>
                <label htmlFor='paikkakunta'>Paikkakunta: </label><br />
                <input type='text' name='paikkakunta' id='paikkakunta' value={ paikkakunta } onChange={ (e) => setPaikkakunta(e.target.value) } /><br /><br />
                <input type='button' name='hae' value='Hae' onClick={ (e) =>  hae(e)  } /><br /><br />
            
            {
                saatieto.paikkakunta.length > 0 && virhe.length === 0 ?
                <div style={{ marginLeft: '70px' }}>
                    <h3>{ saatieto.paikkakunta }</h3>
                    <img src={ saatieto.kuva } alt={ 'kuva' } /> 
                    { saatieto.lampotila } &#8451;<br />
                    { saatieto.kuvaus } <br />
                    { saatieto.tuuli } m/s
                </div>
                : <p>{ virhe }</p>
            }         
           </CardContent>
           </Card>
        </Grid>
        </Grid>
    );
}

export default Saatila; 