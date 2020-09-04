import React, {useState, useEffect}  from 'react';
import Axios from 'axios';
import ErrorNotice from '../msc/ErrorNotice';

function Quote(props) {

    const [symbol, setSymbol] = useState();
    const [stock, setStock] = useState();
    const [error, setError] = useState();

    const getQuote = async (symbol) => {
        try {

            setSymbol(symbol);

            let stockRes = await Axios.get(
                `https://sl--backend.herokuapp.com/quote/${symbol}`,
                null,
                null
            );
           
           setStock(stockRes.data.stock);

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    useEffect(() => {
        if(props.location.symbol){
            getQuote(props.location.symbol);
        }
    }, [props.location.symbol]);

    const submit = async (e) => {
        e.preventDefault();

        try {

            let stockRes = await Axios.get(
                `https://sl--backend.herokuapp.com/quote/${symbol}`,
                null,
                null
            );
           setStock(stockRes.data.stock);

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };


    const slider = () => {
        const highLowDiff = stock['high'] - stock['low'];
        const priceLowDiff = stock['price'] - stock['low'];
        const percent = (priceLowDiff / highLowDiff) * 100;
        return  percent + '%';

    };

    

    return (
        <>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}

            <form className='search-form'>
                <input onChange={e => setSymbol(e.target.value)} className="search-bar"  type="text" placeholder="Stock symbol" autoFocus/>
                <button className="search-btn" type="submit" onClick={e => submit(e)}><i className="fa fa-search"></i></button>
            </form>

            {
                stock ? (
                    <div className="stock-data">
                        
                        <span id="symbol">{stock['symbol']}</span>
                        

                        <div className="price-stats">
                            <span id='price'>{stock['price']}</span>
                            <span id='change' className={(stock['change'] > 0 ? 'green' : 'red' )}>{stock['change'] > 0 ? <>+</> : <></>}{stock['change']}</span>
                            <span id='change-percent' className={(stock['change'] > 0 ? 'green' : 'red' )}>({stock['change'] > 0 ? <>+</> : <></>}{stock['chgPercent']}&#37;)</span>
                        </div>

                        <div className="open-close">
                            <span id="open">Open: {stock['open']}</span>
                            <span id="close">Previous Close: {stock['prevClose']}</span>
                        </div>

                        <span id="days-range">Day's Range</span>
                        <div className="price-range">
                            <span id="low">{stock['low']}</span>
                            <div id="price-slider" style={{left: slider()}}></div>
                            <span id="high">{stock['high']}</span>
                        </div>
                    </div>

                ) : (<> </>)
            }
        </>
        
    );
}

export default Quote;