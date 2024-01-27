import React,{useState} from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  const toggleMode = ()=>{
    if(mode == 'light'){
      setMode('dark');
    }else{
      setMode('light');
    }
  }
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-${mode==='light'?'dark':'light'}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/'? 'active' : "" }`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about'? 'active' : "" }`} aria-current="page" to="/about">About</Link>
              </li>
            </ul> */}
            {!localStorage.getItem('token')? <>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link></> : 
            <button className='btn btn-primary float-end' onClick={handleLogout}>Logout</button>}
            <input type='checkbox' value="hello i am here" onClick={()=>toggleMode()}/>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
