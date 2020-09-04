import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

function AuthOptions() {

    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory(); 

    const register = () => history.push('./register');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
    };

    const quote = () => {
        history.push('/quote');
    }

    return (
        <nav className="auth-options">
            {
                userData.user ? (
                <>
                    <button onClick={quote}>Quote</button>
                    <button onClick={logout}>Log out</button>
                </>
                ) : (
                <>
                    <button onClick={quote}>Quote</button>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>
            )}
        </nav>
    );
}

export default AuthOptions;
