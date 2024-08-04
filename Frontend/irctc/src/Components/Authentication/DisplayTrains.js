import React, { useEffect, useState } from 'react';
import Train from '../Train/Train';
import "./DisplayTrains.css"
import { useLocation } from 'react-router-dom';
const DisplayTrains = ({view,from,to,searchTriggered, setSearchTriggered }) =>{

    const [allTrains, setAllTrains] = useState([]);
    const [trains,setTrains]  = useState([]);
    const [error, setError] = useState('');

    console.log(from,to)

  // Function to fetch all trains
  const fetchAllTrains = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/trains/all');
      const data = await response.json();
      setAllTrains(data);
    } catch (error) {
      console.error('Error fetching all trains:', error);
      setError('Error fetching all trains');
    }
  };

  useEffect(() => {
  fetchAllTrains();
  }, [allTrains]);

  // Function to fetch trains between stations
  const fetchBetweenTrains = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/trains/between?from=${from}&to=${to}`);
      const data = await response.json();
      console.log('Fetched trains between stations:', data);
      setTrains(data);
    } catch (error) { 
      console.error('Error fetching trains between stations:', error);
      setError('Error fetching trains between stations');
    }
  };
      useEffect(() => {
        if (searchTriggered) {
          fetchBetweenTrains();
          setSearchTriggered(false);
        }
      }, [searchTriggered, from, to, setSearchTriggered]);



      function generateBookingId(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
      
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
      }

return(
<>
  {view === 'between' ? (
    <>
      <h1 className='header'> Available Trains from {from} to {to}</h1>
      {trains.map((train) => (
        <div className='Train Display'>
        <li className="train-list"key={train.id}>
          <Train 
            id={train.id}
            name={train.train_name} 
            departure={train.departure} 
            arrival={train.arrival} 
            availability={train.availability}
            bookingId={generateBookingId()}

          />
        </li>
        </div>
      ))}
    </>
  ) : (
    <div>
      <h2>All Trains</h2>
      {error && <p>{error}</p>}
      <ul className="train-list">
        {allTrains.map((train) => (
          <li key={train.id} className="train-item">
            <div className="train-details">
              <div className="train-header">
                <h2>{train.train_name}</h2>
              </div>
              <div className="train-timings">
                <div className="timing">
                  <span className="station">{train.departure}</span>
                </div>
                <span className="to">--</span>
                <div className="timing">
                  <span className="station">{train.arrival}</span>
                </div>
              </div>
              <div className="availability">
                <div className="class">
                  <span>Sleeper (SL)</span>
                  <span>Wed, 31 Jul</span>
                  <span className="status">AVL{train.availability}</span>
                </div>
             
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
</>

    )
}
export default DisplayTrains;
