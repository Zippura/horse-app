import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TallivuorotMUI from './TallivuorotMUI';

const url = 'http://localhost:3000';

function HaeTallivuorot () {

 const [tallit, setTallivuorot] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiTallit = async () => {
  try {
    const response = await fetch(url + '/tallivuorot/all');
    const json = await response.json();
    setTallivuorot(json);
    setVirhe('');
  } catch (error) {
    setTallivuorot([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
 }

 useEffect( () => {
   haeKaikkiTallit();
 })

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (tallit.length > 0) {
   return ( <TallivuorotMUI tallit={ tallit } /> );
 }

 return ( <Typography>Tallivuoroja ei löytynyt</Typography> );
}

export default HaeTallivuorot;
