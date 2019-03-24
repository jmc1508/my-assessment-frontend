import React, { Component } from 'react';
import axios from 'axios'
import {Button,
        List} from 'semantic-ui-react'

const api_key=process.env.REACT_APP_ALPHA_VANTAGE

// Style
const divBody={
    marginTop:'50px'
}

class SectorPerformance extends Component {

    state={
        perf_1day:'',
    }

    handleSubmit = () => {
      
        axios({
            method: 'GET',
            url: 'https://www.alphavantage.co/query?',

            params:{
                function:'SECTOR',
                apikey:api_key
            }
            
        })
        .then(response => {
            console.log(response.data)
            this.setState({perf_1day:response.data["Rank B: 1 Day Performance"]})
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
  
        })
    }
    

    render() {

        const {perf_1day}=this.state

        return (
            <div style={divBody}>
                <h1>SECTOR PERFORMANCE</h1>
                <Button onClick={this.handleSubmit}>Get Data</Button>

                <h2>List</h2>

                {/* <List>
                    {perf_1day.map((performance,index)=> 
                    <List.Item>{performance.key}:{performance.value}</List.Item>
                    
                    )}
                </List> */}

            </div>
        );
    }
}

export default SectorPerformance;