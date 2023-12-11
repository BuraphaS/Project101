import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button, Modal,Form,Input,Upload,Table,Image } from 'antd';
import swal from 'sweetalert';

const ReserveReport = () => {
    const [Reserve,setReserve] = useState([]);

    const getCard = () =>{
        Axios.get('http://localhost:3000/reserve')
        .then ((response) => {
            setReserve(response.data)
        })
    }
      useEffect(() => {
        getCard();
      }, []);
    const columns = [
        {
          title: 'รหัสการจอง',
          dataIndex: 'number',
          width:'15%',
        },
        {
          title: 'ชื่อห้อง',
          dataIndex: 'name',
          width:'30%',
          render: (text) => <h5>{text}</h5>,
        },
        {
          title: 'วัน/เวลา ที่จอง',
          dataIndex: 'timestamp',
          width:'10%',
          align:'center'
        },
        {
          title: 'วัน/เวลา เข้าพัก',
          dataIndex: 'timeStart',
          width:'10%',
          align:'center'
        },
        {
          title: 'วัน/เวลา ออก',
          dataIndex: 'timeEnd',
          width:'10%',
          align:'center'
        },
        {
          title: 'สถานะการจอง',
          dataIndex: 'status',
          align:'center'
        },
        {
          title: 'อัพโหลดหลักฐานการโอนเงิน',
          dataIndex: 'upload',
          align:'center'
        },
      ];
      const data = Reserve.map((val, index) => ({
        key: index.toString(),
        number:val.id_room, 
        // <Image width={"50%"} src={`http://localhost:3000/img/${{}}`} rounded/>,
        name: val.id_room,
        timestamp:new Date(val.time_reserve).toLocaleString('en-GB'),
        timeStart:new Date(val.date_start).toLocaleString('en-GB'),
        timeEnd:new Date(val.date_end).toLocaleString('en-GB'),
        status:val.status,
        upload:<Button type='primary'> หลักฐานการโอน</Button>
      }));

  return (
    
    <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
            style={{
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
              margin: '3rem 0rem',
              height: '90%',
            }}
          >
            <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size=" " />
        
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default ReserveReport