import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Items from './Items';
import {Login} from './Login';
import {User} from './User';
import {Register} from './Register';
import {NoMatch} from './NoMatch';
import {Home} from './Home';
import {Admin} from './Admin'
import {About} from './About';
import {Layout} from './components/Layout';
import {NavigationBar} from './components/NavigationBar';
import {Jumbotron} from './components/Jumbotron';

function App() {
  return (
    <React.Fragment>
      <NavigationBar/>
      <Jumbotron/>
      <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/Items" component={Items}/>
          <Route exact path="/About" component={About}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/User" component={User}/>
          <Route exact path="/Admin" component={Admin}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
      </Layout>
    </React.Fragment>
    
  );
}

export default App;
