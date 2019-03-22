import React, { Component } from 'react'

import JumbotronFluid from '../components/JumobtronFluid'

class HomePage extends Component {

  render() {

    const {users}=this.props

    return (
      <div>
        {/* Component - Jumbotron */}
        <JumbotronFluid/>
        
        
      </div>
    )
  }
}

export default HomePage
