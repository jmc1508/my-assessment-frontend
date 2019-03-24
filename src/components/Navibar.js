import React, { Component } from 'react'
import {Menu,
        Button,
        Icon,
        Message} from 'semantic-ui-react'
import Modal from '../components/Modal'
import {Link,withRouter} from 'react-router-dom'

class Navibar extends Component {

    state={
        show:false,
        signupIsToggled: false,
        logoutIsToggled:false,
        signupFailed:false,
    }

    // Signup: show modal
    showModal = () => {
        this.setState({ show: !this.state.show });
      };
    // Close Modal
    toggle=()=>{
        this.setState({show:!this.state.show});
    }

    // Toggle signup ALERT
    toggleSignupAlert=()=>{
        this.setState({signupIsToggled:!this.state.signupIsToggled})
    }

    // Toggle logout ALERT
    toggleLogoutAlert=()=>{
        this.setState({logoutIsToggled:!this.state.logoutIsToggled})
    }

    // Toggle signup failed
    toggleSignupFailed=()=>{
        this.setState({signupFailed:!this.state.signupFailed})
    }

    // Handle Logout
    handleLogout=()=>{
        localStorage.removeItem('jwt')
        this.toggleLogoutAlert()
        this.forceUpdate()
        this.props.history.push("/")
    }



    // Dismiss Logout Alert
    handleDismiss = () => {
        this.setState({ logoutIsToggled:!this.state.logoutIsToggled })
    }

    

 

    render() {
        
        const {show,signupIsToggled,logoutIsToggled, signupFailed}= this.state

        return (
            <div>
                {/* Alert Message: Signup Toggled */}
                {signupIsToggled?
                    <Message
                        success
                        header='Your user registration was successful'
                    />
                    :
                    null}

                {/* Alert Message: Logout Toggled */}
                {logoutIsToggled?
                    <Message onDismiss={this.handleDismiss}
                        success
                        header='You have successfully logged out'
                    />
                    :
                    null}
                
                {/* Alert Message: Signup Failed */}
                {signupFailed?
                    <Message onDismiss={this.handleDismiss}
                        negative
                        header='Your signup failed'
                    />
                :null}
                
                {/* Toggle:Show Modal */}
                {show? <Modal show={show} showModal={this.showModal} toggle={this.toggle} toggleSignupAlert={this.toggleSignupAlert} toggleSignupFailed={this.toggleSignupFailed}/>:null}

                {/* Menu Items */}
                <Menu>
                    <Menu.Item>
                        <Icon name='chart line' size='large' />
                        <Link to="/">Homepage</Link>
                    </Menu.Item>
                
                {/* My Profile Page */}
                    <Menu.Item position='left'>
                        <Icon name='user circle' size='large'/>
                        <Link to="/users/me">My Profile</Link>
                    </Menu.Item>

                {/* Login/Logout */}
                    {localStorage.getItem('jwt') ?
                        <Menu.Item position='right' floated='right' onClick={this.handleLogout}>
                            <Icon name='sign-out' size='large'/>
                            Logout
                        </Menu.Item>
                        :
                        <Menu.Item position='right' floated='right' onClick={this.showModal}>
                            <Icon name='sign-in' size='large'/>
                            Login
                        </Menu.Item>
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(Navibar)
