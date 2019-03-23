import React, { Component } from 'react';
// Style
import {Form, 
        Grid,
        Button, 
        Container, 
        Divider,
        Message} from 'semantic-ui-react'
// API
import axios from 'axios'


class EditProfile extends Component {

    state={
        editEmail:'',
        editUsername:'',
        editPassword:'',
        success:false,
        hasErrors:'',
        errors:[],
    }

    // Handle Form Input
    handleInput=event=>{
        this.setState({[event.target.name]:event.target.value})
      }
    
    // Dismiss Alert - Fail
    handleDismissFailAlert=()=>{
        this.setState({hasErrors:!this.state.hasErrors,
                      errors:[]})
      }

    // Dismiss Alert - Pass
    handleDismissPassAlert=()=>{
        this.setState({success:!this.state.success})
      }

    // Axios - submit data to backend
    handleSubmit = event => {
        const jwt= localStorage.getItem('jwt')
        event.preventDefault()

  
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/users/edit',
            
            
            data: {
                editEmail:this.state.editEmail,
                editUsername:this.state.editUsername,
                editPassword:this.state.editPassword,

            },
            headers :{
                Authorization: `Bearer ${jwt}`
            },

        })
        .then(response => {
            console.log(response)
            this.setState({success:!this.state.success,
                            hasErrors:false})
            
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
            this.setState({hasErrors:!this.state.hasErrors,errors:error.response.data.message})
            
        })
    
      }
      
  
      // Email validation

    validateEmail=(email)=> {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    render() {
        // Props
        const {email,username,password}=this.props
        const {editEmail,editUsername, success, hasErrors,errors}= this.state

        return (
            <div>
            {/* Alert - successful update */}
            {success?
              <Message
                onDismiss={this.handleDismissPassAlert}
                success
                header='Your profile has been successfully updated'
              />:null
            }

            {/* Alert - unsuccessful update */}
            {hasErrors?
              <Message
                onDismiss={this.handleDismissFailAlert}
                negative
                header='User update unsuccessful:'
                content={errors.map((error,index)=> <p>{error}</p>)}
                
              />:null
            }

            <Grid celled style={{height:'100vh'}}>
                <Grid.Row >
                {/* Column: Put profile photo */}
                    <Grid.Column width={6}>



                    </Grid.Column>
                {/* Column: Form data */}
                    <Grid.Column width={10}>
                        <Container textAlign='justified'>
                            <p>Edit your user data here. You can also delete your account.</p>
                            <p>Your Information</p>
                            
                        </Container>


                        <Divider/>

                        <Form size='large'onSubmit={this.handleSubmit}>
                {/* Username */}
                            <Form.Input name='editUsername' label='Username' type='username' onChange={this.handleInput}  defaultValue={username}/>
                {/* Email */}
                            <Form.Input name='editEmail' label='E-mail' type='email' onChange={this.handleInput}  defaultValue={email}/>
                {/* Password */}
                            <Form.Input name='editPassword' label='Password' type='password' onChange={this.handleInput}/>
                {/* Button */}
                            <Button color='teal' >Submit</Button>
                        </Form>

                    </Grid.Column>

                </Grid.Row>
            </Grid>

            </div>

            
        );
    }
}

export default EditProfile;