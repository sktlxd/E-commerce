import React, { Component } from 'react'
import {
  PageHeader, Form, Input, Select,InputNumber,
  DatePicker, Button, Divider, Upload, message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './style/addNewClients.less'
import AddressCascader from '../../publicComponents/Cascader-address-options'

const { Option } = Select
const fileList = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
  ];


export default  class AddNewClients extends Component {
    handleChangeStatus = (value) =>{
        console.log(`selected ${value}`);
    }
    handleChangeSeries = (value) =>{
        console.log(`selected ${value}`);
    }
    handleChangeType = (value) =>{
        console.log(`selected ${value}`);
    }

  render() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
      };
      
      /* eslint-disable no-template-curly-in-string */
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          phone: '${label} is not a valid phone!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
        
      };
    // const { fileList, tenantName, filesTypeList } = this.state;
    // const onFinish = (values: any) => {
    //     console.log(values);
    // };

    return (
      <div className='add_clients'>
        <div className='wrapper'>
          <div className='add_title_bar'>
            <PageHeader
              className="page_header"
              onBack={() => this.props.history.push('/app/clients')}
              title=" "
            />
            <p className='page_title'>创建客户</p>
          </div>
          <Divider className='add_divider'/>
          <div className='client_form'>
            <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="客户名称" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="联系电话" rules={[{   }]}>
                  <Input />
                </Form.Item>
                <Form.Item
								name='city'
								label='所属城市'
								rules={[{ required: true, message: '请选择省市区', type: 'array' }]}
							>
								<AddressCascader  />
							</Form.Item>
              <Form.Item
								name='detailedAddress'
								label='详细地址'
								rules={[{ required: true, message: '请输入详细地址' }]}
							>
								<Input autoComplete='off'/>
							</Form.Item>
                <Form.Item name={['user', 'subscriptionStatus']} label="订阅状态">
                    <Select defaultValue="" style={{ width: 160 }} onChange={this.handleChangeStatus}>
                       <Option value="jack">草稿</Option>
                       <Option value="lucy">活跃</Option>
                       <Option value="disabled" disabled>
                         Disabled
                       </Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'customerType']} label="客户类型">
                    <Select defaultValue="" style={{ width: 160 }} onChange={this.handleChangeType}>
                       <Option value="jack">草稿</Option>
                       <Option value="lucy">活跃</Option>
                       <Option value="disabled" disabled>
                         Disabled
                       </Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="备注">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item className='upload'
                  label="媒体文件"
                >  
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        defaultFileList={[...fileList]}
                        className="upload-list-inline"
                      >
                        <Button icon={<UploadOutlined />}>上传</Button>
                        <span style={{ marginLeft: '20px',color:'green' }}>(接收图片和文件)</span>
                      </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

