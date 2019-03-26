import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

class SectorPerformanceYtd extends Component {
    render() {
         // Props
         const {perf_ytd}= this.props

         // JSON: Get x-axis and y_axis 

         const x_axis=Object.keys(perf_ytd)
         const y_axis=(Object.values(perf_ytd)).map((data)=>(data.slice(0,-1)))
 
         // Charts: Create data object
         const data= {
             labels: x_axis,
             datasets: [{
             label: "YTD Performance (%)",
             backgroundColor: '#008080',
             borderColor: '#008080',
             data: y_axis,
             }]
         }
         // Charts: Create annotations
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
            <div>
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

export default SectorPerformanceYtd;