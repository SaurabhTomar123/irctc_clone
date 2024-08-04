// import { useState } from 'react';
// import DisplayTrains from './Authentication/DisplayTrains';
// import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
// import SearchPage from './SearchPage';
// const HomePage = ({handleInputClick,showLogin,handleLogin}) =>{

//     const[from,setFrom] = useState('');
//     const[to,setTo] = useState('');
//     const [view, setView] = useState('between'); // State to control which data to display
//     const [searchTriggered, setSearchTriggered] = useState(false); // State to track search trigger
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

// //   console.log(view);
//     const handleFrom = (e) =>{
//           setFrom(e);          
//     }
//     const handleTo = (e) =>{
//         setTo(e);        
//   }
 
//   const triggerSearch = () => {
//     console.log('Triggering search with:', from, to);
//     if (from && to) {
//       setLoading(true);
//       setSearchTriggered(true);
//       setTimeout(() => {
//         setLoading(false);
//         navigate('/search', { state: { from, to } });
//       }, 1000); // Simulate loading time
//     } else {
//       alert("Both 'From' and 'To' stations are required.");
//     }
//   };

//     return(
//    <>
//    <Router>
//     <Routes>
//       <Route path="/" element={<SearchPage  handleInputClick={handleInputClick} showLogin={showLogin} handleLogin ={handleLogin} handleTo ={handleTo} handleFrom={handleFrom} triggerSearch = {triggerSearch} from ={from} to={to} loading={loading}/>} />
//       <Route path="/search" element={<DisplayTrains view={view} from={from} to={to} searchTriggered={searchTriggered} setSearchTriggered={setSearchTriggered} />} />
//     </Routes>
//   </Router>
   
//    </>
//     )
// }

// export default HomePage;


import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import DisplayTrains from './Authentication/DisplayTrains';
import Navbar from './Navbar';

const HomePage = ({ handleInputClick, showLogin, handleLogin }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view,setView] =  useState('between');
  const navigate = useNavigate();

  const handleFrom = (e) => {
    setFrom(e);
  };

  const handleTo = (e) => {
    setTo(e);
  };

  const triggerSearch = () => {
    console.log('Triggering search with:', from, to);
    if (from && to) {
      setLoading(true);
      setSearchTriggered(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/search', { state: { from, to } });
      }, 1000); // Simulate loading time
    } else {
      alert("Both 'From' and 'To' stations are required.");
    }
  };

  return (
    <Routes>
    <Route
      path="/"
      element={
        <SearchPage
          handleInputClick={handleInputClick}
          showLogin={showLogin}
          handleLogin={handleLogin}
          handleTo={handleTo}
          handleFrom={handleFrom}
          triggerSearch={triggerSearch}
          from={from}
          to={to}
          loading={loading}
        />
      }
    />
    <Route
      path="/search"
      element={
        <>
  <div className='box'>
    <Navbar handleInputClick={handleInputClick}/>
    
    <DisplayTrains
          from={from}
          to={to}
          searchTriggered={searchTriggered}
          setSearchTriggered={setSearchTriggered}
          view={view}
        />
</div>
        </>
      
      }
    />
  </Routes>
  );
};

export default HomePage;
