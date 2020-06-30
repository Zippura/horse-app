import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardNavi from './navigation/DashboardNavi';
import HaeLiikutus from './components/HaeLiikutus';
import LisaaliikutusMUI from './components/LisaaliikutusMUI';
import LiikutusEditMUI from './components/LiikutusEditMUI';
import HevonenEditMUI from './components/HevonenEditMUI';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {main: pink[500], contrastText: pink[50]},
    secondary: {main: pink[400], contrastText: '#FFFFFF'},
    text: {primary: pink[800], secondary: '#000000', contrastText: '#FFFFFF' },
    action: { active: pink[500], hover: pink[50], selected: pink[300], contrastText: '#FFFFFF' },
    background: {default: '#FFFFFF'},
   },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'], 
   },
  });

  function PaivakirjaApp () {
    return (
     <BrowserRouter>
       <MuiThemeProvider theme={ theme }>
       <div>
         <CssBaseline />
         <DashboardNavi />
         <Switch>
           <Route path='/liikutukset/' component={ HaeLiikutus } />
           <Route path='/editliik/:id/:paiva/:hlo/:saatila/:kuvaus?' component={ LiikutusEditMUI } />
           <Route path='/lisaaliikutus/' component={ LisaaliikutusMUI } />
           <Route path='/hevonenedit/' component={ HevonenEditMUI } />
         </Switch>
         </div>
       </MuiThemeProvider>
     </BrowserRouter>
    );
 }

export default PaivakirjaApp;