import React, { useState,useEffect  } from 'react'
import swal from 'sweetalert';
import { Button, Modal,Form,Input,Upload,Table,Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// import Image from 'react-bootstrap/Image';

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

        Axios.put(`http://localhost:3000/cardEdit/${id}`,{
            title:title||selectedCard.title,
            detail:detail||selectedCard.detail,
        })
        .then(function (response) {
            console.log(response);
            swal({
              title:"Changed Success",
              icon:"success",
              button:'OK'
            }).then(function(){
              location.reload();})
            })
        .catch(er => console.log(er))

        const formData = new FormData()
        formData.append('file',img)
        Axios.put(`http://localhost:3000/cardImgEdit/${id}`,formData
         
        )
        .then(function (response) {
              console.log(response);
              swal({
                title:"Edit Picture Success",
                icon:"success",
                button:'OK'
              }).then(function(){
                location.reload();})
            })
        .catch(er => console.log(er))
      }

        
      

        const [selectedCard, setSelectedCard] = useState(null);
        const showModal = (card) => {
            setSelectedCard(card);
          };
        
          const handleOk = () => {
            setSelectedCard(null); 
          };
        
          const handleCancel = () => {
            setSelectedCard(null);
          };
          const {TextArea} = Input;

          
          const columns = [
            {
              title: 'รูปภาพ',
              dataIndex: 'picture',
              width:'50%',
            },
            {
              title: 'ชื่อ',
              dataIndex: 'name',
              width:'100%',
              render: (text) => <h5>{text}</h5>,
            },
            {
              title: 'แก้ไข / ลบ',
              dataIndex: 'edit',
              align:'center'
            },
          ];
          const data = Card1.map((val, index) => ({
            key: index.toString(),
            picture: <Image width={"50%"} src={`http://localhost:3000/img/${val.img}`} rounded/>,
            name: val.title,
            // detail: val.detail,
            edit: <div style={{width:'100%',display:'flex',textAlign:'center'}}>  
                  <Button style={{marginRight:'0.5rem'}} type='primary' onClick={() => showModal(val)}>แก้ไข</Button>
                  <Button type='primary' danger onClick={() => deleteCard(val.id)}>ลบ</Button> 
                  </div>,
          }));


          return (
            <div>
              <Table style={{height:'100%',marginBottom:'5.5rem',paddingBottom:'3.5rem'}} columns={columns} dataSource={data} size=" " />
        
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
                    
                    <Form.Item label="ชื่อ">
                      <Input defaultValue={selectedCard.title}  onChange={(event) => { setTitle(event.target.value) }} />
                    </Form.Item>
                    <Form.Item label="รายละเอียด">
                      <TextArea rows={4} defaultValue={selectedCard.detail} onChange={(event) => { setDetail(event.target.value) }}/>
                    </Form.Item>
                    <Form.Item label="รูปภาพ" valuePropName="fileList" getValueFromEvent={normFile} onChange={(e)=>setImg(e.target.files[0])}>
                      <Upload listType="picture-card" >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>รูปภาพ</div>
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