import * as React from 'react'

// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import { Tab1 } from './component/styled';
// import NotificationsIcon from '@mui/icons-material/Notifications';

import {useState , useEffect} from 'react'
import Axios from 'axios';
import ListRoom from './component/listRoom'
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


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { Option } = Select;


const edit_rooms = () => {

  const handleChange = (selectedValues) => {
    setSelectedFacilities(selectedValues);
  console.log(`selected ${selectedValues}`);
};

  const [room_name,setRoom_name] = useState("")
  const [detail,setDetail] = useState("")
  const [bed_type,setBedType] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setquantity] = useState("")
  const [img,setFile] = useState([""])
  // const [facilities,setFacilities] = useState("")
  const [facilities, setSelectedFacilities] = useState([]);
  const [item_facilities,setItemFacilities1] = useState("")




  const [facilities1,getFacilities] = useState([])

  const addRoom = () => {
    const formData = new FormData()
    formData.append('room_name',room_name)
    formData.append('bed_type',bed_type)
    formData.append('detail',detail)
    formData.append('price',price)
    formData.append('quantity',quantity)
    formData.append('file',img)
    formData.append('facilities',facilities)
    Axios.post('http://localhost:3000/room',formData
     
    )
    .then(function (response) {
          console.log(response);
        })
    .catch(er => console.log(er))
}


  const addFacilities = () => {
    Axios.post('http://localhost:3000/facilities',{
      facilities : item_facilities
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(er => console.log(er))
  }


    const getFacilities1 = () =>{
    Axios.get('http://localhost:3000/facilities')
    .then (res => {
      getFacilities(res.data)
    })
    }
  
    const deleteRoomFacilities = (id) => {
      Axios.delete(`http://localhost:3000/delete/room_facilities/${id}`)
        
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

                            <Form.Item label="ขนาดของห้อง">
                            <Input onChange={(event)=>{setDetail(event.target.value)}}/>
                            </Form.Item>

                            <Form.Item label="ลักษณะของเตียง">
                            <Input onChange={(event)=>{setBedType(event.target.value)}}/>
                            </Form.Item>  

                            <Form.Item label="จำนวนคน">
                            <Input onChange={(event)=>{setquantity(event.target.value)}}/>
                            </Form.Item>   

                            <Form.Item label="Price">
                            <Input onChange={(event)=>{setPrice(event.target.value)}}/>
                            </Form.Item>   

                          
                            <Form.Item label="สิ่งอำนวยความสะดวก">
                           
                            {/* <Input onChange={(event)=>{setFacilities_id(event.target.value)}}/> */}
                           
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
       
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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

                            <Form.Item label="สิ่งอำนวยความสะดวก :"> 
                              <div style={{display:'flex'}}>
                                <Input style={{marginRight:'1rem'}} onChange={(event)=>{setItemFacilities1(event.target.value)}}/>
                                <Button onClick={addFacilities}>Add</Button>
                              </div>
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
                      <ListRoom/>
                  </Paper>
                  </Grid>
                </Grid>
       
              </Container>
    </div>
  )
}

export default edit_rooms