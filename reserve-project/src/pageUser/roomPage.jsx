import React from 'react'
import RoomsCard from '../component/rooms/RoomsCard'
import MeetingCard from '../component/rooms/MeetingCard'
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
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const roomPage = () => {
  
  return (
    <div>
        <h1 style={{display:'flex',textAlign:'center',width:'100%',marginTop:'5rem', justifyContent:'center'}}>
            ห้องพัก
        </h1>
<div style={{display:'flex',margin:'1.5rem'}}>
        <div style={{border:'0px solid #F4CE14',backgroundColor:'#F5F7F8',color:'#45474B',height:'50%',borderRadius:'10px',padding:'1.5rem',width:'50%',margin:'1rem',boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <h4>Search</h4>     
                
          <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              
              style={{ maxWidth: '100%' ,}}
            >
            
              <Form.Item label="ค้นหา">
                <Input />
              </Form.Item>

              <Form.Item label="ระยะเวลา ">
                <RangePicker />
              </Form.Item>
              <Form.Item label="จำนวน">
                <InputNumber /> คน
              </Form.Item>          
              <Form.Item label="Button">
                <Button>Button</Button>
              </Form.Item>
            </Form>
        </div>
        <div style={{width:'100%',margin:'1rem',}}>
          <RoomsCard />
        </div>
</div>
      
         
          
      
        
       
        <h1 style={{display:'flex',textAlign:'center',width:'100%',marginTop:'5rem', justifyContent:'center'}}>
          ห้องประชุม
        </h1>
        <MeetingCard/>
    </div>
  )
}

export default roomPage