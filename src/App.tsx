import './App.css';
import LoggedOutComponent from "./components/logged-out";
import {SignUpComponent, SignInComponent} from "./components/onboarding";
import NavBar from "./components/nav-bar-component";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector} from "react-redux";
import Users from "./components/users";
import Processing from "./components/Processing";
import Private from "./routes/Private";

function App() {
  const state: any = useSelector(state => state);
  return (
    <div className="App">
      {state.loading ? <Processing/> : null}
      <Router>
        <NavBar/>
        <Route path='/'>
          <Redirect to={state.token ? '/users-page-1' : '/unsigned'} />
        </Route>
        <Route path='/unsigned' component={LoggedOutComponent} />
        <Route path='/sign-in' component={SignInComponent} />
        <Route path='/sign-up' component={SignUpComponent} />
        <Private path='/users-page-1' component={Users} />
      </Router>

    </div>
  );
}

export default App;
