import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import RuokintaMUI from './RuokintaMUI';

const url = 'http://localhost:3000';

function HaeRuokinnat () {

 const [ruokintatiedot, setRuokinnat] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiRuokintatiedot = async () => {
  try {
    const response = await fetch(url + '/ruokinnat/all');
    const json = await response.json();
    setRuokinnat(json);
    setVirhe('');
  } catch (error) {
    setRuokinnat([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiRuokintatiedot();
 })

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (ruokintatiedot.length > 0) {
   return ( <RuokintaMUI ruokintatiedot={ ruokintatiedot } /> );
 }

 return ( <Typography>Ruokintatietoja ei löytynyt</Typography> );
}

export default HaeRuokinnat;
