import React, { Component } from 'react'
import {Jumbotron,Button} from 'reactstrap'

class JumbotronFluid extends Component {
  render() {
    return (
      <div >
        <Jumbotron fluid>
          <h1>My Final Assessment</h1>
          <p className="lead">Built using ReactJS for the front-end and Python for the back-end </p>
      </Jumbotron>
      </div>
    )
  }
}

export default JumbotronFluid
