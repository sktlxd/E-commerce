import React, {useState, useEffect} from 'react'
import { Modal, Radio, InputNumber, Space} from 'antd'

function FreightModal(props) {
    const {visible, onCancel} = props
    const [value, setValue] = useState(1)

    const onChange = (e) => {
        const {value} = e.target
        console.log(value)
        setValue(value)
    }

    return (
        <div>
            <Modal
                title='添加发货'
                visible={visible}
                onCancel={onCancel}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>免运费</Radio>
                        <Radio value={2}>自定义</Radio>
                    </Space>
                </Radio.Group>
                {
                    value === 2 ? 
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '5px'}}>
                        <div style={{width: '50px'}}>价格:</div>
                        <InputNumber prefix="￥" style={{ width: '50%' }} />
                    </div> : null
                }
            </Modal>
        </div>
    )
}

export default FreightModal
