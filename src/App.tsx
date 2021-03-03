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
import UserInfo from "./components/user-info";
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
                <PrivateRoute path={ROUTES.dynamic.usersPage()} exact component={UsersContainer}/>
                <PrivateRoute path={ROUTES.dynamic.user()} exact component={UserInfo} />
                <Route path={ROUTES.signIn} component={SignInComponent}/>
                <Route path={ROUTES.signUp} component={SignUpComponent}/>
            </Router>

        </div>
    );
}

export default () => {
    return <ToastProvider><App/></ToastProvider>
};
