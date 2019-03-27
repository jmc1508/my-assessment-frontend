import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import { Route, Switch} from "react-router-dom";

import HomePage from './pages/HomePage';
import Navibar from './components/Navibar';
import MyProfilePage from './pages/MyProfilePage';
import SectorPerformance from './pages/SectorPerformance';
import NewsAPI from './pages/NewsAPI'

// Declare base url for axios

const url_base=process.env.REACT_APP_URL
// const jwt=localStorage.getItem('jwt')

class App extends Component {
  state={
    isLoading:true,
    users:[],
  }

  componentDidMount () {
    
    // perform a GET request to the API endpoint/URL

    axios({
      method:'get',
      url:`${url_base}/api/v1/users`,
      
      // headers :{
      //   Authorization: `Bearer ${jwt}`}
    })
    .then(response =>{

      const user = response.data      
      this.setState({users:user,
                    isLoading: false});
    })
    
    .catch(error=>{
      console.log('ERROR: ', error)
    })

  
  }

  isLoadingSpinner=()=>{
    this.setState({isLoading:false})
  }

  render() {

    const {isLoading, users}=this.state
    return (
      <div className="App">
        {/* Component - Navbar */}
        <Navibar users={users}/>

        {/* Routes */}
        <Switch>
          <Route exact path="/" component={props=> <HomePage {...props}/> } />
          <Route path="/users/me" component={props=> <MyProfilePage users={users} {...props}/>}/>
          <Route path="/sectors" component={props=> <SectorPerformance isLoading={isLoading} isLoadingSpinner={this.isLoadingSpinner} {...props}/>}/>
          <Route path="/news" component={props=> <NewsAPI {...props}/>}/>
        </Switch>

      </div>
    );
  }
}

export default App;
