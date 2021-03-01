import React from 'react';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import Processing from "../components/processing";
import useAuth from "../support/use-auth";
import ROUTES from "./routes-constants";

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, render, ...rest }) => {
    const {loading, isLoggedIn } = useAuth();

    const renderComponent = (props: RouteComponentProps) => {
        if (loading) {
            return <Processing />;
        } else
            if (isLoggedIn) {
            return Component ? <Component {...props} /> : null;
        } else {
            return <Redirect to={{ pathname: ROUTES.signIn, state: { from: props.location } }} />;
        }
    };

    return <Route {...rest} render={render || renderComponent} />;
};

export default PrivateRoute;