import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';
import { withLDProvider } from 'launchdarkly-react-client-sdk';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/dashboard" component={DashboardScreen} />
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  )
}

// export default App

export default withLDProvider({
  clientSideID: process.env.REACT_APP_LAUNCH_DARKLY_CLIENT_ID,
  options: {
    bootstrap: 'localStorage'
  }
})(App)