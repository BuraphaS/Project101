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
        
           alert('Delete Success')
           window.location.reload()
         
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      getPayment();
    }, []);
    const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          align:'center',
          width:'5%'
      },
      {
          title: 'Bank',
          dataIndex: 'bank',
          
      },
      {
        title: 'Number',
        dataIndex: 'number',
        
    },
    {
      title: 'Name',
      dataIndex: 'name',
      
   },
   {
    title: 'Picture',
    dataIndex: 'img',
    width:'25%'
    },
      {
        title: 'Delete',
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
            <Button type='primary' danger onClick={() => deletePayment(val.id)}>Delete</Button> 
            
    }));
  
  
  return (
    <div>
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
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
                        <h5 style={{marginBottom:'2rem',textAlign:'center'}}></h5>
                            <Form.Item label="ชื่อธนาคาร">
                            <Input onChange={(event)=>{setBank_name(event.target.value)}}/>
                            </Form.Item>

                            <Form.Item label="เลขที่บัญชี">
                            <Input onChange={(event)=>{setAccount_number(event.target.value)}}/>
                            </Form.Item>

                            <Form.Item label="ชื่อเจ้าของบัญชี">
                            <Input onChange={(event)=>{setAccount_name(event.target.value)}}/>
                            </Form.Item>
                            
                            <Form.Item label="รูปภาพ" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setFile(e.target.files[0])}>
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
                            
                            <Button style={{width:'58%',justifyContent:'center',marginLeft:'8.4rem',alignItems:'center',textAlign:'center'}} onClick={addPayment}>Submit</Button>
                                                    
                        </Form>
                        

                        
                    </Paper>
                  </Grid>
                </Grid>
       
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                  <Table style={{height:'100%',paddingBottom:'0.5rem'}} columns={columns} dataSource={data} size="small" />
                  </Paper>
                  </Grid>
                </Grid>
       
              </Container>
    </div>
  )
}

export default edit_payment