import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Header from './shared/header/Header';
import Admin from './components/admin/Admin';
import Poll from './components/poll/Poll';
import Results from './components/results/Results';
import Login from './components/login/Login';

class App extends Component {
  render(props) {
    return (
      <div className="App">
          <Header {...props}/>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/poll" component={Poll} />
            <Route path="/results" component={Results} />
            <Route path="/Login" component={Login} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/results" />
          </Switch>
      </div>
    );
  }
}

export default App;
