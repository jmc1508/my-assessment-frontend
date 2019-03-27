import React, { Component } from 'react'

// Pages, components and containers
import JumbotronFluid from '../components/JumbotronFluid'

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
