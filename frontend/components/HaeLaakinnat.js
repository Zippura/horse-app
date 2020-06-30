import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import LaakinnatMUI from './LaakinnatMUI';

const url = 'http://localhost:3000';

function HaeLaakinnat () {

 const [laakinnat, setToimenpiteet] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiLaakinnat = async () => {
  try {
    const response = await fetch(url + '/toimenpiteet/all');
    const json = await response.json();
    setToimenpiteet(json);
    setVirhe('');
  } catch (error) {
    setToimenpiteet([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiLaakinnat();
 })

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (laakinnat.length > 0) {
   return ( <LaakinnatMUI laakinnat={ laakinnat } /> );
 }

 return ( <Typography>Toimenpiteiden tietoja ei löytynyt</Typography> );
}

export default HaeLaakinnat;
