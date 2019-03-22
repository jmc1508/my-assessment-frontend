import React, { Component } from 'react';
import './App.css';

import { Route, Link, Switch} from "react-router-dom";
import axios from 'axios';

import HomePage from './pages/HomePage';
import Navibar from './components/Navibar';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';



class App extends Component {
  
  state={
    users:[],
  }

  componentDidMount = () => {
    
      const jwt= localStorage.getItem('jwt')

      axios({
          
        method: 'GET',
        url: 'http://127.0.0.1:5000/api/v1/users/',

      
    })
    .then(response => {
        console.log(response)
        const users=response.data
        this.setState({users:users})
      
    })

    .catch(error=>{
        console.log('ERROR: ', error)
 
      })
    }
  

  render() {

    const {users}=this.state;

    return (
      <div className="App">
        <Navibar/>

        <Switch>
          <Route exact path="/" component={props=> <HomePage users={users} {...props}/> } />
          <Route path="/users/me" component={props=> <MyProfilePage users={users} {...props}/>}/>
          <Route path="/users/:id" component={props=> <UserProfilePage users={users} {...props}/>} />
        </Switch>

      </div>
    );
  }
}

export default App;
