import React, { Component } from 'react'

class UserProfilePage extends Component {
  render() {

    let userId = this.props.match.params.id 
    const {users}=this.props

    let currentUser=users.find((user)=>(
        
      user.id==userId

    ))
    return (
      <div>
          <h1>User Profile Page</h1>
      </div>
    )
  }
}

export default UserProfilePage
