import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MaksutMUI from './MaksutMUI';

const url = 'http://localhost:3000';

function HaeMaksut() {

  const [maksutiedot, setMaksut] = useState([]);
  const [virhe, setVirhe] = useState('Haetaan');

  const haeKaikkiMaksutiedot = async () => {
    try {
      const response = await fetch(url + '/maksut/all');
      const json = await response.json();
      setMaksut(json);
    } catch (error) {
      setMaksut([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }

  useEffect(() => {
    let isCancelled = false;
    haeKaikkiMaksutiedot().then(() => {
      if (!isCancelled) {
        setVirhe('');
      }

      return () => {
        isCancelled = true;
      };
    });
  })

  if (virhe.length > 0) {
    return (<Typography>{virhe}</Typography>);
  }

  if (maksutiedot.length > 0) {
    return (<MaksutMUI maksutiedot={maksutiedot} />);
  }

  return (<Typography>Maksuja ei löytynyt</Typography>);
}

export default HaeMaksut;
