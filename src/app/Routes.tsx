
import * as React from 'react';
import Loadable from 'react-loadable';
import qs from 'querystring';
import { Redirect, Route, Switch } from 'react-router-dom';

// Dynamic import
// const loading = () => <Loader loading />

// const Component = Loadable({
//   loader: () => import(/* webpackChunkName: "ComponentName" */ '../views'), loading
// });

/**
 * Handles redirection safely when not logged in.
 */
const PrivateRoute = ({ component, ...rest }: any) => (
  <Route {...rest} render={(props: any) => {
    if (false) { // Verified user login
      return React.createElement(component, { ...props });
    }

    return <Redirect to={{
      pathname: '/login',
      search: `?${qs.stringify({ from: props.location.pathname })}`,
    }} />;
  }} />
);

/**
 * The main application router.
 */
export const MainRouter = () => (
  <Switch>
  </Switch>
);
