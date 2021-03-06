import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Button, 
        Form,
        Modal,
        Message} from 'semantic-ui-react'
// Add on
import axios from 'axios'

const url_base=process.env.REACT_APP_URL


class Login extends Component {
    state = {
          email:'',
          password:'',
          username:'',
          success:'',
          errors:[],
          hasErrors:'',
      }

    // Event: handle input
    handleInput = event => {
      this.setState({[event.target.name]: event.target.value})
    }

    // Event: handle submit
    handleSubmit = event => {
      event.preventDefault()

      axios({
          method: 'POST',
          url: `${url_base}/api/v1/login`,
          data: {
              email:this.state.email,
              password: this.state.password,
          }
      })
      .then(response => {
          console.log(response)
          // Grab local storage data, including authentication key
          setTimeout(this.props.toggle,1000)
          localStorage.setItem('myData',JSON.stringify(response.data))
          localStorage.setItem('jwt', response.data.auth_token)
          this.props.history.push("/users/me")
          this.setState({success:response.data.message,
                          email:response.data.user.email,
                          username:response.data.user.username,
                          hasErrors:''})
      })

      .catch(error=>{
          console.log('ERROR: ', error)
          this.setState({hasErrors:!this.state.hasErrors,
                        errors:error.response.data.message})

      })
  
    }
    
    // Email validation

    validateEmail=(email)=> {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

  render() {
    const{show, toggle, showSignUp, showSignUpModal,showModal,validateEmail}= this.props
    const{email,password,success,hasErrors}=this.state
    return (
      <div>
        <Modal open={show} onClose={showModal} size='tiny' closeIcon>
          {/* Header */}
          <Modal.Header>
              Login
          </Modal.Header>

          {/* Message: Alert if successful login */}
          {success && hasErrors==''?
              <Message
                success
                header='Your login request was successful'
                content='You have now been logged in'
              />:
              null
            }
          {/* Message: Alert if failed login */}
          {hasErrors && success==''?
              <Message  
                negative
                header='Your login request was unsuccessful'
                content='Please login again'
              />:
              null
              }
          {/* Body */}
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
                <Form.Input name='email' label='Email' icon='mail' placeholder='johnsmith@gmail.com' onChange={this.handleInput}></Form.Input>
                <Form.Input name='password' type='password' icon='lock' label='Password' onChange={this.handleInput}></Form.Input>         
          {/* Disable: If error validation=True */}
                <Form.Field>
                  <Button color='teal' disabled={email && password && validateEmail(email) ? false: true} type='submit'>Login</Button>
                </Form.Field>
          {/* Toggle SignUp Page */}
                <Form.Field>
                  <Link to="/" onClick={showSignUpModal}>If you are not an existing user, sign up here!</Link>
                </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default withRouter(Login)
