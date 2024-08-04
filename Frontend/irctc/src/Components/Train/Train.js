import "./Train.css"
import { useState } from "react";
import { useEffect } from "react";
const Train = ({id,name,departure,arrival,availability,bookingId}) =>{
 
  const [bookingData,setBookingData] = useState({trainId : '',userId : '',seatNumber : ""});
 const [error,setError] = useState('');


 useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}`);
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Error fetching booking details');
      }
    };

    fetchBookingDetails();
    setBookingData({
      trainId: '',
      userId: '',
      seatNumber: ''
    });
  }, [bookingId]);


  const handleBookButton = () =>{
    if (!bookingData) {
      console.log("The ticket details are " + bookingData.trainId,bookingData.userId,bookingData.seatNumber);
      setBookingData({
        trainId: '',
        userId: '',
        seatNumber: ''
      });
    }


    alert('Booking initiated!');
    // Additional logic for booking can be added here.
    console.log("The ticket details are " + bookingData.trainId,bookingData.userId,bookingData.seatNumber);

  } 



  return(
    <>
   <div className="train-details">
      <div className="train-header">
        <h2>{name}</h2>
        <div className="runs-on">
          <span>Runs On: M T W T F S S</span>
          <a href="#" className="train-schedule">Train Schedule</a>
        </div>
      </div>
      <div className="train-timings">
        <div className="timing">
          <span className="time">01:23</span>
          <span className="station">{departure.toUpperCase()} | Wed, 31 Jul</span>
        </div>
        <span className="to">--</span>
        <div className="timing">
          <span className="time">03:36</span>
          <span className="station">{arrival.toUpperCase()} | Wed, 31 Jul</span>
        </div>
      </div>
      <div className="availability">
        <div className="class">
          <span>Sleeper (SL)</span>
          <span>Wed, 31 Jul</span>
          <span className="status">AVL{availability}</span>
        </div>
      </div>
      <div className="footer">
        <span className="price">₹ 505</span>
        <button className="book-now" onClick={handleBookButton}>Book Now</button>
      </div>
    </div>
    </>
  )
}
export default Train;