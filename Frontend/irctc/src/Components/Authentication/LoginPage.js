import taximg from './taxfiling.png'
import './Login.css'
import { useState } from 'react';
const LoginPage = ({showLogin,handleLogin}) =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'

    const handleLoginClick = () => {
        handleLogin(username, password, role);
    };

 return(
    <>
        <div className="login-form">
                <h2>LOGIN</h2>
                <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="text"
                    placeholder="Username (for user : user & for admin : admin)"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password (for user : user & for admin : admin)"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLoginClick}>
                    Login
                </button>
            </div>
            {/* <div className="background">
                <img src={taximg} alt="its a gov img" className="image" />
            </div> */}


 
    </>
 )   
}

export default LoginPage;