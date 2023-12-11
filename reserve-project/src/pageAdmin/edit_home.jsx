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



const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };


const edit_home = () => {
  const [form] = Form.useForm();
        const [navColor,setNavColor] = useState("")
        const [navName,setNavName] = useState("")
        const [bgColor,setbgColor] = useState("")
        const [file_name,setFileCarousel] =  useState([""])

        const [img,setFileCard] =  useState([""])
        const [title,setTitle] = useState("")


        const [detail,setDetail] = useState("")


        const [Carousel,setCarousel] = useState([]);


        const [Card1,setCard1] = useState([]);

        const [Home,setHome] = useState([]);

        const getHome = () =>{
          Axios.get('http://localhost:3000/home')
          .then ((response) => {
              setHome(response.data)
          })
      }
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
          getHome();
          getUser();
        }, []);

    const addCarousel = ()=>{
      const formData = new FormData()
      formData.append('file',file_name)
      Axios.post('http://localhost:3000/homepage',formData
       ,{
        file_name: file_name,        
       }
      )
      .then(function (response) {
            console.log(response);
            swal({
              title:"เพิ่มรูปภาพ สำเร็จ",
              icon:"success",
              button:'OK'
            }).then(function(){
              location.reload();})
          })
      .catch(er => console.log(er))
    } 

    const addHome = () =>{     


        Axios.put('http://localhost:3000/home',{
          navName:navName||Home[0].navName,
          
          navColor:navColor||Home[0].navColor,
          
          bgColor:bgColor||Home[0].bgColor,
        })
         .then(function (response) {
          console.log(response);
          swal({
            title:"แก้ไขข้อมูลสำเร็จ",
            icon:"success",
            button:'OK'
          }).then(function(){
            location.reload();})
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
           swal({
            title:"เพิ่ม สำเร็จ",
            icon:"success",
            button:'OK'
          }).then(function(){
            location.reload();})
         })
     .catch(er => console.log(er))
     
        }

        const [User,setUser] = useState(null)

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

      const onReset = () => {
        form.resetFields();
      };
      const mdTheme = createTheme();
      const [open, setOpen] = React.useState(true);
      const toggleDrawer = () => {
        setOpen(!open);
      };
  
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
                  หน้าหลัก
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
                  <Paper sx={{ p: 4, flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'2rem 0rem',height:'90%'}}>
                      
                      <div style={{display: 'flex',justifyContent:'space-between',width:'100%'}}>
                    {Home.map((val,index)=>(    
                      <Form
                            
                            labelCol={{
                            span: 6,
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
                        <h5 style={{marginBottom:'2rem',textAlign:'center'}}>แก้ไขหน้าแรก</h5>
                            <Form.Item label="ชื่อโรงแรม">
                            <Input defaultValue={val.navName} placeholder={val.navName} onChange={(event)=>{setNavName(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="สีเมนู">
                            <input type="color" name="color" defaultValue={val.navColor} id="color" style={{width:'100%',borderRadius:'3px',padding:'1px'}} onChange={(event)=>{
                            setNavColor(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="สีพื้นหลังหน้าแรก">
                            <input type="color" name="color" defaultValue={val.bgColor} id="color" style={{width:'100%',borderRadius:'3px',padding:'1px'}} onChange={(event)=>{
                            setbgColor(event.target.value)}}/>
                            </Form.Item>
                            <Button style={{width:'58%',justifyContent:'center',marginLeft:'8.4rem',marginBottom:'1rem',alignItems:'center',textAlign:'center'}} onClick={addHome}>ยืนยัน</Button>

                            <Form.Item label="รูปภาพ สไลด์โชว์"  valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFileCarousel(e.target.files[0])}>
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
                            <Button onClick={addCarousel}>อัปโหลด</Button>
                            </Form.Item>
                            
                            
                                                    
                        </Form>
 ))}
                        <Form
                            form={form}
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
                        <h5 style={{marginBottom:'2rem',textAlign:'center'}}>เพิ่มข้อมูลที่โชว์หน้าแรก</h5>
                            <Form.Item label="ชื่อ" name="name">
                              <Input onChange={(event)=>{setTitle(event.target.value)}}/>
                            </Form.Item>
                            <Form.Item label="รายละเอียด" name="detail">
                              <Input onChange={(event)=>{setDetail(event.target.value)}}/>
                            </Form.Item>
                           <Form.Item label="รูปภาพ"name="picture" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFileCard(e.target.files[0])}>
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
                            <div style={{display:'flex',justifyContent:'center'}}>
                              <Button type='primary' danger style={{width:'15%',marginRight:'0.5rem'}} onClick={onReset}>เคลียร์</Button>
                              <Button type='primary' style={{width:'35%'}} onClick={addCard}>ยืนยัน</Button>
                            
                            </div>
                                                     
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
                    <h4>รูปภาพสไลด์หน้าแรก </h4>
                        <ListCarousel />
                      
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
    </div>
  )
}

export default edit_home