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

  
  const [data, setData] = useState(null)
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  //POST
  const handleSubmit=(values)=>{
  axios.post('http://localhost:8000/notes', values)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
  }

  //Get request

   axios.get('http://localhost:8000/notes')
  .then(function (response) {
    console.log(response.data);
    setData(response.data) //this is what displays the user input on frontend
  })

  //Delete Request
  axios.delete('http://localhost:8000/notes{id}',)


 
  return (
    <>
    <Form 
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
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

    //***************************Table+++++++ */

     <Table dataSource={data}>
    
    <Column title="Title" dataIndex="title" key="title" />
    <Column title="Content" dataIndex="content" key="content" />
    <Column title="Category" dataIndex="category" key="category" />
    <Column title="Icon" dataIndex="icon" key="icon" />
    <Column title="Due-Date" dataIndex="duedate" key="duedate" />
   
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Edit{record.lastName}</a>
           <a>Delete</a>
        </Space>
      )}
    />
  </Table>
  </>
  
    
  )}

export default App;