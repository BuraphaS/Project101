import React from 'react'
import {useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Space,Form,Input,Upload,Table,Image,Select,Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ListGym from './component/listGym'
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { Option } = Select;

import Axios from 'axios'

const edit_gym = () => {

    const handleChange = (selectedValues) => {
        setSelectedFacilities(selectedValues);
      console.log(`selected ${selectedValues}`);
    };
    
      const [room_name,setRoom_name] = useState("")
      const [detail,setDetail] = useState("")
      const [img,setFile] = useState([""])

      const [facilities, setSelectedFacilities] = useState([]);
      const [item_facilities,setItemFacilities1] = useState("")
    
    
    
    
      const [facilities1,getFacilities] = useState([])
    
      const addRoom = () => {
        const formData = new FormData()
        formData.append('room_name',room_name)
        formData.append('detail',detail)
        formData.append('file',img)
        formData.append('facilities',facilities)
        Axios.post('http://localhost:3000/gym',formData
         
        )
        .then(function (response) {
              console.log(response);
            })
        .catch(er => console.log(er))
    }
    
      const addFacilities = () => {
        Axios.post('http://localhost:3000/facilities_gym',{
          facilities : item_facilities
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(er => console.log(er))
      }
    
    
        const getFacilities1 = () =>{
        Axios.get('http://localhost:3000/facilities_gym')
        .then (res => {
          getFacilities(res.data)
        })
        }
        const deleteRoomFacilities = (id) => {
            Axios.delete(`http://localhost:3000/delete/gym_facilities/${id}`)
              
                 alert('Delete Success')
                 window.location.reload()
               
              .catch((error) => {
                console.error(error);
              });
          };
        
      useEffect(() => {
        getFacilities1();
      }, []);
    

      const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align:'center',
            width:'5%'
        },
        {
            title: 'Facilities',
            dataIndex: 'name',
            
        },
        {
          title: 'Delete',
          dataIndex: 'edit',
          align:'center',
          width:'10%'
      },
      ]
      const data = facilities1.map((val, index) => ({
        key: index.toString(),
        id: val.id,
        name: val.facilities,
        // detail: <p style={{width:'5%'}}>{val.detail}</p>,
        edit: 
              <Button type='primary' danger onClick={() => deleteRoomFacilities(val.id)}>Delete</Button> 
              
      }));

      
  return (
    <div>
        
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
             
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

                          
                            <Form.Item label="สิ่งอำนวยความสะดวก">

                           
                            <Select
                            mode="multiple"
                            style={{
                              width: '100%',
                            }}
                            placeholder="เลือกสิ่งอำนวยความสะดวก"
                            defaultValue={[]}
                            onChange={handleChange}
                            optionLabelProp="label"
                          >
                          {facilities1.map((item,index)=>( 
                            <Option key={item.facilities} value={item.facilities} label={item.facilities}>
                              <Space>
                                <span role="img" aria-label={item.facilities}>
                                  
                                </span>
                                {item.facilities}
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
                            <Form.Item label="Button">
                            <Button onClick={addRoom}>Submit</Button>
                            </Form.Item>                           
                        </Form>

                    </Paper>
                  </Grid>
                </Grid>
       
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
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

                            <Form.Item label="สิ่งอำนวยความสะดวก">
                              <div style={{display:'flex'}}>
                                <Input style={{marginRight:'1rem'}} onChange={(event)=>{setItemFacilities1(event.target.value)}}/>
                                <Button onClick={addFacilities}>Add</Button>
                              </div>
                            
                            </Form.Item>  
                            
                            <Form.Item label="">
                           
                            </Form.Item>                           
                        </Form>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                            <ListGym/>
                        </Paper>
                    </Grid>
                </Grid>

                
              </Container>
    
    </div>
  )
}

export default edit_gym