import './App.css';
import {SignUpComponent, SignInComponent} from "./components/onboarding";
import NavBar from "./components/nav-bar-component";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector} from "react-redux";
import Users from "./components/users";
// import Processing from "./components/processing";
import PrivateRoute from "./routes/private-route";

function App() {
  const state: any = useSelector(state => state);
  return (
    <div className="App">
      {/*{state.loading ? <Processing/> : null}*/}
      <Router>
        <NavBar/>
        <Route path='/'>
          <Redirect to={state.auth.token ? '/users-page-1' : '/sign-in'} />
        </Route>
        <PrivateRoute path='/users-page-1' component={Users} />
        <Route path='/sign-in' component={SignInComponent} />
        <Route path='/sign-up' component={SignUpComponent} />
      </Router>

    </div>
  );
}

export default App;
