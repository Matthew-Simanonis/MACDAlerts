import { useEffect } from 'react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';


const GraphPrice = React.memo(({ stock, dataframe }) => {

    var series = [
        {
            name: `Close`,
            data: dataframe.close,
            type: 'area'
        },
        {
            name: '50 day MA',
            data: dataframe.fiftyma,
            type: 'line'
        },
        {
            name: '200 day MA',
            data: dataframe.twohundredma,
            type: 'line'
        },      
    ];
    var options = {
        title: {
            text: `${stock} Price`
        },
        chart: {
            height: 350,
            id: 'price',
        },
        xaxis: {
            categories: dataframe.dates,
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                  month: 'MMM \'yy',
                  day: 'dd MMM yy',
                }
              }
        },
        animations : {
            enabled: false
        },
        markers: {
            size: [0,0,0],
            strokeColors: [undefined, undefined, undefined],///, '#00f014', '#f01400']
            fillOpacity: 0
        },
        tooltip: {
            fixed : {
                enabled: true,
                position: 'topLeft',
                offsetX: 10,
                offsetY: 30
            },
            enabledOnSeries : [0,1,2],
        },
        noData: {
            text: 'Loading...'
        },
        yaxis: {
            opposite: true,
            decimalsInFloat: 2,
            labels: {
                minWidth: 40
            }
        },
        legend: {
            position: 'top'
        },
        colors: ['#2CB700', '#3145ad', '#d62811'],///, '#00f014', '#f01400'],
        fill: {
            type: ['gradient', 'solid', 'solid'], 
            colors: ['#1ed61e'],
            gradient: {
                type: 'vertical',
                gradientToColors: ['#2CB700'],
                shadeIntensity: .7,
                opacityFrom: .9,
                opacityTo: .6,
                stops: [0, 100]
            }
        },
        theme: {
            mode: 'dark'
        },
        stroke: {
            width: [3, 2, 2, 6]
        }
     };
    return (
        <section>
            <div className='graphs'>
                <div className='stock-graphs'>
                    <ReactApexChart series={series} options={options} height='350px'/>
                </div>
            </div>
        </section>
    );
})
export default GraphPrice;