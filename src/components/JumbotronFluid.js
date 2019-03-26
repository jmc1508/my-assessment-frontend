import React, { Component } from 'react'
import {Header,
        Grid,
        Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const jumbotronBody={
  height:'100vh',
  backgroundImage:'url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)',
  paddingTop:'46px',
}

const gridBody ={
  height:'100%',
  margin:'0'
};

const gridRow={
  marginTop:'50px'
}

class JumbotronFluid extends Component {

  render() {
    return (
      <div style={jumbotronBody}>
          <Grid style={gridBody} columns={1} centered>
              <Grid.Row style={gridRow}>
                <Grid.Column verticalAlign='top'>
                    <Header as ='h1'>Final Assessment</Header>
                    <Header as ='h3'>Built using ReactJS + Semantic UI React and Flask-Python</Header>

                    <Button><Link to="/users/me">My Profile</Link></Button>
                    <Button><Link to="/news">News API</Link></Button>
                    <Button><Link to="/sectors">Sector Performance API</Link></Button>
                    
                </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
    )
  }
}

export default JumbotronFluid
