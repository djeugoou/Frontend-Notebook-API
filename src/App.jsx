import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Mentions,
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


const App = () => {

  
  const [data, setData] = useState(null)
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);
  const handleSubmit=(values)=>{
  axios.post('http://localhost:8000/notes', values)
  .then((response) => {
    console.log(response.data);
      // Handle data
  })
  .catch((error) => {
    console.log(error);
  })
  }
  axios.get('http://localhost:8000/notes')
  .then(function (response) {
    console.log(response.data);
  })
  return (
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
  );
};
export default App;