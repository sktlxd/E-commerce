import React, { Component } from 'react'
import {
  PageHeader, Form, Input,
  Button, Divider, message
} from 'antd'
import { originalUrl, addGourpUrl } from '../../../dataModule/UrlList'
import history  from '../../../components/common/history.js'
import './style/addNewProductSeries.less'
import axios from 'axios'

export default class AddNewproductSeries extends Component {
  
  onFinish= (values) => {
    console.log(values)
    axios.post(originalUrl+addGourpUrl, values)
    .then(() => {
      message.success('创建成功')
      history.push('/app/productSeries')
    }).catch(() => {
      message.error('创建失败请重试!')
    })
  }

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };

    return (
      <div className='add_productSeries'>
        <div className='wrapper'>
          <div className='add_title_bar'>
            <PageHeader
              className="page_header"
              onBack={() => this.props.history.push('/app/productSeries')}
              title=" "
            />
            <p className='page_title'>创建产品系列</p>
          </div>
          <Divider className='add_divider' />
          <div className='productSeries_form'>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
            >
              <Form.Item
                name='groupName'
                label="系列标题"
                autoComplete='off'
                rules={[{ required: true, message: '请输入系列标题名称' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name='groupDescription'
                label="系列描述"
                autoComplete='off'
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name='collection'
                label="集合名称"
                autoComplete='off'
              >
                <Input  />
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

