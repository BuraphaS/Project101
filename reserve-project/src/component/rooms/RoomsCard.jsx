import React from 'react'
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Axios from 'axios';

const RoomsCard = () => {
        const [data,setData] = useState([])
        const getCard= () =>{
        Axios.get('http://localhost:3000/room')
        .then (res => {
            setData(res.data)
        })
    }
        
    useEffect(() => {
        getCard();
    }, []);
        return (
    
        
        <div style={{display:"flex",flexWrap: "wrap"}}>
    
    {data.map((item,index)=>(
        <CardGroup className='mb-3' style={{maxWidth:'100%',boxShadow:' rgba(0, 0, 0, 0.35) 0px 5px 15px',borderRadius:'2%'}}>
            <Card>
                <CardGroup className='row g-0'>
                <CardGroup className='col-md-4'>
                    <Card.Img className=' img-fluid rounded-start'  src={`http://localhost:3000/img/${item.img}`}/>
                 </CardGroup>
                 <CardGroup className='col-md-8'>
                    <Card.Body>
                    <Card.Title style={{fontSize:'1.7rem'}}>{item.room_name}</Card.Title>
                    <Card.Text>
                        <ul style={{listStyle:'none'}}>
                            <li>ขนาดห้อง : {item.detail}</li>
                            <li>ลักษณะเตียง : {item.bed_type}</li>
                            <li>จำนวนคน : {item.quantity} คน</li>
                            
                        </ul>
                    </Card.Text>
                    <Card.Title>
                        สิ่งอำนวยความสะดวก
                    </Card.Title>
                    <ul>
                        <li>
                            {item.facilities}
                        </li>
                    
                    </ul>
                    </Card.Body>
                 </CardGroup>
             
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
                </CardGroup>
            </Card>
            
        </CardGroup>
    ))}
        
        </div>
        )
    }

export default RoomsCard