import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import "./App.css";

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


const { Column, ColumnGroup } = Table;

//The APP
const App = () => {
  function SendGetRequest(url){
    axios.get(url)
    .then(function (response) {
      setData(response.data)     
  })
  }

  //Usestate hooks
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

  //PUT request
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

const handleCancel=()=>{
  setIsModalopen(false) //Closes the modal
 }
 const handleOk=()=>{
  sendUpdate(id,formData)
  setIsModalopen(false) //Closes the modal after the update request is sent
  setupdateRefreshTrigger(!updateRefreshTrigger)
 }
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(formdata => ({ ...formdata, [name]: value }));
  };

  //DELETE REQUEST
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
 
 

  return (
    <>
  
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
    <h1 className="text-5xl font-bold text-center text-indigo-700 mb-12 drop-shadow-sm">📝 My Notebook</h1>

    {/* Create Form Section */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Create a New Note</h2>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300" />
        </Form.Item>
        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
          <Input.TextArea className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Mentions className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" />
        </Form.Item>
        <Form.Item label="Icon" name="icon" rules={[{ required: true }]}>
          <Mentions className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" />
        </Form.Item>
        <Form.Item label="Due Date" name="duedate" rules={[{ required: true }]}>
          <DatePicker className="w-full rounded-lg border-gray-300 shadow-sm px-4 py-2" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition">
            Save Note
          </Button>
        </Form.Item>
      </Form>
    </div>

    {/* Table Section */}
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Your Notes</h2>
      <Table dataSource={data} rowKey="id" bordered className="rounded-lg overflow-hidden">
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Content" dataIndex="content" key="content" />
        <Column title="Category" dataIndex="category" key="category" />
        <Column title="Icon" dataIndex="icon" key="icon" />
        <Column title="Due-Date" dataIndex="duedate" key="duedate" />
        <Column
          title="Actions"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
                onClick={() => openModal(record.id, record)}
              >
                Edit
              </Button>
              <Button
                danger
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>

    {/* Modal Styling (inputs inside modal) */}
    <Modal
      title="Edit Note"
      open={isModalOpen}
      okText="Save"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={formEdit}>
        <Form.Item label="Title">
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" value={formData.title} name="title" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Content">
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" value={formData.content} name="content" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Category">
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" value={formData.category} name="category" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Icon">
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" value={formData.icon} name="icon" onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Due Date">
          <Input className="rounded-lg px-4 py-2 border border-gray-300 shadow-sm" value={formData.duedate} name="duedate" onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  </div>
;

  </>
  
  )
}

export default App