import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { PageHeader, Input, Button, Image, InputNumber, Divider, Descriptions } from 'antd'
import ProductTable from '../../publicComponents/ProductTable'
import SelectProductModal from './addModal'
import FreightModal from './FreightModal'
import './style/index.less'

class CreateDraftOrder extends Component {

    state = {
        columns: [
            { title: '产品', dataIndex: 'product', align: 'left', width: '60%',
                render: (record, text) => {
                    return (
                        <div className='product-item'>
                            <div className='image'>
                                <Image
                                width={38}
                                height={38}
                                fallback="data:image/png;base64,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"
                                src="error"/>
                            </div>
                            <div>
                                <div>python</div>
                                <div style={{color: '#6D7175'}}>SKU</div>
                                <span>￥10</span>
                            </div>
                        </div>
                    )
                } 
            },
            { title: '数量', dataIndex: 'num', align: 'center', width: '15%',
            render: (text, record) => {
                console.log(text)
                return (
                    <InputNumber defaultValue={parseInt(text)} />
                )
            }
        },
            { title: '总计', dataIndex: 'total', align: 'center', width: '15%' },
            { title: '操作', dataIndex: 'total', align: 'center',
                render: (text, record) => {
                    return (
                        <Button type='danger' size='small'>删除</Button>
                    )
                }
            },
        ],
        tableData: [
            {key: '001', product: 'python', num: '2', total: '￥20'},
            {key: '002', product: 'python', num: '2', total: '￥20'},
        ],
        isloading: false,
        addModalVisible: false,
        freightModalVisible: false
    }

    showModal = (key) => {
        switch (key) {
            case 'add':
                this.setState({addModalVisible: true})
                break;
            case 'freight':
                this.setState({freightModalVisible: true})
                break;
            default:
                break;
        }
    }

    closeModal = () => {
        this.setState({
            addModalVisible: false,
            freightModalVisible: false
        })
    }

    render() {
        const {columns, tableData} = this.state
        const {addModalVisible, freightModalVisible} = this.state
        return (
            <div className='createDraft-frame'>
                <div className='createDraft-content'>
                    <div className='page-header'>
                        <PageHeader
                            className='ant-page-header'
                            onBack={() => window.history.back()}
                            title="创建订单"
                        />
                    </div>
                    <div>
                        <div className='page-body'>
                            <div className='body-left'>
                                <div className='left-Item'>
                                    <div className='item-title'>产品</div>
                                    <div className='item-content'>
                                        <Input placeholder="搜索产品" size="large" prefix={<SearchOutlined />}/>
                                        <Button size='large' style={{marginLeft: '5px'}} onClick={() => this.showModal('add')}>浏览</Button>
                                    </div>
                                    <div className='item-table'>
                                        <ProductTable
                                            columns={columns}
                                            data={tableData}
                                        />
                                    </div>
                                </div>
                                <div className='left-Item'>
                                    <div className='item-title'>付款</div>
                                    <div className='item-lists'>
                                        <div className='item-list'>
                                            <div className='part1'>小计</div>
                                            <div className='part3'>￥0.00</div>
                                        </div>
                                        <div className='item-list'>
                                            <div className='part1'>
                                                <Button type="link" style={{padding: '0px 0px'}}>添加折扣</Button>
                                            </div>
                                            <div className='part2'>——</div>
                                            <div className='part3'>￥0.00</div>
                                        </div>
                                        <div className='item-list'>
                                            <div className='part1'>
                                                <Button type="link" style={{padding: '0px 0px'}} onClick={() => this.showModal('freight')}>添加发货</Button>
                                            </div>
                                            <div className='part2'>——</div>
                                            <div className='part3'>￥0.00</div>
                                        </div>
                                        <div className='item-list'>
                                            <div className='part1'>
                                                <Button type="link" style={{padding: '0px 0px'}}>税费</Button>
                                            </div>
                                            <div className='part2'>——</div>
                                            <div className='part3'>￥0.00</div>
                                        </div>
                                        <div className='item-list' style={{fontWeight: '600'}}>
                                            <div className='part1'>
                                                总计
                                            </div>
                                            <div className='part3'>￥0.00</div>
                                        </div>
                                        <Divider style={{margin: '15px 0px'}}/>
                                        {/* <div>添加产品以计算总额并查看支付选项。</div> */}
                                        <div className='item-footer'>
                                            <div className='btn'>
                                                <Button size='large'>发送发票</Button>
                                            </div>
                                            <div className='btn'>
                                                <Button type='primary' size='large'>收款</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='body-right'>
                                <div className='right-Item'>
                                    <div className='item-title'>客户</div>
                                    <div className='item-content'>
                                        <Input placeholder="搜索客户" size="large" prefix={<SearchOutlined />} />
                                    </div>
                                    <div className='clientInfo'>
                                        <Descriptions column={1} bordered size='small'>
                                            <Descriptions.Item label="用户名称">sxy</Descriptions.Item>
                                            <Descriptions.Item label="联系信息">1810000000</Descriptions.Item>
                                            <Descriptions.Item label="收货地址">未提供收货地址</Descriptions.Item>
                                            <Descriptions.Item label="账单地址">
                                                未提供账单地址
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='page-footer'>
                        <Button type='primary' size='large' style={{marginLeft: '15px'}} >保存</Button>
                        <Button size='large' danger >放弃</Button>
                    </div>
                </div>
                <SelectProductModal
                    visible={addModalVisible}
                    onCancel={this.closeModal}
                />
                <FreightModal
                    visible={freightModalVisible}
                    onCancel={this.closeModal}
                />
            </div>
        )
    }
}

export default CreateDraftOrder
