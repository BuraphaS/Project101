import React from 'react'
import {useEffect,useState} from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

import Button1 from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container1 from '@mui/material/Container';
import Axios from 'axios'


const UserRoute = ({children}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");


  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true); 

  const handleShowRegister = () => setShowRegister(true);   
  

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);

    const [Home,setHome] = useState([]);

    const getHome = ()=>{
      Axios.get('http://localhost:3000/home')
      .then ((response) => {
        setHome(response.data)
    })
    }

    useEffect(() => {
      getHome();
    }, []);

    const addRegister = () =>{
      Axios.post('http://localhost:3000/register',{
        email: email,
        username: username,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        password: password
      }) 
      .then(function (response) {
        console.log(response);
        alert('Register Success')
         window.location.reload()
      })
      
      .catch(function (error) {
        console.log(error);
      });
    }


    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
          username: data.get('username'),
          password: data.get('password'),
        };
          
              fetch('http://localhost:3000/login', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
              })
          
              .then (response => response.json())
              .then (data =>{
                 if(data.status == 'ok'){
                  localStorage.setItem('token',data.token)
                  alert('Login Success')
                  navigate('/dashboard');
                  window.location.reload()
                  
                 }else{
                  alert('Something Wrong Please Try Again')
                 }
              })
              .catch((error) => {
                  console.error('Error',error)
              })
            }
            
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
                <Nav.Link href="/">HOME</Nav.Link>
                <NavDropdown title="ROOMS" id="basic-nav-dropdown">
              <NavDropdown.Item href="/roomPage">Room</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
                <Nav.Link href="#" onClick={handleShowRegister} >REGISTER</Nav.Link>
                <Nav.Link href="#" onClick={handleShowLogin} >LOGIN</Nav.Link>
                </Nav>
                
              </Offcanvas.Body>
              
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
        ))}
        {children}
        <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
        component="form"
      >
         <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
         
        <Container1 component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="usrname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          
            <Button1
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 6 }}
            >
              Sign In
            </Button1>
          </Box>
        </Box>
        
      </Container1>
      </Modal>





      <Modal
        show={showRegister}
        onHide={handleCloseRegister}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="username"
              onChange={(event)=>{setUsername(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              sx={{mr:1}}
              name="firstname"
              label="First Name"
              type="firstname"
              id="firstname"
              autoComplete="firstname"
              onChange={(event)=>{setFirstname(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              sx={{ml:1.5}}
              name="lastname"
              label="Last Name"
              type="lastname"
              id="lastname"
              autoComplete="lastname"
              onChange={(event)=>{setLastname(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone"
              onChange={(event)=>{setPhone(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>{setPassword(event.target.value)}}
            />
          </Box>


          {/* <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(event)=>{setEmail(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={(event)=>{setUsername(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupFirstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="text" placeholder="Enter Firstname" onChange={(event)=>{setFirstname(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter Lastname" onChange={(event)=>{setLastname(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" placeholder="Enter Phone." onChange={(event)=>{setPhone(event.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addRegister}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserRoute