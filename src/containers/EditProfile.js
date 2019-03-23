import React, { Component } from 'react';
// Style
import {Form, 
        Grid,
        Button, 
        Container, 
        Divider,
        Segment} from 'semantic-ui-react'

class EditProfile extends Component {


    state={
        editEmail:'',
        editUsername:'',
    }

    static getDerivedStateFromProps(props, state) {
        return{
            editEmail:props.email,
            editUsername:props.username,
        }
    }
    

    // Handle Input

    handleInput=event=>{
        this.setState({[event.target.name]:event.target.value})
      }
    
    render() {
        // Props
        const {email,username,password}=this.props
        // State
        // const {editEmail,editPassword,editUsername}= this.state

        return (
            <div>

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

                        <Form size='large'>
                {/* Username */}
                            <Form.Input name='editUsername' label='Username' type='username' onChange={this.handleInput}  defaultValue={username} />
                {/* Email */}
                            <Form.Input name='editEmail' label='E-mail' type='email' onChange={this.handleInput}  defaultValue={email}/>
                {/* Password */}
                            <Form.Input name='editPassword' label='Password' type='password' onChange={this.handleInput}/>
                {/* Button */}
                            <Button color='teal'>Submit</Button>
                        </Form>

                    </Grid.Column>

                </Grid.Row>
            </Grid>

            </div>

            
        );
    }
}

export default EditProfile;