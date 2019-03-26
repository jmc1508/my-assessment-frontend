import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import EditProfile from '../containers/EditProfile'
import Error401 from '../components/Error401'

class MyProfilePage extends Component {

    state={
      email:'',
      username:'',
      password:'',
      
      success:false,
      errors:[],
      
      update_success:false,
      update_hasErrors:false,

      delete_success:false,
      delete_hasErrors:false,

      redirect_home:false,
    }
    // Dismiss Alert - Fail
    handleDismissFailAlert=()=>{
      this.setState({update_hasErrors:!this.state.update_hasErrors,
                    errors:[]})
    }

    // Dismiss Alert - Pass
    handleDismissPassAlert=()=>{
      this.setState({update_success:!this.state.update_success})
    }

    // Dismiss Alert - Delete
    handleDismissDeleteAlert=()=>{
      localStorage.removeItem('jwt')
      this.setState({delete_success:!this.state.delete_success,
                    redirect_home:!this.state.redirect_home})
    }

    // Handle submit successful
    handleSubmitStates=()=>{
      this.setState({update_success:!this.state.update_success,
                    update_hasErrors:false})
    }

    // Handle submit errors
    handleSubmitErrors=(error_msg)=>{
      this.setState({update_hasErrors:!this.state.update_hasErrors,
                    errors:error_msg})
    }

    // Handle delete successful
    handleDeleteStates=()=>{
      this.setState({delete_success:!this.state.delete_success
                      })
    }

    componentDidMount = () => {

      const jwt= localStorage.getItem('jwt')
      
      // Fetch: axios
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
                        update_hasErrors:!this.state.update_hasErrors})
        })

    }
    // Render
    render() {
      const jwt=localStorage.getItem('jwt')
      const {email,username,password,dismissAlert, update_hasErrors,errors, success, update_success, delete_success, redirect_home}=this.state

      return (
        <div>
            {/* If logged in, allow user to fill up profile page */}
            {jwt?
            <EditProfile email={email} username={username} password={password} update_hasErrors={update_hasErrors} errors={errors} success={success} update_success={update_success} delete_success={delete_success}  handleDeleteStates={this.handleDeleteStates} dismissAlert={dismissAlert} handleDismissPassAlert={this.handleDismissPassAlert} handleSubmitStates={this.handleSubmitStates} handleSubmitErrors={this.handleSubmitErrors} handleDismissFailAlert={this.handleDismissFailAlert} handleDismissDeleteAlert={this.handleDismissDeleteAlert}/>
            :
            <Error401/>}
            {/* If logged out, redirect user to home */}
            {redirect_home?
            <Redirect to ='/'/>
            :null}
            
        </div>
      )
    }
}

export default MyProfilePage
