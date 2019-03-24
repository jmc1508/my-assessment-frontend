import React, { Component } from 'react';
import './App.css';

import { Route, Switch} from "react-router-dom";
import axios from 'axios';

import HomePage from './pages/HomePage';
import Navibar from './components/Navibar';
import MyProfilePage from './pages/MyProfilePage';
import SignUp from './containers/SignUp'




class App extends Component {
  
  render() {


    return (
      <div className="App">
        {/* Component - Navbar */}
        <Navibar/>

        
        {/* Routes */}
        <Switch>
          <Route exact path="/" component={props=> <HomePage {...props}/> } />
          <Route path="/users/me" component={props=> <MyProfilePage {...props}/>}/>
          {/* <Route path="/users/me" component={props=> <MyProfilePage {...props}/>}/> */}
        </Switch>

      </div>
    );
  }
}

export default App;
