import React from "react";
import { Redirect, Route } from "react-router-native";

export default function PrivateRoute({ render, isAuthenticated, ...rest }) {
  // https://reacttraining.com/react-router/web/example/auth-workflow
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          render(props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
