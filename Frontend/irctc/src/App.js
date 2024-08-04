import './App.css';
import LoginPage from './Components/Authentication/LoginPage';
import { useState } from 'react';
import Admin from './Components/Authentication/Admin';
import HomePage from './Components/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
 const [isLoggedIn,setIsLoggedIn] = useState(false);
 const [showLogin, setShowLogin] = useState(false);
 const [role, setRole] = useState(''); 
 const [error, setError] = useState('');

 const handleInputClick = () => {
  if (!isLoggedIn) {
    setShowLogin(true);
  }
};

const handleLogin = async (username, password, role) => {
  try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setShowLogin(false);
          setRole(data.role);
          setError('');
      } else {
          const errorText = await response.text();
          setError(errorText);
      }
  } catch (error) {
      setError('Network error. Please try again later.');
  }
};

if (!isLoggedIn) {
  return (
    <>
      {error && <div className="error">{error}</div>}
      <LoginPage handleLogin={handleLogin} />
    </>
  );
}

if (role === 'admin') {
  return <Admin />;
}

  return (
    <Router>
      <HomePage />
    </Router>
  );
}

export default App;
