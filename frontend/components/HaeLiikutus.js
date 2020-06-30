import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import LiikutuksetMUI from './LiikutuksetMUI';

const url = 'http://localhost:3000';

function HaeLiikutus () {

 const [liikutustiedot, setLiikutukset] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiLiikutus = async () => {
  try {
    const response = await fetch(url + '/liikutukset/all');
    const json = await response.json();
    setLiikutukset(json);
    setVirhe('');
  } catch (error) {
    setLiikutukset([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiLiikutus();
 })

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (liikutustiedot.length > 0) {
   return ( <LiikutuksetMUI liikutustiedot={ liikutustiedot } /> );
 }

 return ( <Typography>Liikutuksia ei löytynyt</Typography> );
}

export default HaeLiikutus;
