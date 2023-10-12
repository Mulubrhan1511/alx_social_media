import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBNavbarBrand, MDBCollapse } from 'mdb-react-ui-kit';

const NavBar = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate('/');
    } else {
      navigate('/signin');
    }
  }, []);

  return (
    <MDBNavbar expand='lg' style={{backgroundColor: 'rgb(255, 255, 255'}} bg='transparent'>
      <MDBContainer fluid>
        <MDBNavbarBrand className="text-white" href='#'>
        <Link to={user ? "/" : "/signin"} className="text-white"> 
        <img src={require('../images/blue-icon-small.ico')} height={60} width={60} alt="Calu Logo" className="w-16" />
        
        
        </Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls='offcanvasNavbar'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavColor}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 align-items-center d-flex justify-content-center'>
        {user ? (
          <><MDBNavbarItem>
          <MDBNavbarLink active aria-current='page' className="text-white custom-link">
            <Link to="/profile" className="text-white custom-link">
 
              <h5 style={{ color: 'rgb(121, 125, 130)', fontFamily: "Goudy Bookletter 1911", fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Profile</h5>
            </Link>
          </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
          <MDBNavbarLink active aria-current='page' className="text-white custom-link">
            <Link to="/create" className="custom-link">
            <h5 style={{ color: 'rgb(121, 125, 130)', fontFamily: "Goudy Bookletter 1911", fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Create</h5>
              
            </Link>
          </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
          <MDBNavbarLink active aria-current='page' className="text-white custom-link">
            <Link to="/messsage" className="text-white custom-link">
            <h5 style={{ color: 'rgb(121, 125, 130)', fontFamily: "Goudy Bookletter 1911", fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Message</h5>
             
            </Link>
          </MDBNavbarLink>
          </MDBNavbarItem>
          
          </>
        ):(
          <>
          <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' className="text-white custom-link">
                <Link to="/myfollowerspost" className="text-white custom-link">
                  About
                </Link>
              </MDBNavbarLink>
              </MDBNavbarItem>
          </>
        )}
            
              
              
              
             
            </MDBNavbarNav>
          
            <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3'>
            {user ? (
              <>
             
             <div class="dropdown">
             <button
      className=""
      type="button"
      id="dropdownMenuButton"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
      style={{
        border: 'none',
        background: 'transparent',
        padding: '0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img
        src={user.pic}
        height={40}
        width={40}
        alt="User Profile"
        style={{
          borderRadius: '50%',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          marginRight: '8px'
        }}
      />
      
    </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
              </>
            ):(
              <>
              <Link
                to="/login"
                className='text-white text-decoration-none px-3 py-1 rounded-4'
                style={{ backgroundColor: "#0a3ee9" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className='text-white text-decoration-none px-3 py-1 rounded-4'
                style={{ backgroundColor: "#f94ca4" }}
              >
                Signup
              </Link>
              </>
            )}
            
              
            </div>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;