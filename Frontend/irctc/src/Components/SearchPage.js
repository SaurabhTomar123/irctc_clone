import Navbar from "./Navbar"
import LoginPage from "./Authentication/LoginPage"
import BookTicket from "./BookTicket"
import Loading from "./Loading"
const SearchPage = ({handleInputClick,showLogin,handleLogin,handleTo,handleFrom,triggerSearch,from,to,loading}) =>{
 
    return(
<div>
   <Navbar  handleInputClick={handleInputClick}/>  
  <h1  className="box">Welcome To Train Booking</h1>
  { showLogin? <LoginPage showLogin={showLogin} handleLogin={handleLogin}/> : <></>}
  <BookTicket handleInputClick={handleInputClick} handleTo={handleTo} handleFrom={handleFrom} triggerSearch={triggerSearch} from={from} to={to} />
  {loading && <Loading/>}
</div>
    )
}

export default SearchPage;