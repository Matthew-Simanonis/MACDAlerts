import { useEffect } from 'react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GraphMacd = React.memo(({ dataframe }) => {
    const seriesMACD = [
        {
            name: `MACD`,
            data: dataframe.macd,
            type: 'line'
        },
        {
            name: 'Signal Line',
            data: dataframe.signal,
            type: 'line'
        }
    ];
    const optionsMACD = {
        title: {
            text: 'MACD/Signal line'
        },
        chart: {
            id: 'macd',
            group: 'main'
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
        colors: ['#108fe3', '#fcc203'],
        yaxis: {
            opposite: true,
            decimalsInFloat: 1,
            labels: {
                minWidth: 40
            }
        },
        theme: {
            mode: 'dark'
        },
        stroke: {
            width: 2
        }
    };

    return (
        <div id='macd-graph'>
            <ReactApexChart series={seriesMACD} options={optionsMACD} height='250px'/>
        </div>
    );
})
export default GraphMacd;