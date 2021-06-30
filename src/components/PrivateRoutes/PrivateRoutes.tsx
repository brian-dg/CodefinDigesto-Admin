import React from "react";
import { Route, Redirect } from "react-router-dom";
import { USER_TOKEN } from "../../utils/constants";

const PrivateRoute = ({ children, ...rest }:any) => {
  const token = localStorage.getItem(USER_TOKEN)
  return (
    <Route
      {...rest}
      render={({ location }) =>

        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
