import React, { useState,useEffect  } from 'react'
import { Tab1,Button1 } from './styled';
import { Table, Button } from 'antd';
import Image from 'react-bootstrap/Image';
import swal from 'sweetalert';
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
          
        swal({
          title:"Delete Success",
          icon:"success",
          button:'OK'
        }).then(function(){
          location.reload();})
           
          .catch((error) => {
            console.error(error);
          });
      };
    useEffect(() => {
        getCarousel();
      }, []);



    const columns = [
        {
          title: 'รูปภาพ',
          dataIndex: 'picture',
        },
        {
          title: 'ลบ',
          dataIndex: 'edit',
          align:'center'
        },
      ];
      const data = Carousel.map((val, index) => ({
        key: index.toString(),
        picture: <Image className='w-50' src={`http://localhost:3000/img/${val.file_name}`} rounded />,
        edit:   <Button type='primary' danger onClick={() => deleteCarousel(val.id)}>ลบ</Button>
      }));


  return (
    <div>
        
        
            <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size="smaller" />
        
        

    </div>
  )
}

export default listCarousel