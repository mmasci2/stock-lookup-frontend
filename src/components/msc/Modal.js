import React, {useState} from 'react';
import ErrorNotice from './ErrorNotice';
import Axios from 'axios';

function Modal() {

    const [isOpen, setIsOpen] = useState(false);
    const [listName, setListName] = useState();
    const [error, setError] = useState();


    const createWatchlist = async (e) => {
        e.preventDefault();

        try {

            const body = {name: listName};
            
            await Axios.post(
                'https://sl--backend.herokuapp.com/watchlist/',
                body,
                {headers: {"x-auth-token": localStorage.getItem('auth-token')}}
            );

            setIsOpen(false);
            setListName('');

        } catch (e) {
            e.response.data.msg && setError(e.response.data.msg);
        }
    };

    return (
        <div className="modal-container">

            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}

            <button id="btn-watchlist" onClick={() => setIsOpen(true)}>New Watchlist</button>
            
            {isOpen ? (
                
                <form className="modal">
                    <label>Name: </label>
                    <input type="text" onChange={e => setListName(e.target.value)} autoFocus/>
                    <button onClick={createWatchlist} type="submit" id="modal-add">Create</button>
                    <span onClick={() => setIsOpen(false)} className="modal-close">X</span>                    
                </form>
                
            ) : null}
            
            
        </div>
    );
}

export default Modal;
