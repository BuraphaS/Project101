import React, { useState,useEffect  } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';

import ListCard from './component/listCard';
import ListCarousel from './component/listCarousel';
import { SketchPicker } from 'react-color'
import Axios from 'axios';

import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Space, 
    Table,
    Tag,
    Card
  } from 'antd';

import { mainListItems, secondaryListItems } from '../component/NavAdmin';


const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };


const edit_home = () => {
        const [navColor,setNavColor] = useState("")
        const [navName,setNavName] = useState("")
        const [bgColor,setbgColor] = useState("")
        const [file_name,setFileCarousel] =  useState([""])

        const [img,setFileCard] =  useState([""])
        const [title,setTitle] = useState("")


        const [detail,setDetail] = useState("")


        const [Carousel,setCarousel] = useState([]);


        const [Card1,setCard1] = useState([]);


      const getCarousel = () =>{
          Axios.get('http://localhost:3000/carousel')
          .then ((response) => {
              setCarousel(response.data)
          })
      }
      

        const getCard = () =>{
          Axios.get('http://localhost:3000/card')
          .then ((response) => {
              setCard1(response.data)
          })
      }
      
      
      
      
      useEffect(() => {
          getCarousel();
          getCard();
        }, []);

        

    const addHome = () =>{
        const formData = new FormData()
        formData.append('file',file_name)
        Axios.post('http://localhost:3000/homepage',formData
         ,{
          file_name: file_name,        
         }
        )
        .then(function (response) {
              console.log(response);
            })
        .catch(er => console.log(er))

       


        Axios.post('http://localhost:3000/home',{
          navName:navName,
          
          navColor:navColor,
          
          bgColor:bgColor,
        })
         .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }


      const addCard = () =>{
      const formData = new FormData()
      formData.append('file',img)
      formData.append('title', title);
      formData.append('detail', detail);
      Axios.post('http://localhost:3000/homecard',formData
     )
     .then(function (response) {
           console.log(response);
         })
     .catch(er => console.log(er))
     
        }



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

  return (
    <div>
         <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                  หน้าหลัก
                </Typography>
                
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <h2 style={{width:'100%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>LOGO</h2>
                {/* <img style={{width:"150px",margin:"5px 5px"}} src={Logo} alt="" /> */}
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav"
                sx={{
                  backgroundColor:"light" ,
                  
                  height:"100%"
                }}>
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                  <Paper sx={{ p: 4, flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'2rem 0rem',height:'90%'}}>
                      <div style={{display: 'flex',justifyContent:'space-between',width:'100%'}}>
                      <Form
                            labelCol={{
                            span: 4,
                            }}
                            wrapperCol={{
                            span: 14,
                            }}
                            layout="horizontal"
                            style={{
                            maxWidth:"50%",
                            width:'50%'
                            }}
                        >   
                            <Form.Item label="Name">
                            <Input onChange={(event)=>{setNavName(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="NavColor">
                            <input type="color" name="color" id="color" style={{width:'100%',borderRadius:'3px',padding:'1px'}} onChange={(event)=>{
                            setNavColor(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="bgColor">
                            <input type="color" name="color" id="color" style={{width:'100%',borderRadius:'3px',padding:'1px'}} onChange={(event)=>{
                            setbgColor(event.target.value)}}/>
                            </Form.Item>
                            
                            
                          
                           
                            {/* <Form.Item label="RangePicker">
                            <RangePicker />
                            </Form.Item> */}
                           
                            {/* <Form.Item label="Switch" valuePropName="checked">
                            <Switch />
                            </Form.Item> */}
                            
                            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFileCarousel(e.target.files[0])}>
                            <Upload listType="picture-card" >
                                <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                                </div>
                            </Upload>
                            
                            </Form.Item>
                            <Form.Item label="Button">
                            <Button onClick={addHome}>Submit</Button>
                            </Form.Item>                           
                        </Form>

                        <Form
                            labelCol={{
                            span: 4,
                            }}
                            wrapperCol={{
                            span: 14,
                            }}
                            layout="horizontal"
                            style={{
                            maxWidth: "50%",
                            width:'50%'
                            }}
                        >   
                            <Form.Item label="Title">
                              <Input onChange={(event)=>{setTitle(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="Detail">
                              <Input onChange={(event)=>{setDetail(event.target.value)}}/>
                            </Form.Item>
                           <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFileCard(e.target.files[0])}>
                            <Upload listType="picture-card" >
                                <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                                </div>
                            </Upload>
                            
                            </Form.Item>
                            <Form.Item label="Button">
                            <Button onClick={addCard}>Submit</Button>
                            </Form.Item>                           
                        </Form>

                      </div>
                        
                    </Paper>
                  </Grid>
                </Grid>
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 4,display:'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'2rem 0rem',height:'90%'}}>
                      
                        <ListCard />
                      
                    </Paper>
                  </Grid>
                </Grid>
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 4,display:'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'2rem 0rem',height:'90%'}}>
                      
                        <ListCarousel />
                      
                    </Paper>
                  </Grid>
                </Grid>
              </Container>

            </Box>
          </Box>
        </ThemeProvider>
    </div>
  )
}

export default edit_home