import React, { Component } from 'react'
import SignUp from '../containers/SignUp'
import Login from '../containers/Login'

class Modal extends Component {

    // Email validation
    validateEmail=(email)=> {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Password validation
    validatePassword=(password)=>{
        if (password.length<8){
        return false
        } else {
        return true
        }
    }

    render() {
        
        // const {showSignUp}= this.state;
        const {show, showModal,toggle,toggleSignupAlert,toggleSignupFailed, showSignUp, showSignUpModal}=this.props;
        
        return (
        <div>
            {showSignUp?<SignUp show={show} showSignUp={showSignUp} showModal={showModal} toggle={toggle} toggleSignupFailed={toggleSignupFailed} showSignUpModal={showSignUpModal} validatePassword={this.validatePassword} validateEmail={this.validateEmail}/>:<Login show={show} showModal={showModal} toggle={toggle} showSignUp={showSignUp} showSignUpModal={showSignUpModal} validatePassword={this.validatePassword} validateEmail={this.validateEmail}/>}
        </div>
        )
    }
}

export default Modal
