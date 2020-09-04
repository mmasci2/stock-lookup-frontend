import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Watchlist from '../msc/Watchlist';

function Home() {

    const {userData} = useContext(UserContext);


    return (
        <div className="page home">
            {userData.user ? (
                <>
                    <h1>Welcome {userData.user.displayName}</h1>
                    <Watchlist />
                </>
            ) : (
            <>
                <h2>You are not logged in</h2>
                <Link to="/login">Log in</Link>
            </>
            )}
        </div>
    );
}

export default Home;
