import './Navbar.css';
const Navbar = ({handleInputClick}) =>{

    return(
        <>
        <div className='box'>
   <ul class="nav-menu">
        <li class="nav-item"><a href="#">TRAINS</a></li>
        <li class="nav-item"><a href="#">BUSES</a></li>
        <li class="nav-item"><a href="#">FLIGHTS</a></li>
        <li class="nav-item"><a href="#">HOTELS</a></li>
        <li class="nav-item"><a href="#">MEALS</a></li>
        <li class="nav-item login" onClick={handleInputClick}><a href="#">LOGIN</a></li>
    </ul>
    </div>
        </>
    )
}

export default Navbar;