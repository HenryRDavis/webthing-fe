import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Login} from './components/login';
import Signup from './components/signup'
import LandingPage from './components/homepage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Router path='/login' component={Login}/>
        <Router path='/signup' component={Signup}/>
        <Router exact path='/' component={LandingPage}/>
      </Router>
    </div>
  );
}



export default App;
