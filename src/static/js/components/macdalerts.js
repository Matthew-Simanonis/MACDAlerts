import React, { useState, useEffect } from 'react';

//Import Components
import GraphPrice from './graphprice'
import GraphMacd from './graphmacd';
import GraphStoch from './graphstoch';
import SearchBar from './searchbar'

function App() {
    // States
    const [input, setInput] = useState('');
    const [dataframe, setDataframe] = useState({close: [0]})
    const [stock, setStock] = useState('ETH-USD')
    const [timeframe, setTimeframe] = useState(['1y'])

    const fetchGraph = () => {
        console.log('sent')
        fetch(`/getgraph?stock=${stock}&timeframe=${timeframe}`)
        .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    console.log('Recieved')
                    setDataframe(json)
                }
                else{
                    console.log('Error')
                }
        });
        };

    useEffect(() => {
            fetchGraph();
            }, [timeframe, stock] )



    return (
        <div className="App">
            <div className="stock-headings">
                <div className='stock-info'>
                    <h1>${stock}</h1>
                    <h1>Current Price: ${dataframe.current}</h1>
                </div>
                <SearchBar
                    input = {input}
                    setInput = {setInput}
                    setStock = {setStock}
                    setTimeframe = {setTimeframe}
                />
            </div>
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
    );
}

export default App;