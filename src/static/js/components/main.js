import React, { useState, useEffect, lazy } from 'react';

//Import Components
import Graphs from './graphs'
import SearchBar from './searchbar';
import LoadingSpinner from './loadingspinner'
import FavoritesList from './favorites';

function App() {
    // States
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('ETH-USD');
    const [dataframe, setDataframe] = useState({close: [0]})
    const [stock, setStock] = useState('')
    const [timeframe, setTimeframe] = useState(['1y'])
    const [loading, setLoading] = useState(true)

    const fetchGraph = () => {
        fetch(`/getgraph?stock=${search}&timeframe=${timeframe}`)
        .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    setDataframe(json)
                    setStock(search)
                    setLoading(false)
                }
                else{
                    console.log('Error: Stock not found')
                    setInput('')
                    setLoading(false)
                }
        });
        };

    useEffect(() => {
            setLoading(true)
            fetchGraph();
            }, [timeframe, search] )



    return (
        <div className="App">
            <div className="stock-headings">
                <div className='stock-info'>
                    <h1>${stock}</h1>
                    <h2>Current Price: ${dataframe.current}</h2>
                </div>
                <SearchBar
                    input = {input}
                    setInput = {setInput}
                    setSearch = {setSearch}
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