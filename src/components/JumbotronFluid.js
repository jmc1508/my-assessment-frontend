import React, { Component } from 'react'
import {Header,
        Grid} from 'semantic-ui-react'

const jumbotronBody={
  height:'30vh',
  backgroundImage:'url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)',
  marginTop:'47px',
}

const gridBody ={
  height:'100%',
  margin:'0'
};

class JumbotronFluid extends Component {

  render() {
    return (
      <div style={jumbotronBody}>
          <Grid style={gridBody} columns={1} centered>
              <Grid.Column verticalAlign='middle'>
                  <Header as ='h1'>Final Assessment</Header>
                  <Header as ='h3'>Built using ReactJS and Python</Header>
              </Grid.Column>
          </Grid>
      </div>
    )
  }
}

export default JumbotronFluid
