import React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import Processing from "../components/Processing";
import { useAuth } from "../reducers/auth-reducer";

import ROUTES from "./constants";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, render, ...rest }) => {
  const { isAuthReady, loading, isLoggedIn } = useAuth();

  const renderComponent = (props: RouteComponentProps) => {
    if (!isAuthReady || loading) {
      return <Processing />;
    } else if (isLoggedIn) {
      return Component ? <Component {...props} /> : null;
    } else {
      return <Redirect to={{ pathname: ROUTES.signIn, state: { from: props.location } }} />;
    }
  };

  return <Route {...rest} render={render || renderComponent} />;
};

export default PrivateRoute;
