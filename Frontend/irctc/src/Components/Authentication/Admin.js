import AddTrain from "./AddTrain";
import "./Admin.css"
import { useState } from "react";
import DisplayTrains from "./DisplayTrains";

const Admin = () =>{
const [isAddTrain,setIsAddTrain] = useState(false);
const [showTrains,setShowTrains] = useState(false);
 const handleAddTrain =()=>{
    setIsAddTrain(true);
 } 
 const handleShowTrains = () =>{
    setShowTrains(true);
 }
    return(
        <> <div className="">
        <h1>Welcome to Admin Page</h1>
       {!isAddTrain ? <button className="btn" onClick={handleAddTrain}>Add a train</button> : ""}
              {isAddTrain ?<AddTrain/> : ""}
              {!showTrains ? <button className="btn" onClick={handleShowTrains}>Display all Trains</button> : ""}
              {showTrains ?<DisplayTrains/> : ""}
              </div>
        </>
    )
}

export default Admin;