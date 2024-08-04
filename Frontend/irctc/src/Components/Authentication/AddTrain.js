import "./addTrain.css"
import { useState } from "react";
const AddTrain = () =>{

    const [formData,setFormData] = useState({trainName : '',to : '',from:'',numberOfSeats:''});
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prevFormData) =>({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleAddButton = async(e) =>{
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/api/trains/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              train_name: formData.trainName,
              departure: formData.from,
              arrival: formData.to,
              availability: parseInt(formData.numberOfSeats)
            })
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const contentType = response.headers.get('content-type');
          let result;
          if (contentType && contentType.indexOf('application/json') !== -1) {
            result = await response.json();
          } else {
            result = await response.text();
          }
          
          console.log('Success:', result);
    
          setShowPopup(true);

          // Hide the popup after 3 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);

          // Optionally clear the form
          setFormData({
            trainName: '',
            from: '',
            to: '',
            numberOfSeats: ''
          });
    
        } catch (error) {
          console.error('Error:', error);
        }
      };  
    
    

    return(
        <>
     <div className="add-train-form">
        <h2>Add Train</h2>
        <input
          type="text"
          name="trainName"
          placeholder="Train Name"
          className="input-field"
          value={formData.trainName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="from"
          placeholder="From"
          className="input-field"
          value={formData.from}
          onChange={handleChange}
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          className="input-field"
          value={formData.to}
          onChange={handleChange}
        />
        <input
          type="number"
          name="numberOfSeats"
          placeholder="Number of seats"
          className="input-field"
          value={formData.numberOfSeats}
          onChange={handleChange}
        />
        <button className="add-button" onClick={handleAddButton}>
          Add
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <span className="popup-icon">✔</span> Train added successfully!
        </div>
      )}

        </>
    )
}
export default AddTrain;