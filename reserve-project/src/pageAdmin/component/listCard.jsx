import React, { useState,useEffect  } from 'react'
import { Tab1 } from './styled';

import { Button, Modal,Form,Input,Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Axios from 'axios'

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const listCard = () => {
    const [Card1,setCard1] = useState([]);

    const [file_name,setFileCard] =  useState([""])
    const [img,setImg] = useState("")
    const [title,setTitle] = useState("")
    const [detail,setDetail] = useState("")

    const deleteCard = (id) => {
        Axios.delete(`http://localhost:3000/delete_card/${id}`)
          
             alert('Delete Success')
             window.location.reload()
           
          .catch((error) => {
            console.error(error);
          });
      };
      
    const getCard = () =>{
        Axios.get('http://localhost:3000/card')
        .then ((response) => {
            setCard1(response.data)
        })
    }
      useEffect(() => {
        getCard();
      }, []);

    const setCard = (id) =>{

        
        // const formData = new FormData()
        // formData.append('file',img)
        // formData.append('title', title);
        // formData.append('detail', detail);
        Axios.put(`http://localhost:3000/cardEdit/${id}`,{
            title:title,
            detail:detail
        })
        .then(function (response) {
            console.log(response);
            })
        .catch(er => console.log(er))

        const formData = new FormData()
        formData.append('file',img)
        Axios.put(`http://localhost:3000/cardImgEdit/${id}`,formData
         
        )
        .then(function (response) {
              console.log(response);
            })
        .catch(er => console.log(er))
      }

        
      

        const [selectedCard, setSelectedCard] = useState(null);
        const showModal = (card) => {
            setSelectedCard(card); // เก็บข้อมูลการ์ดที่ถูกเลือก
          };
        
          const handleOk = () => {
            setSelectedCard(null); // ล้างการ์ดที่ถูกเลือก
          };
        
          const handleCancel = () => {
            setSelectedCard(null); // ล้างการ์ดที่ถูกเลือก
          };
        
          return (
            <div>
              <Tab1>
                <table>
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Card1.map((val, index) => (
                      <tr key={index} style={{ height: '35px' }}>
                        <td>
                          <img
                            style={{ width: '150px', height: '125px', margin: '0 auto', display: 'flex' }}
                            src={`http://localhost:3000/img/${val.img}`}
                          />
                        </td>
                        <td>{val.title}</td>
                        <td>
                          <button className="button-66" role="button" onClick={() => showModal(val)}>
                            Edit
                          </button>
                          <button className="button-67" role="button" onClick={() => deleteCard(val.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab1>
              {selectedCard && (
                <Modal title="แก้ไข" open={true} onOk={() => { setCard(selectedCard.id); handleOk(); }} onCancel={handleCancel}>
                     
                  <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                    style={{
                      maxWidth: '100%',
                      width: '100%',
                    }}
                  >
                    
                    <Form.Item label="Title">
                      <Input placeholder={selectedCard.title}  onChange={(event) => { setTitle(event.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Detail">
                      <Input onChange={(event) => { setDetail(event.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setImg(e.target.files[0])}>
                      <Upload listType="picture-card" >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Form>
                </Modal>
              )}
            </div>
          );
        };

export default listCard