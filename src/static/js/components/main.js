import React, { useState, useEffect, lazy } from 'react';

//Import Components
import Graphs from './graphs'
import SearchBar from './searchbar';
import LoadingSpinner from './loadingspinner'
import FavoritesList from './favorites';

function App() {
    // States
    const [input, setInput] = useState('');
    const [dataframe, setDataframe] = useState({close: [0]})
    const [stock, setStock] = useState('ETH-USD')
    const [timeframe, setTimeframe] = useState(['1y'])
    const [loading, setLoading] = useState(true)

    const fetchGraph = () => {
        fetch(`/getgraph?stock=${stock}&timeframe=${timeframe}`)
        .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    setDataframe(json)
                    setLoading(false)
                }
                else{
                    console.log('Error')
                }
        });
        };

    useEffect(() => {
            setLoading(true)
            fetchGraph();
            }, [timeframe, stock] )



    return (
        <div className="App">
            <div className="stock-headings">
                <div className='stock-info'>
                    <h1>${stock}</h1>
                    <h1>Current Price: ${dataframe.current}</h1>
                    <button className='add-favorite'>
                        <i className='fa fa-plus'></i>
                    </button>
                </div>
                <SearchBar
                    input = {input}
                    setInput = {setInput}
                    setStock = {setStock}
                    setTimeframe = {setTimeframe}
                />
            </div>
            {loading ? <LoadingSpinner/>: <div></div>}
            <Graphs 
                stock={stock}
                dataframe={dataframe}
                loading={loading}
            />
        </div>
    );
}

export default App;