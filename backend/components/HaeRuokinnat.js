import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import RuokintaMUI from './RuokintaMUI';

const url = 'http://localhost:3000';

function HaeRuokinnat () {

 const [ruokinnat, setRuokinta] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiRuokinnat = async () => {
  try {
    const response = await fetch(url + '/ruokinnat/all');
    const json = await response.json();
    setRuokinta(json);
    setVirhe('');
  } catch (error) {
    setRuokinta([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiRuokinnat();
 }, [])

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (tallivuorot.length > 0) {
   return ( <RuokintaMUI ruokinnat={ ruokinnat } /> );
 }

 return ( <Typography>Ruokintatietoja ei löytynyt</Typography> );
}

export default HaeRuokinnat;
