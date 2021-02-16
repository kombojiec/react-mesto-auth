import React from 'react';
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

export const ProtectedRoute = ({component: Component, ...props}) => {
  return(
    <Route>
      <CurrentUserContext.Provider value={props.user} >
        {props.loggedIn? <Component {...props} />: <Redirect to='/sign-up'/>}
      </CurrentUserContext.Provider>
    </Route>
  )
}