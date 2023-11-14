import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Button, Form, Input } from 'antd';
import swal from 'sweetalert';

const ChangeInfo = () => {
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const getUser = () => {
    const token = localStorage.getItem('token');
    Axios.get("http://localhost:3000/userlog", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const userData = response.data;
      const userId = userData.id;
      Axios.get(`http://localhost:3000/info_user/${userId}`)
        .then(() => {
          setUser({
            ...userData,
            
          });
        })
        .catch(() => {
          console.error('Error fetching additional data:');
        });
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  };
  const editInfo = () => {
    // ตรวจสอบว่ารหัสผ่านถูกกรอกหรือไม่
    if (!password || !confirmPassword) {
      swal({
        title: 'Please enter your password',
        text: 'Please try again',
        icon: 'error',
        button: 'OK',
      });
      console.error('กรุณากรอกรหัสผ่าน');
      return;
    }
  
    // เพิ่มตรวจสอบรหัสผ่านที่ยืนยัน
    if (password === confirmPassword) {
      Axios.put(`http://localhost:3000/Edit/userlog/${user.id}`,{
        email: email || user.email,
        username: username || user.username,
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        phone: phone || user.phone,
        password: password || user.password,
      })
      .then(function (response) {
        swal({
          title: 'Success',
          text: 'Your infomation has been changed',
          icon: 'success',
          button: 'OK',
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      // รหัสผ่านที่ยืนยันไม่ตรงกัน
      setPasswordMatch(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
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
            <h2 style={{ textAlign: 'center', padding: '0.5rem', margin: '0.5rem' }}>
              แก้ไขข้อมูลส่วนตัว
            </h2>
            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              style={{
                maxWidth: "100%",
                width: '100%',
              }}
            >
            
              <Form.Item label="Email">
                <Input
                  type="email"
                  defaultValue={user?.email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Item>
              <Form.Item label="Username">
                <Input
                  defaultValue={user?.username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Item>
              <Form.Item label="First Name">
                <Input defaultValue={user?.firstname} onChange={(event) => setFirstname(event.target.value)} />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input defaultValue={user?.lastname} onChange={(event) => setLastname(event.target.value)} />
              </Form.Item>
              <Form.Item label="Phone">
                <Input type='number' defaultValue={user?.phone} onChange={(event) => setPhone(event.target.value)} />
              </Form.Item>
              <Form.Item label="Password">
                <Input type='password' defaultValue={user?.password} onChange={(event) => setPassword(event.target.value)} />
              </Form.Item>
              <Form.Item label="Confirm Password" validateStatus={password !== confirmPassword ? 'error' : ''} help={password !== confirmPassword ? 'Passwords do not match' : ''}>
                <Input type='password' defaultValue={user?.password} onChange={(event) => setConfirmPassword(event.target.value)} />
              </Form.Item>
              

              <div style={{ alignItems: 'center', textAlign: 'end', marginRight: '5rem' }}>
                <Button type="primary" onClick={editInfo}>ยืนยัน</Button>
              </div>
            </Form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </div>
  )
}

export default ChangeInfo