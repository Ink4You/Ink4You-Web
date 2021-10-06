import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PasswordRecuperation from './pages/PasswordRecuperation';
import './global.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/Register'>
          <Register />
        </Route>
        <Route path='/Home'>
          <Home />
        </Route>
        <Route path='/PasswordRecuperation'>
          <PasswordRecuperation />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
