import React from 'react'
import Carousel1 from '../component/homepage/Carousel'
import Cards from '../component/homepage/Cards'
import { useState,useEffect } from 'react'


import Axios from 'axios'
const homePage = () => {

  const [Home,setHome] = useState([]);

  const getHome = () =>{
    Axios.get('http://localhost:3000/home')
    .then ((response) => {
        setHome(response.data)
    })
}
  useEffect(() => {
    getHome();
  }, []);
  return (
    <div>
       
        <Carousel1/>
        {Home.map((val, index) => (
        <div style={{backgroundColor:val.bgColor}}>
          <Cards/> 
        </div>
        ))}
    </div>
  )
}

export default homePage