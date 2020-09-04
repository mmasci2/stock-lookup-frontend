import React, {useEffect, useState, useRef} from 'react';
import Modal from './Modal';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function Watchlist() {

    const [watchlists, setWatchlists] = useState([]);
    const formEl = useRef(null);
    const history = useHistory();
    

    const getWatchlists = async () => {

        try {

            const resWatchlists = await Axios.get(
                'https://sl--backend.herokuapp.com/watchlist/all',
                {headers: {'x-auth-token': localStorage.getItem('auth-token')}}
            );

            return resWatchlists.data;

        } catch (e) {
            
        }
    };

    useEffect(() => {
        let isMounted = true;
        getWatchlists().then(data => {
            if (isMounted) setWatchlists(data);
        });

        return () => {isMounted = false};

    }, [watchlists]);


    const deleteWatchlist = async (wl) => {
        try {
            
            await Axios.delete(
                `https://sl--backend.herokuapp.com/watchlist/${wl._id}`,
                {headers: {'x-auth-token': localStorage.getItem('auth-token')}}
            );

        } catch (e) {

        }
    };

    const addSymbol = async (e, wl) => {
        e.preventDefault();
        
        try {
            const form = formEl.current;
            const body = {symbol: form['symbol'].value};
            await Axios.post(
                `https://sl--backend.herokuapp.com/watchlist/addSymbol/${wl._id}`,
                body,
                {headers: {'x-auth-token': localStorage.getItem('auth-token')}}
            );

            form['symbol'].value = '';
        } catch (e) {

        }
    };

    const removeSymbol = async (e, wl, symbol) => {
        e.preventDefault();
        
        try {
            const body = {symbol};
            await Axios.post(
                `https://sl--backend.herokuapp.com/watchlist/removeSymbol/${wl._id}`,
                body,
                {headers: {'x-auth-token': localStorage.getItem('auth-token')}}
            );
        } catch (err) {

        }
    };

    const getQuote = (e, symbol) => {
        if(e.target.classList[1] !== 'fa-trash'){
            history.push({
                pathname: '/quote',
                symbol
            });
        }
    };

    return (
        <div>

            <Modal />

            {
                watchlists.map((wl, i) => (
                    <div key={i} className="watchlist-container">
                        <div className="watchlist-head">
                            <h2>{wl.name}</h2>
                            <div className="watchlist-options">
                                <button onClick={() => deleteWatchlist(wl)}>Delete Watchlist</button>
                                <form ref={formEl} className="watchlist-add-symbol">
                                    <input name="symbol" type="text" />
                                    <button onClick={(e) => addSymbol(e, wl)} type="submit">&#43;Add Symbol</button>
                                </form>
                            </div>
                        </div>
                        <ul className="symbol-list">
                            {
                                wl.symbols.map((symbol, i) => (
                                    <li key={i} onClick={(e) => getQuote(e, symbol)}><span>{symbol}</span><i onClick={(e) => removeSymbol(e, wl, symbol)} className="fa fa-trash"></i></li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }

        </div>
    );
}

export default Watchlist;
