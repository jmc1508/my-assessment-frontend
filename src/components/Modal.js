import React, { Component } from 'react'
import SignUp from '../containers/SignUp'
import Login from '../containers/Login'

class Modal extends Component {

    state={
        showSignUp:false,
    }

    showSignUp=()=>{
        this.setState({showSignUp:!this.state.showSignUp})
    }
 
    render() {
        
        const {showSignUp}= this.state;
        const {show, showModal,toggle,toggleSignupAlert,toggleSignupFailed}=this.props;
        
        return (
        <div>
            {showSignUp?<SignUp show={show} showModal={showModal} toggle={toggle} toggleSignupFailed={toggleSignupFailed}/>:<Login show={show} showModal={showModal} toggle={toggle} showSignUp={this.showSignUp}/>}
        </div>
        )
    }
}

export default Modal
