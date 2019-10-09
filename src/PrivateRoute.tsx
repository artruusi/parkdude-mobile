import React from 'react'
import { Redirect, Route } from 'react-router-native'

export default function PrivateRoute ({ component: Component, ...rest }) {

  // TODO: Handle authentication
  const isAuthenticated = false;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
