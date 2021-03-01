import './App.css';
import {SignUpComponent, SignInComponent} from "./components/onboarding";
import NavBar from "./components/nav-bar-component";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import {useSelector} from "react-redux";
import PrivateRoute from "./routes/private-route";
import ROUTES from "./routes/routes-constants";
import UsersContainer from "./components/users-container";
import {ToastProvider} from "react-toast-notifications";
import {State} from "./store-sagas";

function App() {
    const state = useSelector((state: State) => state);
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Route path='/' exact>
                    <Redirect to={state.auth.token ? ROUTES.dynamic.usersPage(1) : '/sign-in'}/>
                </Route>
                <PrivateRoute path={ROUTES.dynamic.usersPage()} component={UsersContainer}/>
                <Route path={ROUTES.signIn} component={SignInComponent}/>
                <Route path={ROUTES.signUp} component={SignUpComponent}/>
                {/*<Route path = {ROUTES.dynamic.usersPage()} component={Users} />*/}
            </Router>

        </div>
    );
}

export default () => {
    return <ToastProvider><App/></ToastProvider>
};
