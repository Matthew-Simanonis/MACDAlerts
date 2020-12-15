import { useEffect } from 'react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import GraphPrice from './graphs/graphprice'
import GraphMacd from './graphs/graphmacd';
import GraphStoch from './graphs/graphstoch';

const Graphs = React.memo(({ dataframe, stock }) => {
    return(
        <div className='graphs'>                
            <GraphPrice
            stock={stock}
            dataframe={dataframe}
            />
            <GraphMacd
                dataframe={dataframe}
            />
            <GraphStoch
                dataframe={dataframe}
            />
        </div>
    )
});

export default Graphs