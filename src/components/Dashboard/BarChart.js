import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios"; 
import '../../styles/dashboard.css'


export default function BarChart({apiBaseUrl}) {
    const [chartData, setChartData] = useState({});
    const [data, setData] = useState("");
    const [categoryName, setCategoryName] = useState([]);
    const [thisMonth, setThisMonth] = useState([]);
    const [lastMonth, setLastMonth] = useState([]);
    // console.log(data);
    // console.log(categoryName);
    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/categories`)
            .then(res => {
                setData(res.data)
                setCategoryName(res.data.map(item => item.name))
                // console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const chart = {
        labels: categoryName || ['a', 'b', 'c', '4', '5', '6'],
        datasets: [{
            label: '# This Month',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(226,33,2)',
        },
        {
            label: '# Last Month',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(0,20,168)',
        },
        ],
    };
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            },],
        }, 
    };
    return (
        <div className="bar-wrapper">
            <div className='bar-header' >
                <p className='bar-title' > Categories </p>
                <div className='links' >
                    <a className='btn btn-gh'
                        href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/GroupedBar.js' >
                    </a>
                </div>
            </div>
            <Bar data={chart}
                options={options}
            />
        </div>
        )
};
