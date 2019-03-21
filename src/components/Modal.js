import React, { Component } from 'react'
import SignUp from '../containers/SignUp'
import Login from '../containers/Login'

class Modal extends Component {

    state={
        showSignUp:false,
    }
 

    render() {
        
        const {showSignUp}= this.state;
        const {show, showModal,closeModal}=this.props;
        
        return (
        <div>
            {showSignUp?<SignUp/>:<Login show={show} showModal={showModal} closeModal={closeModal}/>}
        </div>
        )
    }
}

export default Modal
