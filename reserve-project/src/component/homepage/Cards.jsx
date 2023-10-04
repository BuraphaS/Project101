import React from 'react'
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Axios from 'axios';

const Cards = () => {

  const [data,setData] = useState([])
  const getCard= () =>{
    Axios.get('http://localhost:3000/card')
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
    <CardGroup className='p-5 w-25'>

      <Card className='p-0 w-50'>
        <Card.Img variant="top" src={`http://localhost:3000/img/${item.img}`} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
           {item.detail}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      
    </CardGroup>
 ))}
    
    </div>
  )
}

export default Cards