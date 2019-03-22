import React, { Component } from 'react';
// Style
import {Form, 
        Grid,
        Button, 
        Container, 
        Divider,
        Segment} from 'semantic-ui-react'

class EditProfile extends Component {
    render() {

        const {email,username}=this.props

        return (
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
                            <Form.Input label='Username' type='username' defaultValue={username} />
                {/* Email */}
                            <Form.Input label='E-mail' type='email' defaultValue={email}/>
                {/* Password */}
                            <Form.Input label='Password' type='password'/>
                {/* Button */}
                            <Button color='teal'>Submit</Button>
                        </Form>

                    </Grid.Column>

                </Grid.Row>
            </Grid>

            
        );
    }
}

export default EditProfile;