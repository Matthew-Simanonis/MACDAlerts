import React from "react";

const Options = React.memo(({setTimeframe}) => {
    
    const changeValue = (e) => {
        setTimeframe(e.target.value)
    }

    return (
        <div className='options'>
            <label className='timeframe'>
                <input type='radio' value='1mo' id='1mo' onChange={changeValue} name='timeframe'/>
                1 Month
            </label>
            <label className='timeframe'>
                <input type='radio' value='1y' id='1y' onChange={changeValue} name='timeframe' defaultChecked/>
                1 Year
            </label>
            <label className='timeframe'>
                <input type='radio' value='2y' id='2y' onChange={changeValue} name='timeframe'/>
                2 Years
            </label>
            <label className='timeframe'>
                <input type='radio' value='max' id='all' onChange={changeValue} name='timeframe'/>
                All
            </label>
        </div>
    )
})

export default Options;