import React from "react";
import Options from "./options"

const SearchBar = ({input, setInput, setSearch, setTimeframe}) => {

  const newStock = () => {
    setSearch(input.toUpperCase())
  }

    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
      <div className='search'>
        <input 
          className='search-bar'
          style={BarStyling}
          key="1"
          value={input}
          placeholder={"Input Stock Ticker"}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={newStock}>
          Search  
        </button> 
        <Options 
          setTimeframe={setTimeframe}
        />
      </div>
    );
  }

export default SearchBar;