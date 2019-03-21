import React, { Component } from 'react'
import { Button, Form,Modal} from 'semantic-ui-react'


class Login extends Component {

  


  render() {
    const{show,showModal, closeModal}= this.props
    return (
      <div>
        <Modal open={show} onClose={closeModal} size='small' closeIcon>
          
          {/* Header */}
          <Modal.Header>
              Login
          </Modal.Header>
          {/* Body */}
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' />
              </Form.Field>
              
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Login
