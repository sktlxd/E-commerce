import React, { Component } from 'react'
import { Modal, Form, Input, Radio} from 'antd';

export default class AddModal extends Component {
  render() {
    const {visble, onCancel} = this.props
    return (
      <div>
            <Modal
                title="Basic Modal"
                visible={visble}
                // onOk={handleOk} 
                onCancel={onCancel}
            >
                <Form
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="modifier" className="collection-create-form_last-form-item">
                        <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        
                    </Form.Item>
                </Form>
            </Modal>
      </div>
    )
  }
}
