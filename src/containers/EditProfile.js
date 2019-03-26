import React, { Component } from 'react';
// Style
import {Form, 
        Grid,
        Button, 
        Container, 
        Divider,
        Image,
        Message} from 'semantic-ui-react'
// API
import axios from 'axios'

const url_base=process.env.REACT_APP_URL

const gridBody={
    paddingTop:'48px',
    height:'100vh'
}

const messageStyle={
    marginTop:'47px',
    marginBottom:'0'
}

class EditProfile extends Component {

    state={
        editEmail:'',
        editUsername:'',
        editPassword:'',
    }

    // Handle Form Input
    handleInput=event=>{
        this.setState({[event.target.name]:event.target.value})
      }
    
    // Axios - submit edit data to backend
    handleSubmit = event => {
        const jwt= localStorage.getItem('jwt')
        event.preventDefault()
  
        axios({
            method: 'POST',
            url: `${url_base}/api/v1/users/edit`,
            
            
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
            this.props.handleSubmitStates()
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
            var error_msg=error.response.data.message
            this.props.handleSubmitErrors(error_msg)            
        })
    
      }
    
    //   Axios - delete account
    handleDelete=event=>{
        const jwt= localStorage.getItem('jwt')
        event.preventDefault()

        axios({
            method: 'POST',
            url: `${url_base}/api/v1/users/me/delete`,
            
            headers :{
                Authorization: `Bearer ${jwt}`
            },

        })
        .then(response => {
            console.log(response)
            this.props.handleDeleteStates()
            
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
        })
    } 
  
      // Email validation

    validateEmail=(email)=> {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    render() {
        // Props
        const {email,username,password,profile_photo_url,handleDismissPassAlert, success,update_success, delete_success, update_hasErrors,errors,handleSubmitStates, handleSubmitErrors, handleDismissFailAlert, handleDeleteStates, handleDismissDeleteAlert}=this.props
        // States
        const {editEmail,editUsername,}= this.state

        return (
            <div>
            {/* Alert - successful update */}
            {update_success?
              <Message style={messageStyle}
                onDismiss={handleDismissPassAlert}
                success
                header='Your profile has been successfully updated'
              />:null
            }
            

            {/* Alert - unsuccessful update */}
            {update_hasErrors?
              <Message style={messageStyle}
                onDismiss={handleDismissFailAlert}
                negative
                header='User update unsuccessful:'
                content={errors.map((error,index)=> <p>{error}</p>)} 
              />:null
            }

            {/* Alert - successful delete */}
            {delete_success?
              <Message style={messageStyle}
              onDismiss={handleDismissDeleteAlert}
                success
                header='Your profile has been successfully deleted'
              />:null
            }

            <Grid celled style={gridBody}>
                <Grid.Row >
                {/* Column: Put profile photo */}
                    <Grid.Column width={6}>
                    
                        <Image size='large' src="https://react.semantic-ui.com/images/wireframe/image.png"/>

                    </Grid.Column>
                {/* Column: Edit form data */}
                    <Grid.Column width={10}>
                        <Container textAlign='justified'>
                            <h3>Your Information</h3>
                            <p>Edit your user data here.</p>
                            
                        </Container>


                        <Divider/>

                        <Container textAlign='left'>
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
                        </Container>
                        <br/>
                {/* Column: delete account */}

                        <Container textAlign='justified'>
                            <h3>Delete your account</h3>
                            <p>If you really want to leave us, you may do so. Note that this action is irreversible!</p>

                            
                        <Divider/>
                        <Form onSubmit={this.handleDelete}>
                            <Button color='red' >Delete</Button>
                        </Form>

                        </Container>


                    </Grid.Column>

                </Grid.Row>
            </Grid>

            </div>

            
        );
    }
}

export default EditProfile;