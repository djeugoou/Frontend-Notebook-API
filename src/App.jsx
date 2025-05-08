import React from 'react';
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
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


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
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
               }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
           <a>Delete</a>
        </Space>
      )}
    />
  </Table>
  </>
  
    


    
  )}

export default App;