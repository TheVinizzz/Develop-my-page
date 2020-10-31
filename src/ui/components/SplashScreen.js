import React from 'react';
import {Box, CircularProgress, makeStyles} from '@material-ui/core';
import "./splash.css";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: "#141526",
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  },
  logo: {
    width: 480,
    maxWidth: '100%'
  }
}));

function Logo(props) {
const LogoVertical = "https://img.quizur.com/f/img5e2ca197f18706.10235136.jpg?lastEdited=1579983258"
    return (
        <img
            alt="Logo"
            src= {LogoVertical}
            {...props}
        />
    );
}

function SlashScreen() {
  const classes = useStyles();

  return (
      <CircularProgress color="secondary" />
  );
}

export default SlashScreen;
