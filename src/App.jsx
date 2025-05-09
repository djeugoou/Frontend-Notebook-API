import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import {
  Button,
  DatePicker,
  Mentions,
  Form,
  Input,
  Space,
  Table,
  Modal, 
  Tag,
} from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

//Table
const { Column, ColumnGroup } = Table;

const App = () => {
  function SendGetRequest(url){
    axios.get(url)
    .then(function (response) {
      setData(response.data)     
  })
  }
  const [id,setId] =useState(0)
  const [isModalOpen, setIsModalopen] = useState(false)
  const [formData, setFormData] = useState({"title":"1", "content":"","category":"","icon":"","duedate":""})
  const [data, setData] = useState(null)
  const [form] = Form.useForm();
  const [formEdit]= Form.useForm();
  const [deleteRefreshTrigger,setDeleteRefreshTrigger]=useState(false)
  const [postRefreshTrigger,setPostRefreshTrigger]=useState(false)
  const [updateRefreshTrigger,setupdateRefreshTrigger]=useState(false)

  console.log 
  //POST Request
 const handleSubmit=(values)=>{
    axios.post('http://localhost:8000/notes', values)
    .then((response) => {
      response.json()
    })
    .catch((error) => {
      console.log(error);
  })
    setPostRefreshTrigger(!postRefreshTrigger)
    form.resetFields()//reset Form fields
  }

  useEffect(()=>{
    SendGetRequest('http://localhost:8000/notes')
    },[])

  useEffect(()=>{
    SendGetRequest('http://localhost:8000/notes')
  },[postRefreshTrigger])

   useEffect(()=>{
    SendGetRequest('http://localhost:8000/notes')
  },[updateRefreshTrigger])

   useEffect(()=>{
    SendGetRequest('http://localhost:8000/notes')
    },[deleteRefreshTrigger])

  const openModal=(id,record)=>{
    setFormData(record)
    setIsModalopen(true)
    setId(id)
  }
  function sendUpdate(id, values) {
    axios.put('http://localhost:8000/notes/'+id, values)
    .then(res => {
      message.success('Note updated');
      // e.g. reload notes or update local state
    })
    .catch(err => {
      message.error(`Update failed (${err.response?.status})`);
    });
}

  const handleDelete=(id)=>{
     axios.delete('http://localhost:8000/notes/'+id)
      .then(res => {

    if (res.status === 204) {
      // update table state…
      setDeleteRefreshTrigger(!deleteRefreshTrigger)
    }
  })
  .catch(err => {
    console.error('error status:', err.response?.status);
  });
}
 
 const handleCancel=()=>{
  setIsModalopen(false)
 }
 const handleOk=()=>{
  sendUpdate(id,formData)
  setIsModalopen(false)
  setupdateRefreshTrigger(!updateRefreshTrigger)
 }
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(formdata => ({ ...formdata, [name]: value }));
  };


  return (
    <>
    <Modal
        title="Edit"
        open={isModalOpen}
        okText='Save'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
            labelCol={{span:5}}
            form={formEdit}
        >
          <Form.Item label="Title" rules={[{ required: true, message: 'Please input!' }]}>
            <Input value={formData.title}  name='title' onChange={handleInputChange}/>
           </Form.Item>
           <Form.Item label="Content"  rules={[{ required: true, message: 'Please input!' }]}>
              <Input  value={formData.content} name='content'onChange={handleInputChange}/>
            </Form.Item>
           <Form.Item label="Category" rules={[{ required: true, message: 'Please input!' }]}>
              <Input   value={formData.category} name='category'onChange={handleInputChange}/>
           </Form.Item>
            <Form.Item label="Icon" rules={[{ required: true, message: 'Please input!' }]}>
              <Input   value={formData.icon} name='icon'onChange={handleInputChange}/>
            </Form.Item>
            <Form.Item label="Due Date" rules={[{ required: true, message: 'Please input!' }]}>
              <Input   value={formData.duedate} name='duedate'onChange={handleInputChange}/>
            </Form.Item>
        </Form>
        
    </Modal>
    <Form 
      title='Create New Node'
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
      form={form}
      labelCol={{span:5}}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input!' }]}>
        <Input />
      </Form.Item>

   
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Mentions />
      </Form.Item>

      <Form.Item
        label="Icon"
        name="icon"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Mentions />
      </Form.Item>



      <Form.Item
        label="Due- Date"
        name="duedate"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <DatePicker />
      </Form.Item>

   
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

     <Table dataSource={data}>
    
    <Column title="Title" dataIndex="title" key="title" />
    <Column title="Content" dataIndex="content" key="content" />
    <Column title="Category" dataIndex="category" key="category" />
    <Column title="Icon" dataIndex="icon" key="icon" />
    <Column title="Due-Date" dataIndex="duedate" key="duedate" />
   
    <Column
      title="Action"
      key="action"
      render={(_, record) =>(
        <Space size="middle">
           <Button type="primary" htmlType="submit" onClick={()=>openModal(record.id,record)}>
          Edit
        </Button>
            <Button type="primary" htmlType="submit" onClick={()=>handleDelete(record.id)} >
          Delete
        </Button>
        </Space>
      )}
    />
  </Table>
  </>
  
  )
}

export default App