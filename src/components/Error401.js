import React, { Component } from 'react';

// Style
import '../index.css'
import {Grid} from 'semantic-ui-react'

const error401={
    height:'100vh',
    backgroundColor:'#b2d8d8',
    marginTop: '14px'
}

const gridBody ={
    height:'100%',
};

const gridColumn={
    marginTop:'50px',
}


class Error401 extends Component {
    render() {
        return (
            <div style={error401}>
                <Grid style={gridBody} columns={1} centered>

                    <Grid.Column style={gridColumn}  textAlign='center'>
                        <h1>Error</h1>
                        <h3>You are not authorised to view this page.</h3>
                    </Grid.Column>

                </Grid>
            </div>
        );
    }
}

export default Error401;