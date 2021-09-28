import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import '../../styles/dashboard.css'

const state = {
  labels: ['New Costumer', "Exsisting Subscriber's", "Daily Visitor's",
           "Extented Subscriber's"],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        "#e20e02", "#C9DE00", "#008500", "#0014a8"
         
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350'
      ],
      data: [40, 20, 80, 10]
    }
  ]
}
export default class DoughnutChart extends React.Component {
  render() {
    return (
      <div className='doughnutChart-wrapper'>
        <div className = 'doughnutChart-header' >
          <p className = 'doughnutChart-title' > User's of Product </p> 
        </div>
        <hr style={{borderColor:"var(--bg-dark)"}}/>
        <div className='doughnutChart-circle'> 
          <Doughnut 
            data={state}
            height="400px"
            options={{
              maintainAspectRatio: false,
              legend:{
                display:true,
                position:'right',
                
              }
            }}
          />
        </div>
      </div>
    );
  }
}