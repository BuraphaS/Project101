import React, { useState,useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios'
import {
  Button,
  Image,
  Form,
  Input,
  Upload,
  Table,
} from 'antd';
import swal from 'sweetalert';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

        const normFile = (e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          };
const edit_payment = () => {

  const [payment,setPayment] = useState([])

  const [account_number,setAccount_number] = useState("")
  const [bank,setBank_name] = useState("")
  const [account_name,setAccount_name] = useState("")
  const [img,setFile] = useState([""])

  const addPayment = () => {
    const formData = new FormData()
    formData.append('account_number',account_number)
    formData.append('bank',bank)
    formData.append('file',img)
    formData.append('account_name',account_name)
    Axios.post('http://localhost:3000/payment',formData
     
    )
    .then(function (response) {
          console.log(response);
          swal({
            title:"เพิ่มข้อมูล สำเร็จ",
            icon:"success",
            button:'OK'
          }).then(function(){
            location.reload();})
        })
    .catch(er => console.log(er))
}

  const getPayment = () =>{
    Axios.get('http://localhost:3000/payment')
    .then ((response) => {
      setPayment(response.data)
        })
    }
    const deletePayment = (id) => {
      Axios.delete(`http://localhost:3000/delete/payment/${id}`)
        
      swal({
        title:"ลบ สำเร็จ",
        icon:"success",
        button:'OK'
      }).then(function(){
        location.reload();})
         
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      getPayment();
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
          title: 'ธนาคาร',
          dataIndex: 'bank',
          
      },
      {
        title: 'เลขบัญชี',
        dataIndex: 'number',
        
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'name',
      
   },
   {
    title: 'รูปภาพ',
    dataIndex: 'img',
    width:'25%'
    },
      {
        title: 'แก้ไข / ลบ',
        dataIndex: 'edit',
        align:'center',
        width:'10%'
    },
    ]
    const data = payment.map((val, index) => ({
      key: index.toString(),
      id: val.id,
      bank: val.bank,
      number:val.account_number,
      name:val.account_name,
      img:<Image className='' src={`http://localhost:3000/img/${val.img}`} rounded />,

    
      edit: 
      
          <div style={{width:'100%',display:'flex',textAlign:'center'}}>  
            <Button style={{marginRight:'0.5rem'}} type="primary" onClick={() => showModal(val)}>แก้ไข</Button>
            <Button type="primary" danger  onClick={() => deleteRoom(val.id)}>ลบ</Button> 
          </div>
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
const onReset = () => {
  form.resetFields();
};
const [form] = Form.useForm();
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
            การชำระเงิน
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
                  <h4 style={{textAlign:'center',marginBottom:'0.5rem'}}>เพิ่มข้อมูลการชำระเงิน</h4>
                  <Form
                            form={form}
                            labelCol={{
                            span: 6,
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
                        <h5 style={{marginBottom:'2rem',textAlign:'center'}}></h5>
                            <Form.Item label="ชื่อธนาคาร" name="namebank">
                            <Input onChange={(event)=>{setBank_name(event.target.value)}}/>
                            </Form.Item>

                            <Form.Item label="เลขที่บัญชี" name="number">
                            <Input onChange={(event)=>{setAccount_number(event.target.value)}}/>
                            </Form.Item>

                            <Form.Item label="ชื่อเจ้าของบัญชี" name="name">
                            <Input onChange={(event)=>{setAccount_name(event.target.value)}}/>
                            </Form.Item>
                            
                            <Form.Item label="รูปภาพ" name="picture"valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFile(e.target.files[0])}>
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
                            
                            <Form.Item style={{marginLeft:'60%'}}>
                            <Button danger onClick={onReset} style={{marginRight:'1rem'}}>รีเซ็ต</Button>
                            <Button type='primary' onClick={addPayment}>ยืนยัน</Button>
                            </Form.Item>   

                        </Form>
                        

                        
                    </Paper>
                  </Grid>
                </Grid>
       
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                  <h4 style={{textAlign:'center',marginBottom:'2rem'}}>ข้อมูลการชำระเงิน</h4>
                  <Table style={{height:'100%',paddingBottom:'0.5rem'}} columns={columns} dataSource={data} size="small" />
                  </Paper>
                  </Grid>
                </Grid>
       
              </Container>
    </div>
  )
}

export default edit_payment