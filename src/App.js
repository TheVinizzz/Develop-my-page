import React from 'react';
import {Router} from 'react-router-dom';
import './App.css';
import Routes from "./Router";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {createBrowserHistory} from "history";
import * as colors from "@material-ui/core/colors";
import {SnackbarProvider} from "notistack";


const history = createBrowserHistory();
// use default theme
//const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({

  palette: {
    primary: {
      contrastText: "#fff",
      main: "#C9D700"
    },
    secondary: {
      main: '#64b6ac',
      contrastText: "#fff",
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[400]
    }
  }
});

function App() {
  return (

      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router history={history}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
  );
}

export default App;
