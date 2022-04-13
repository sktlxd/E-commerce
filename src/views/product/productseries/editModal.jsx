import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { originalUrl, editGourpUrl} from '../../../dataModule/UrlList'
import axios from 'axios'

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    }
}

function EditProductSeriesModal(props) {
    const [form] = Form.useForm()
    const { visible, onCancel, productSeriesInfo, getAllGroup } = props

    const handleOK = () => {
        form.validateFields().then(value => {
            value['groupCode'] = productSeriesInfo.groupCode
            value['groupId'] = productSeriesInfo.groupId
            editGourp(value)
        }).catch(errorInfo => {
            console.log(errorInfo)
        })
    }

    const editGourp = (values) => {
        axios.post(originalUrl+editGourpUrl, values)
        .then((res) => {
            getAllGroup()
            onCancel()
        }).catch(() => {
            message.error('修改失败，请重试!')
        })
    }

    if (productSeriesInfo === null ) return null
    return (
        <Modal
            visible={visible}
            title='编辑产品系列信息'
            okText="保存"
            onCancel={onCancel}
            onOk={handleOK}
            width={600}
            destroyOnClose={true}
        >
            <Form
                {...formItemLayout}
                form={form}
                name='editProductSeries'
                preserve={false}
            >
                <Form.Item
                    name='groupName'
                    label="系列标题"
                    autoComplete='off'
                    rules={[{ required: true, message: '请输入系列标题名称' }]}
                    initialValue={productSeriesInfo.groupName}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='groupDescription'
                    label="系列描述"
                    autoComplete='off'
                    initialValue={productSeriesInfo.groupDescription}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name='collection'
                    label="集合名称"
                    autoComplete='off'
                    initialValue={productSeriesInfo.collection}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditProductSeriesModal