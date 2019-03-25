import React, { Component } from 'react'
import {Menu,
        Button,
        Icon,
        Message} from 'semantic-ui-react'
// Components
import Modal from '../components/Modal'
import SignUp from '../containers/SignUp'

import {Link,withRouter} from 'react-router-dom'

// Style - fix menu item margin issue
const menuItem={
    marginLeft:'0',
}

const messageStyle={
    marginTop:'47px',
    marginBottom:'0'
}

class Navibar extends Component {

    state={
        show:false,
        signupIsToggled: false,
        logoutIsToggled:false,
        signupFailed:false,
        showSignUp:false,
    }

    // Show modal
    showModal = () => {
        this.setState({ show:!this.state.show});
    }
    // SignUp Modal - display from Modal
    showSignUpModal=()=>{
        this.setState({showSignUp:!this.state.showSignUp,
                        show:true})
    }
    // SignUp Modal - to refresh state when dismissing
    toggle=()=>{
        this.setState({show:!this.state.show,
                        showSignUp:false})
    }
    // Toggle logout ALERT
    toggleLogoutAlert=()=>{
        this.setState({logoutIsToggled:!this.state.logoutIsToggled,
                        })
    }
    // Toggle signup ALERT
    toggleSignupAlert=()=>{
        this.setState({signupIsToggled:!this.state.signupIsToggled})
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
    // Render
    render() {
        
        const {show,signupIsToggled,logoutIsToggled, signupFailed, showSignUp}= this.state

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
                    <Message style={messageStyle} onDismiss={this.handleDismiss}
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
                {show? <Modal show={show} showModal={this.showModal} showSignUp={showSignUp} toggle={this.toggle} toggleSignupAlert={this.toggleSignupAlert} toggleSignupFailed={this.toggleSignupFailed} showSignUpModal={this.showSignUpModal}/>:null}

                {/* Menu Items */}
                <Menu fixed='top'>
                    <Menu.Item>
                        <Icon name='home' size='large' />
                        <Link to="/">Homepage</Link>
                    </Menu.Item>
                
                {/* My Profile Page */}
                    <Menu.Item >
                        <Icon name='user circle' size='large'/>
                        <Link to="/users/me">My Profile</Link>
                    </Menu.Item>
                
                {/* Companies - API */}
                    <Menu.Item >
                        <Icon name='chart line' size='large'/>
                        <Link to="/companies">Companies</Link>
                    </Menu.Item>
                
                {/* Sectors - API */}
                <Menu.Item position ='left'>
                        <Icon name='chart line' size='large'/>
                        <Link to="/sectors">Sectors</Link>
                    </Menu.Item>

                {/* Signup */}
                    <Menu.Item onClick={this.showSignUpModal}>
                        <Icon name='signup' size='large'/>
                        Sign Up
                    </Menu.Item>

                {/* Login/Logout */}
                    {localStorage.getItem('jwt') ?
                        <Menu.Item onClick={this.handleLogout}>
                            <Icon name='sign-out' size='large'/>
                            Logout
                        </Menu.Item>
                        :
                        <Menu.Item onClick={this.showModal}>
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
