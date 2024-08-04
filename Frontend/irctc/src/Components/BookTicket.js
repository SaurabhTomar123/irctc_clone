import "./BookTicket.css"
const BookTicket = ({handleTo,handleFrom,triggerSearch,from,to}) =>{
    return(
        <div className="ticket-booking-form box">
        <h2>Book Ticket</h2>
        <input type="text" placeholder="From" className="input-field" value={from} onChange={(e)=>handleFrom(e.target.value)}/>
        <input type="text" placeholder="To" className="input-field" value={to} onChange={(e)=>handleTo(e.target.value)} />
        <button className="search-button" onClick={triggerSearch}>Search</button>
      </div>
  
    )
}

export default BookTicket;