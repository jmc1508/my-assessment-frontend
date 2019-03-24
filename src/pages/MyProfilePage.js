import React, { Component } from 'react'
import axios from 'axios'

import EditProfile from '../containers/EditProfile'

class MyProfilePage extends Component {

    state={
      email:'',
      username:'',
      password:'',
      dismissAlert:false,
      
      success:false,
      hasErrors:false,
      errors:[],
    }
    // Dismiss Alert - Fail
    handleDismissFailAlert=()=>{
      this.setState({hasErrors:!this.state.hasErrors,
                    errors:[]})
    }

    // Dismiss Alert - Pass
    handleDismissPassAlert=()=>{
      this.setState({dismissAlert:!this.state.dismissAlert,
                    success:!this.state.success})
    }

    // Handle submit successful
    handleSubmitStates=()=>{
      this.setState({success:!this.state.success,
                    hasErrors:false,
                    })
    }

    // Handle submit errors
    handleSubmitErrors=(error_msg)=>{
      this.setState({hasErrors:!this.state.hasErrors,
                    errors:error_msg})
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
      const {email,username,password,dismissAlert, hasErrors,errors, success}=this.state

      return (
        <div>
        {/* If logged in, allow user to fill up profile page */}
            {jwt?
            <EditProfile email={email} username={username} password={password} hasErrors={hasErrors} errors={errors} success={success} dismissAlert={dismissAlert} handleDismissPassAlert={this.handleDismissPassAlert} handleSubmitStates={this.handleSubmitStates} handleSubmitErrors={this.handleSubmitErrors} handleDismissFailAlert={this.handleDismissFailAlert}/>
            :
            <h1>You are not authorised to view this page</h1>}

            
        </div>
      )
    }
}

export default MyProfilePage
