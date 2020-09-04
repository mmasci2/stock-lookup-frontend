import React, {useState, useContext} from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../msc/ErrorNotice';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginRes = await Axios.post(
                'http://localHost:5000/users/login',
                loginUser
            );
            
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
                
            });

            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/');

        } catch (e) {
            e.response.data.msg && setError(e.response.data.msg);
        }
        
    };

    return (
        <div className="page">
        <h2>Login</h2>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)}/>
        )}
        <form className="auth-form" onSubmit={submit}>
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" 
            onChange={e => setEmail(e.target.value)}/>

            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" 
            onChange={e => setPassword(e.target.value)}/>

            <input type="submit" value="Login" />
        </form>
    </div>
    );
}

export default Login;