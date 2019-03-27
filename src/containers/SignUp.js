import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Button, 
        Form,
        Modal,
        Message} from 'semantic-ui-react'

// Add on
import axios from 'axios'

const url_base=process.env.REACT_APP_URL

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
          url: `${url_base}/api/v1/users/`,
          data: {
              username:this.state.username,
              email:this.state.email,
              password: this.state.password,
          }
      })
      .then(response => {
          console.log(response)
          localStorage.setItem('myData',JSON.stringify(response.data))
          localStorage.setItem('jwt', response.data.auth_token)
          setTimeout(this.props.toggle,1000)
          this.props.history.push("/")
          this.setState({hasErrors:false, 
                          success:response.data.message,
                         })          
      })

      .catch(error=>{
          console.log('ERROR: ', error)
          this.setState({errors:error.response.data.message, 
                        success:false, 
                        hasErrors:!this.state.hasErrors})
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

    const{username,email,password, success, hasErrors, errors}= this.state;
    const{show,showModal, showSignUp,toggle,toggleSignupAlert,toggleSignupFailed}=this.props;

    return (
      <div>
        <Modal open={show} onClose={toggle} size='small' closeIcon>
            {/* Header */}
            <Modal.Header>
                Sign Up
            </Modal.Header>
            {/* Alert - successful signup */}
            {success && hasErrors==''?
              <Message
                success
                header='Your user registration was successful'
                content='You have now been logged in'
              />:null
            }

            {/* Alert - unsuccessful signup */}
            {hasErrors && errors?
              <Message
                negative
                header='User registration unsuccessful:'
                content={errors.map((error,index)=> <p>{error}</p>)}
                
              />:null
            }


            {/* Body */}
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Input name='username' label='Username' placeholder='Enter username' onChange={this.handleInput}/>
                  <Form.Input name='email' label='Email' placeholder='johnsmith@gmail.com' onChange={this.handleInput}></Form.Input>
                  <Form.Input name='password' type='password' label='Password' onChange={this.handleInput}></Form.Input>
                  
                  <Form.Field>
                    <Button color='teal' disabled={email && password && username && this.validateEmail(email) ? false: true} type='submit'>Sign Up</Button>
                  </Form.Field>
              </Form>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default withRouter(SignUp)
