import React, { useState,useEffect  } from 'react'
import { Tab1 } from './styled';

import Axios from 'axios'
const listCarousel = () => {

    const [Carousel,setCarousel] = useState([]);

    const getCarousel = () =>{
        Axios.get('http://localhost:3000/carousel')
        .then ((response) => {
            setCarousel(response.data)
        })
    }
    const deleteCarousel = (id) => {
        Axios.delete(`http://localhost:3000/delete_carousel/${id}`)
          
             alert('Delete Success')
             window.location.reload()
           
          .catch((error) => {
            console.error(error);
          });
      };
    useEffect(() => {
        getCarousel();
      }, []);
  return (
    <div>
        <Tab1>
            <table>
                <tr>
                <th>Picture</th>
                <th>Delete</th>
                </tr>
                {Carousel.map((val, index) => (
                <tr key={index} style={{height:'35px'}} >
                {/* <td>{val.id}</td> */}
                <td>
                     <img style={{width:'150px',height:'125px',margin:'0 auto', display:'flex' }} src={`http://localhost:3000/img/${val.file_name}`}/>  
                </td>
                <td>
                    <button class="button-67" role="button" onClick={() => deleteCarousel(val.id)}>Delete</button>
                </td>
                       
                </tr>
                ))}
            </table>
        </Tab1>
    </div>
  )
}

export default listCarousel