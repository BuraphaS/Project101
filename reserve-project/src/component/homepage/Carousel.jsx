import React from 'react'
import { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Axios from 'axios';


const Carousel1 = () => {

    const [index, setIndex] = useState(0);
    const [data,setData] = useState([])
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    const getCarousel = () =>{
      Axios.get('http://localhost:3000/carousel')
      .then (res => {
        setData(res.data)
      })
  }
    
  useEffect(() => {
    getCarousel();
  }, []);
  return (
    <>
    
    <div style={{width:'100%',alignItems:'center',justifyContent:'center',display:'flex',margin:'0 auto'}}>
      
        <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 mt-5 p-0'>
        {data.map((item,index)=>(
      <Carousel.Item>
      
        <img
          style={{height:'600px',width:'100%' ,borderRadius:'0px'}}
          className="d-block w-100"
          src={`http://localhost:3000/img/${item.file_name}`}
          alt=""
          key={index}
        />
        
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      ))}
    </Carousel>
      
    </div>
    
    </>
    
  )
}

export default Carousel1