import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          // user is authed
          return <Component {...props} />;
        } else {
          // user not authed - redirect to /login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;