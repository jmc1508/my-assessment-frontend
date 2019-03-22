import React, { Component } from 'react'

import { Button, 
        Form,
        Modal,
        Message} from 'semantic-ui-react'

// Add on
import axios from 'axios'

class SignUp extends Component {

  state = {
    username:'',
    email:'',
    password:'',
    success:'',
    errors:[],
    hasErrors:false,
  }

  // Event: handle submit
  handleSubmit = event => {
    event.preventDefault()

      axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/',
          data: {
              username:this.state.username,
              email:this.state.email,
              password: this.state.password,
          }
      })
      .then(response => {
          console.log(response)
          setTimeout(this.props.toggle,1000)

          this.setState({hasErrors:false, 
                          success:response.data.message,
                         })          
      })

      .catch(error=>{
          console.log('ERROR: ', error)

      })
  
    }

  // Event: handle form data input
  handleInput = event => {

    this.setState({[event.target.name]: event.target.value})
    
  }

  // Email validation

  validateEmail=(email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {

    const{username,email,password, success, hasErrors}= this.state;
    const{show,showModal,toggle,toggleSignupAlert}=this.props;

    return (
      <div>
        <Modal open={show} onClose={toggle} size='small' closeIcon>
            {/* Header */}
            <Modal.Header>
                Sign Up
            </Modal.Header>

            {success?
              <Message
                success
                header='Your user registration was successful'
                content='You have now been logged in'
              />:
              null
              }

            {/* Body */}
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Input name='username' label='Username' placeholder='Enter username' onChange={this.handleInput}/>
                  <Form.Input name='email' label='Email' placeholder='johnsmith@gmail.com' onChange={this.handleInput}></Form.Input>
                  <Form.Input name='password' type='password' label='Password' onChange={this.handleInput}></Form.Input>
                  
                  <Form.Field>
                    <Button content='Primary' disabled={email && password && username && this.validateEmail(email) ? false: true} type='submit'>Sign Up</Button>
                  </Form.Field>
              </Form>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default SignUp
