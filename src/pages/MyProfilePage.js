import React, { Component } from 'react'
import axios from 'axios'

import EditProfile from '../containers/EditProfile'

class MyProfilePage extends Component {

    state={
      hasErrors:false,
      errors:[],
      email:'',
      username:'',
      password:'',
      dismissAlert:false,
    }


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

          this.setState({email:response.data.email,
                        username:response.data.username})

      })

      .catch(error=>{
          console.log('ERROR: ', error)
          this.setState({errors:error.response.data.error,
                        hasErrors:!this.state.hasErrors})
        })

    }
    
    render() {
      const jwt=localStorage.getItem('jwt')
      const {email,username,password,dismissAlert, hasErrors,errors}=this.state
      return (
        <div>
        {/* If logged in, allow user to fill up profile page */}
            {jwt?
            <EditProfile email={email} username={username} password={password} hasErrors={hasErrors} errors={errors} dismissAlert={dismissAlert}/>
            :
            <h1>You are not authorised to view this page</h1>}

            
        </div>
      )
    }
}

export default MyProfilePage
