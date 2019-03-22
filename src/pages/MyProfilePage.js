import React, { Component } from 'react'
import axios from 'axios'

class MyProfilePage extends Component {

  // Make API request
  componentDidMount = () => {

    const jwt= localStorage.getItem('jwt')

    axios({
        
      method: 'GET',
      url: 'http://127.0.0.1:5000/api/v1/users/me',

      headers :{
          Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
        console.log(response)

    })

    .catch(error=>{
        console.log('ERROR: ', error)
      })

  }
  


  render() {
    return (
      <div>
          My Profile Page
      </div>
    )
  }
}

export default MyProfilePage
