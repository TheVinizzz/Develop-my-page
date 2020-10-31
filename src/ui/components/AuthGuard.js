import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {LOGIN_ROUTE} from "../../Router";
import SplashScreen from "./SplashScreen";

function AuthGuard({ children }) {
  const uid = useSelector((state) => state.firebase?.auth?.uid);
  const profile = useSelector(state => state.firebase.profile);



  if (!uid) {
    return <Redirect to={LOGIN_ROUTE} />;
  }

  if(!profile.isLoaded){
    return <SplashScreen/>;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
