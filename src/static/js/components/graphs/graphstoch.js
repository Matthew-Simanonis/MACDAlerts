import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import React from 'react';

const GraphStoch = React.memo(({ dataframe }) => {
    const seriesStoch = [
        {
            name: `K line`,
            data: dataframe.stochk,
            type: 'line'
        },
        {
            name: 'D line',
            data: dataframe.stochd,
            type: 'line'
        }
    ];
    const optionsStoch = {
        title: {
            text: 'Stochastic Indicator'
        },
        chart: {
            id: 'stoch',
        },
        xaxis: {
            categories: dataframe.dates,
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                  month: 'MMM \'yy',
                  day: 'dd MMM yy',
                  hour: 'HH:mm'
                }
              }
        },
        legend: {
            position: 'top'
        },
        colors: ['#fcc203', '#108fe3'],
        yaxis: {
            opposite: true,
            decimalsInFloat: 1,
            labels: {
                minWidth: 40
            },
            min: 0,
            max: 100
        },
        annotations : {
            yaxis: [{
                y: 80,
                y2: 20,
                opacity: .2 
            }]
        },
        theme: {
            mode: 'dark'
        },
        stroke: {
            width: 2
        }
    };

    return (
        <div id='stoch-graph'>
            <ReactApexChart series={seriesStoch} options={optionsStoch} height='250px'/>
        </div>
    );
})
export default GraphStoch;