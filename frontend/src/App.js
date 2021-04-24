import React from 'react';
import {Login} from './components/login';
import Signup from './components/signup'
import LandingPage from './components/homepage'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route exact path='/' component={LandingPage}/>
      </Router>
    </div>
  );
}



export default App;
