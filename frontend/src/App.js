import React from 'react';
import {Login} from './components/login';
import Signup from './components/signup'
import LandingPage from './components/homepage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavigationBar from "./components/NavigationBar";
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/homepage';


function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/home' component={HomePage}/>
        <PrivateRoute exact path='/homepage' component={LandingPage}/>
      </Router>
    </div>
  );
}



export default App;
