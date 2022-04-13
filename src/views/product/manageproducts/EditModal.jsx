import React, { Component } from 'react'
import {
  PageHeader, Form, Input, Select,InputNumber,
  DatePicker, Button, Divider, Upload, message,Modal
} from 'antd'

import AddressCascader from '../../../publicComponents/Cascader-address-options'
const { Option } = Select


class EditManageProductInfoModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmLoading: false
        }
    }

    handleOk = () => {
        this.formRef.validateFields().then(value => {
            value['city'] = value.city.join("/")
            value['proprietorId'] = this.props.manageOwnerInfo.proprietorId
            this.props.editMes(value)
        }).catch(errorInfo => {
            console.log(errorInfo)
        })
    }

    render() {
        const { confirmLoading } = this.state
        const { manageProductInfo } = this.props
        if (manageProductInfo === null) return null
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            }
        }

        return (
            <div>
                <Modal
                    title='编辑业主信息'
                    width={600}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.props.cancel}
                    destroyOnClose={true}
                >
                    <div>
                        <Form
                            {...formItemLayout}
                            name='tenantInfo'
                            ref={ref => this.formRef = ref}
                            scrollToFirstError={true}
                        >
                            <Form.Item
                                name='productName'
                                label='产品名称'
                                rules={[{ required: true, message: '请输入产品名称' }]}
                                initialValue={manageProductInfo.proprietorName}
                            >
                                <Input autoComplete='off'/>
                            </Form.Item>
                            <Form.Item
                                name='serviceType'
                                label='状态'
                                rules={[{ required: true, message: '请选择状态'}]}
                                initialValue={manageProductInfo.serviceType}
                            >
                                <Select
                                    style={{ width: 368 }}
                                    showSearch
                                    allowClear
                                    placeholder='状态'
                                    optionFilterProp='children'
                                >
                                    <Option value='0'>草稿</Option>
                                    <Option value='1'>断货</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['user', 'quantity']} label="产品数量" rules={[{ type: 'number', min: 0, max: 99 }]}>
                              <InputNumber />
                            </Form.Item>
                            <Form.Item name={['user', 'numbering']} label="产品编号" rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'manufacturer']} label="厂商" rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                            <Form.Item name={['user', 'price']} label="产品价格" rules={[{ type: 'number', min: 0, max: 99 }]}>
                              <InputNumber />
                            </Form.Item>
                            
                            <Form.Item
                                name='serviceType'
                                label='类别'
                                rules={[{ required: true, message: '请选择所属类别'}]}
                                initialValue={manageProductInfo.serviceType}
                            >
                                <Select
                                    style={{ width: 368 }}
                                    showSearch
                                    allowClear
                                    placeholder='类别'
                                    optionFilterProp='children'
                                >
                                    <Option value='0'>草稿</Option>
                                    <Option value='1'>断货</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default (EditManageProductInfoModal)
