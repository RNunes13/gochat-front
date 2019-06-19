
import * as React from 'react';
import qs from 'querystring';
import Auth from '../services/auth';
import Loadable from 'react-loadable';
import { Loader } from '../components';
import { Redirect, Route, Switch } from 'react-router-dom';

// Dynamic import
const loading = () => <Loader loading />

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login'), loading
});

/**
 * Handles redirection safely when not logged in.
 */
const PrivateRoute = ({ component, user, ...rest }: any) => (
  <Route {...rest} render={(props: any) => {
    if (Auth.getCurrentUser()) {
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
    <PrivateRoute exact path="/" component={ () => <div>Root route</div> } />
    <Route exact path="/login" component={ Login } />
  </Switch>
);
