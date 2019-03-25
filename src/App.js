import React, { Component } from 'react';
import './App.css';

import { Route, Switch} from "react-router-dom";

import HomePage from './pages/HomePage';
import Navibar from './components/Navibar';
import MyProfilePage from './pages/MyProfilePage';
import SectorPerformance from './pages/SectorPerformance';
import NewsAPI from './pages/NewsAPI'

class App extends Component {
  state={
    isLoading:true,
  }

  isLoadingSpinner=()=>{
    this.setState({isLoading:false})
  }

  render() {

    const {isLoading}=this.state
    return (
      <div className="App">
        {/* Component - Navbar */}
        <Navibar/>

        
        {/* Routes */}
        <Switch>
          <Route exact path="/" component={props=> <HomePage {...props}/> } />
          <Route path="/users/me" component={props=> <MyProfilePage {...props}/>}/>
          <Route path="/sectors" component={props=> <SectorPerformance isLoading={isLoading} isLoadingSpinner={this.isLoadingSpinner} {...props}/>}/>
          <Route path="/news" component={props=> <NewsAPI {...props}/>}/>

          {/* <Route path="/users/me" component={props=> <MyProfilePage {...props}/>}/> */}
        </Switch>

      </div>
    );
  }
}

export default App;
