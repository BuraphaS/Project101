import React from 'react'
import {useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Modal,Form,Input,Upload,Table,Image } from 'antd';
import Axios from 'axios'
const info_user = () => {

  const [User,setUser] = useState([]);

    const getUser = () =>{
        Axios.get('http://localhost:3000/user')
        .then ((response) => {
            setUser(response.data)
        })
    }
    useEffect(() => {
        getUser();
      }, []);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Firstname',
      dataIndex: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
  ];
  const data = User.map((val, index) => ({
    key: index.toString(),
    id: val.id,
    email: val.email,
    username:val.username,
    firstname:val.firstname,
    lastname:val.lastname,
    phone:val.phone,
    role:val.role_id
  }));

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',margin:'3rem 0rem',height:'90%'}}>
                      <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size=" " />
                    </Paper>
                  </Grid>
                </Grid>
       
              </Container>
    </div>
  )
}

export default info_user