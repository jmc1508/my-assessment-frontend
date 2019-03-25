import React, { Component } from 'react'
import SignUp from '../containers/SignUp'
import Login from '../containers/Login'

class Modal extends Component {

  
    render() {
        
        // const {showSignUp}= this.state;
        const {show, showModal,toggle,toggleSignupAlert,toggleSignupFailed, showSignUp, showSignUpModal}=this.props;
        
        return (
        <div>
            {showSignUp?<SignUp show={show} showSignUp={showSignUp} showModal={showModal} toggle={toggle} toggleSignupFailed={toggleSignupFailed} showSignUpModal={showSignUpModal}/>:<Login show={show} showModal={showModal} toggle={toggle} showSignUp={showSignUp} showSignUpModal={showSignUpModal}/>}
        </div>
        )
    }
}

export default Modal
