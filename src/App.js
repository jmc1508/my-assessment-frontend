import React, { Component } from 'react';
import './App.css';

import { Route, Switch} from "react-router-dom";

import HomePage from './pages/HomePage';
import Navibar from './components/Navibar';
import MyProfilePage from './pages/MyProfilePage';
import SectorPerformance from './pages/SectorPerformance';




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
          <Route path="/sectors" component={props=> <SectorPerformance {...props}/>}/>
          
          {/* <Route path="/users/me" component={props=> <MyProfilePage {...props}/>}/> */}
        </Switch>

      </div>
    );
  }
}

export default App;
