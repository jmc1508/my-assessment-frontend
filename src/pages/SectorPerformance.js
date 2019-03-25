import React, { PureComponent } from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react'
import {Bar} from 'react-chartjs-2'
import 'chartjs-plugin-annotation';

const divBody={
    height:'100vh',
    paddingTop:'47px'
}

const api_key=process.env.REACT_APP_ALPHA_VANTAGE

class SectorPerformance extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  state={
    perf_1day:[],
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
            // console.log(this.state.perf_1day)
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
  
        })
    }


  render() {
    const {perf_1day}=this.state

    const arr_key=Object.keys(perf_1day)
    const arr_val=Object.values(perf_1day)

    const x_axis=arr_key.map((data)=>({data}))
    const y_axis=arr_val.map((data)=>(data.slice(0,-1)))

    console.log(arr_key)
    console.log(arr_val)

    const data= {
        labels: arr_key,
        datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: y_axis,
        }]
    }

    const options = {
        annotation: {
             annotations: [{
                 drawTime: 'afterDatasetsDraw',
                 borderColor: 'red',
                 borderDash: [2, 2],
                 borderWidth: 2,
                 mode: 'vertical',
                 type: 'line',
                 value: 10,
                 scaleID: 'x-axis-0',
           }]
        },
        maintainAspectRation: false
    }

    return (
        
        <div style={divBody}>

        <Button onClick={this.handleSubmit}>Get Data</Button>
        
        <Bar
	         data={data}
	         width={100}
	         height={50}
	         options={options}
             />
        </div>
    );
}
}

export default SectorPerformance



    // var data_set=[
    //     {name:"Utilities", value:String(obj["Utilities"]).replace("%","")},
    //     {name:"Consumer Staples", value:String(obj["Consumer Staples"]).replace("%","")},
    //     {name:"Real Estate", value:String(obj["Real Estate"]).replace("%","")},
    //     {name:"Communication Services", value:String(obj["Communication Services"]).replace("%","")},
    //     {name:"Health Care", value:String(obj["Health Care"]).replace("%","")},
    //     {name:"Consumer Discretionary", value:String(obj["Consumer Discretionary"]).replace("%","")},
    //     {name:"Industrials", value:String(obj["Industrials"]).replace("%","")},
    //     {name:"Information Technology", value:String(obj["Information Technology"]).replace("%","")},
    //     {name:"Energy", value:String(obj["Energy"]).replace("%","")},
    //     {name:"Financials", value:String(obj["Materials"]).replace("%","")},
    
    
    // ]