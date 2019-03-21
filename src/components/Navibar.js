import React, { Component } from 'react'
import {Menu,
        Button,
        Icon} from 'semantic-ui-react'
import Modal from '../components/Modal'

class Navibar extends Component {

    state={
        show:false,
    }

    // Signup: show modal
    showModal = () => {
        this.setState({ show: !this.state.show });
      };
    
    closeModal=()=>{
        this.setState({show:false});
    }

    render() {
        
        const {show}= this.state

        return (
            <div>
                {/* Toggle:Show Modal */}
                {show? <Modal show={show} showModal={this.showModal} closeModal={this.closeModal}/>:null}

                {/* Menu Items */}
                <Menu>
                    
                    <Menu.Item>
                        <Icon name='chart line' size='large' />
                        Homepage
                    </Menu.Item>

                    <Menu.Item position='right'>
                        <Button primary floated='right' onClick={this.showModal}>Sign up</Button>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Navibar
