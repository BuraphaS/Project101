import React from 'react'
import {useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Space,Form,Input,Upload,Table,Image,Select,Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ListSpa from './component/listSpa'

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import swal from 'sweetalert';
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { Option } = Select;

import Axios from 'axios'

const edit_spa = () => {

    const handleChange = (selectedValues) => {
        setSelectedService(selectedValues);
      console.log(`selected ${selectedValues}`);
    };
    
      const [room_name,setRoom_name] = useState("")
      const [detail,setDetail] = useState("")
      const [img,setFile] = useState([""])

      const [service, setSelectedService] = useState([]);
      const [item_service,setItemService1] = useState("")
    
    
    
    
      const [service1,setService] = useState([])
    
      const addRoom = () => {
        const formData = new FormData()
        formData.append('room_name',room_name)
        formData.append('detail',detail)
        formData.append('file',img)
        formData.append('service',service)
        Axios.post('http://localhost:3000/spa',formData
         
        )
        .then(function (response) {
              console.log(response);
              swal({
                title:"Add Room Success",
                icon:"success",
                button:'OK'
              }).then(function(){
                location.reload();})
            })
        .catch(er => console.log(er))
    }
    
      const addService = () => {
        Axios.post('http://localhost:3000/spa_service',{
          service : item_service
        })
        .then(function (response) {
          console.log(response);
          swal({
            title:"Add Service Success",
            icon:"success",
            button:'OK'
          }).then(function(){
            location.reload();})
        })
        .catch(er => console.log(er))
      }
    
    
        const getService = () =>{
        Axios.get('http://localhost:3000/spa_service')
        .then (res => {
          setService(res.data)
        })
        }
        const deleteService = (id) => {
            Axios.delete(`http://localhost:3000/delete/spa_service/${id}`)
              
            swal({
              title:"Delete Success",
              icon:"success",
              button:'OK'
            }).then(function(){
              location.reload();})

              .catch((error) => {
                console.error(error);
              });
          };
        
      useEffect(() => {
        getService();
        getUser();
      }, []);
    

      const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align:'center',
            width:'5%'
        },
        {
            title: 'Service',
            dataIndex: 'name',
            
        },
        {
          title: 'Delete',
          dataIndex: 'edit',
          align:'center',
          width:'10%'
      },
      ]
      const data = service1.map((val, index) => ({
        key: index.toString(),
        id: val.id,
        name: val.service,
        // detail: <p style={{width:'5%'}}>{val.detail}</p>,
        edit: 
              <Button type='primary' danger onClick={() => deleteService(val.id)}>Delete</Button> 
              
      }));


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
              ห้องสปา
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
                    <h4 style={{textAlign:'center',marginBottom:'2rem'}}>เพิ่มข้อมูลห้องสปา</h4>
                    <Form
                            labelCol={{
                            span: 4,
                            }}
                            wrapperCol={{
                            span: 14,
                            }}
                            layout="horizontal"
                            style={{
                            maxWidth:"100%",
                            width:'100%'
                            }}
                        >   
                            <Form.Item label="Name">
                            <Input onChange={(event)=>{setRoom_name(event.target.value)}}/>
                            </Form.Item>          
                           
                            <Form.Item label="Detail">
                            <Input onChange={(event)=>{setDetail(event.target.value)}}/>
                            </Form.Item>          

                          
                            <Form.Item label="บริการ">

                           
                            <Select
                            mode="multiple"
                            style={{
                              width: '100%',
                            }}
                            placeholder="บริการ"
                            defaultValue={[]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                          {service1.map((item,index)=>( 
                            <Option key={item.service} value={item.service} label={item.service}>
                              <Space>
                                <span role="img" aria-label={item.service}>
                                  
                                </span>
                                {item.service}
                              </Space>
                            </Option>
                          ))}
                          </Select>
                          
                            </Form.Item>  
                          
                
                            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFile(e.target.files[0])}>
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
                            <Form.Item label="Press">
                            <Button onClick={addRoom}>Submit</Button>
                            </Form.Item>                           
                        </Form>

                    </Paper>
                  </Grid>
                </Grid>
       
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                        <h4 style={{textAlign:'center',marginBottom:'2rem'}}>ข้อมูลห้องสปา</h4>
                            <ListSpa/>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                        <h4 style={{textAlign:'center',marginBottom:'2rem'}}>บริการห้องสปา</h4>
                            <Table style={{height:'100%',paddingBottom:'0.5rem'}} columns={columns} dataSource={data} size="small" />
                            <Form
                            labelCol={{
                            span: 4,
                            }}
                            wrapperCol={{
                            span: 14,
                            }}
                            layout="horizontal"
                            style={{
                            maxWidth:"100%",
                            width:'100%',
                        
                            }}
                        >     

                            <Form.Item label="บริการ">
                              <div style={{display:'flex'}}>
                                <Input style={{marginRight:'1rem'}} onChange={(event)=>{setItemService1(event.target.value)}}/>
                                <Button onClick={addService}>Add</Button>
                              </div>
                            
                            </Form.Item>  
                            
                            <Form.Item label="">
                           
                            </Form.Item>                           
                        </Form>
                        </Paper>
                    </Grid>
                </Grid>
              </Container>
    
    
    </div>
  )
}

export default edit_spa