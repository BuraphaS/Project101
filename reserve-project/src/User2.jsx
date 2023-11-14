  import React from 'react'
  import {useEffect,useState} from 'react'

  import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import NavDropdown from 'react-bootstrap/NavDropdown';

  import Offcanvas from 'react-bootstrap/Offcanvas';
  import swal from 'sweetalert';
  import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

  const User2 = ({children}) => {
      const [Home,setHome] = useState([]);
      const [User,setUser] = useState(null)
      const navigate = useNavigate();
      const handleLogout = () => {

        localStorage.removeItem('token');
      
        swal({
          title:"Logout Success",
          icon:"success",
          button:'OK'
        }).then(function(){
          navigate('/')
          location.reload();})
      };
      
      const getUser = () => {
          
          const token = localStorage.getItem('token');
          
            Axios.get("http://localhost:3000/userlog", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                setUser(response.data);
              })
              .catch((error) => {
                console.error('Error', error);
              });
          
        };

      const getHome = ()=>{
        Axios.get('http://localhost:3000/home')
        .then ((response) => {
          setHome(response.data)
      })
      }

      useEffect(() => {
        getHome();
        getUser();
      }, []);

      
    return (
      <div>
       
          {Home.map((val, index) => (
          <Navbar style={{backgroundColor:val.navColor,opacity:'95%'}}  key="sm" expand="sm" className=" mb-1 fixed-top">
              <Container fluid>
              
              <Navbar.Brand href="#home">{val.navName}</Navbar.Brand>
              
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
              <Navbar.Offcanvas
                id="offcanvasNavbar-expand-sm"
                aria-labelledby="offcanvasNavbarLabel-expand-sm"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                    
                  </Offcanvas.Title>
                </Offcanvas.Header>
                
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-5">
                  <Nav.Link href="/1">HOME</Nav.Link>
                  <NavDropdown title="ROOMS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/roomPage1#room">Room</NavDropdown.Item>
              <NavDropdown.Item href="/roomPage1#meeting">
                Meeting Room
              </NavDropdown.Item>
              <NavDropdown.Item href="/roomPage1#gym">Gym</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/roomPage1#spa">Spa</NavDropdown.Item>
              </NavDropdown>
              {User ? (
                  <Nav.Link key={index} href="/change" >{User.firstname} {User.lastname}</Nav.Link>
              ):
              <Nav.Link key={index} href="#" ></Nav.Link>}
                   <Nav.Link href="" onClick={handleLogout} >LOGOUT</Nav.Link>
                  </Nav>
                  
                </Offcanvas.Body>
                
              </Navbar.Offcanvas>
              </Container>
          </Navbar>
          ))}
          {children}
      </div>
    )
  }

  export default User2