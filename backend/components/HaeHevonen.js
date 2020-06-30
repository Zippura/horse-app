import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import HevonenMUI from './HevonenMUI';

const url = 'http://localhost:3000';

function HaeHevonen () {

 const [hevoset, setHevonen] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiHevoset = async () => {
  try {
    const response = await fetch(url + '/heppa/all');
    const json = await response.json();
    setHevonen(json);
    setVirhe('');
  } catch (error) {
    setHevonen([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiHevoset();
 }, [])

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (hevoset.length > 0) {
   return ( <HevonenMUI hevoset={ hevoset } /> );
 }

 return ( <Typography>Hevosta ei löytynyt</Typography> );
}

export default HaeHevonen;
