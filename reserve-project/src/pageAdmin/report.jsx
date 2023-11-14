import React from 'react'
import { useState,useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Space,Form,Input,Upload,Table,Image,Select,Tag } from 'antd';
import Axios from 'axios';
const report = () => {

  useEffect(()=>{
    getUser();
    getReserve();
  },[]);
  const [Reserve,setReserve] = useState([])
  const [User,setUser] = useState(null)

 
  const getReserve = () =>{
    Axios.get('http://localhost:3000/reserve')
    .then (res => {
      setReserve(res.data)
    })
    }
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
zIndex: theme.zIndex.drawer + 1,
transition: theme.transitions.create(['width', 'margin'], {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
}),
...(open && {
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}),
);

const mdTheme = createTheme();
const [open, setOpen] = React.useState(true);
const toggleDrawer = () => {
setOpen(!open);
};

const columns = [
  {
  title: 'ID',
  dataIndex: 'id',
  align:'center',
      
  },
{
  title: 'Id_room',
  dataIndex: 'id_room',
  align:'center',

},
{
  title: 'id_user',
  dataIndex: 'id_user',
  align:'center',

},
{
  title: 'First Name',
  dataIndex: 'firstname',
  align:'center',
  width:'35%'
},
{
  title: 'Last Name',
  dataIndex: 'lastname',
  align:'center',
  width:'35%'
},
{
  title: 'Date Start',
  dataIndex: 'date_start',
  align:'center',
  width:'15%'
},
{
  title: 'Date End',
  dataIndex: 'date_end',
  align:'center',
  width:'15%'
},

{
  title: 'Status',
  dataIndex: 'status',
  width:'100%',
  render: (text) => <h5>{text}</h5>,
},

{
  title: 'Edit / Delete',
  dataIndex: 'edit',
  align:'center',

},
];
const data = Reserve.map((val, index) => ({
  key: index.toString(),
  id: val.id,
  id_room:val.id_room,
  id_user:val.id_user,
  firstname:"222eee",
  lastname:"addd",
  date_start:val.date_start,
  date_end:val.date_end,
  status: val.status,
  edit: <div style={{width:'100%',display:'flex',textAlign:'center'}}>  
        <Button style={{marginRight:'0.5rem'}} type="primary" onClick={() => showModal(val)}>Edit</Button>
        <Button type="primary" danger  onClick={() => deleteRoom(val.id)}>Delete</Button> 
        </div>,
}));

return (
<div>
  

  <AppBar position="absolute" open={open}>
      
      <Toolbar
        sx={{
          pr: '24px',backgroundColor:"#111927" 
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          การรายงาน
        </Typography>

        {User ? (
          <a href='/changeAdmin' style={{textDecoration:'none',color:'#ffffff'}}>
          {User.firstname} {User.lastname}
          </a>
        ):
        <a href='#'>
          
        </a>
        }
        
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
            
          <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size="small" />

        </Paper>
        </Grid>
    </Grid>

    </Container>
    </div>
  )
}

export default report