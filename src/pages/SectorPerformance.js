import React, { PureComponent } from 'react';
import axios from 'axios';
import {Grid,
        Header,
        Divider,
        List} from 'semantic-ui-react'

// Container
import SectorPerformance1Day from '../containers/SectorPerformance1Day'
import SectorPerformanceYtd from '../containers/SectorPerformanceYtd';

// Style
import '../App.css'
import logo from '../logo.svg'

const divBody={
    height:'100vh',
    paddingTop:'47px'
}

const header={
    marginTop:'14px'
}

// Api Key: Alpha Vantage

const api_key=process.env.REACT_APP_ALPHA_VANTAGE

class SectorPerformance extends PureComponent {

    state={
        isLoading:true,
        meta_data:[],
        perf_1day:[],
        perf_ytd:[],
    }

    // Fetch data: Axios
    componentDidMount = () => {
      
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
            this.setState({isLoading:!this.state.isLoading,
                            meta_data:response.data["Meta Data"],
                            perf_1day:response.data["Rank B: 1 Day Performance"],
                            perf_ytd:response.data["Rank F: Year-to-Date (YTD) Performance"]})
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
  
        })
    }

    // Render
    render() {
        // State
        const {meta_data,perf_1day, perf_ytd, isLoading}=this.state        
       
    return (
        
        <div style={divBody}>


        <Header style={header} as='h2'>US Sector Performance</Header>

        <Divider/>

        {isLoading?
        
            <Grid className="gridHeight">
                <Grid.Column>
                    <img className="App-logo" src={logo}/>
                </Grid.Column>
            </Grid>
        
        :
            <Grid>

                <Grid.Row>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={10} textAlign='left'>
                                <List>
                                    <List.Item>API Source: Alpha Vantage</List.Item>
                                    <List.Item>Charting Library: Chartjs</List.Item>
                                    <List.Item>Last refreshed: {meta_data["Last Refreshed"]}</List.Item>
                                </List>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
                {/* Row 1 - 1Day Performance */}
                <Grid.Row columns={3}>
                    <Grid.Column width={3}>
                        
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <SectorPerformance1Day perf_1day={perf_1day} />
                    </Grid.Column>

                    <Grid.Column width={3}>
                        
                    </Grid.Column>
                </Grid.Row>
                {/* Row 2 - Ytd Performance */}
                <Grid.Row columns={3}>
                    <Grid.Column width={3}>
                        
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <SectorPerformanceYtd perf_ytd={perf_ytd} />  
                    </Grid.Column>

                    <Grid.Column width={3}>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        }

       
        </div>
    );
}
}

export default SectorPerformance
