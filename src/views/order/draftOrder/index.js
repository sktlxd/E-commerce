import React, { Component } from 'react'
import { Button, Divider, Input, Select, DatePicker, Menu, Dropdown, message, Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import history from '../../../components/common/history'
import AntdTable from '../../../publicComponents/AntdTable/index'
import './index.less'

const { Option } = Select
const { RangePicker } = DatePicker
class DraftOrder extends Component {

    state = {
        columns: [
            { title: '草稿订单单号', dataIndex: 'order_code', align: 'center', width: '10%' },
            { title: '日期', dataIndex: 'date', align: 'center', width: '15%' },
            { title: '客户', dataIndex: 'customer_comments', align: 'center' },
            { title: '状态', dataIndex: 'order_status', align: 'center', width: '15%', 
                render: text => (
                    <>
                        <Tag color={text === '已付款' ? 'green' : 'volcano'}>
                            {text}
                        </Tag>
                    </>
                )
            },
            { title: '总计', dataIndex: 'order_total_price', align: 'center', width: '15%' },
            {
              title: '操作', dataIndex: 'action', align: 'center', width: "10%",
              render: (text, record) => {
                  return (
                    <Button type='primary' size='small' onClick={() => history.push(`/app/editDraftOrder/${record.key}`)}>编辑订单</Button>
                  )
              }
            }
        ],
        tableData: [
            {key: '01', order_code: 1, date: '3月24日 下午01:51', customer_comments: '-', order_status: '已付款', order_total_price: '￥300,000.00'},
            {key: '02', order_code: 2, date: '3月24日 下午01:51', customer_comments: '-', order_status: '取消交易', order_total_price: '￥300,000.00'},
            {key: '03', order_code: 3, date: '3月24日 下午01:51', customer_comments: '-', order_status: '未付款', order_total_price: '￥300,000.00'},
        ],
        selectedRowKeys: [],
        searchOrderCode: null,
        searchCustomerName: null,
        searchOrderStatus: null,
        modified_date: null,
        created_date: null,
        resetDate: null,
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    onChange = (value, name) => {
        this.setState({[name]: value})
    }

    searchInfo = () => {
        const {resetDate, searchOrderCode, searchCustomerName, searchOrderStatus, modified_date, created_date} = this.state
        console.log(resetDate, searchOrderCode, searchCustomerName, searchOrderStatus, modified_date, created_date)
    }

    handleReset = () => {
        this.setState({
            searchOrderCode: null,
            searchCustomerName: null,
            searchOrderStatus: null,
            resetDate: new Date(),
        })
    }

    handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                message.info('触发 删除草稿订单操作')
                break
            case '2':
                message.info('触发 添加标记')
                break
            case '3':
                message.info('触发 删除标记')
                break
            default:
                break
        }
    }

    render() {
        const {columns, selectedRowKeys, tableData, resetDate, searchOrderCode, searchCustomerName, searchOrderStatus } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const hasSelected = selectedRowKeys.length > 0
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1" >
                删除草稿订单
              </Menu.Item>
              <Menu.Item key="2" >
                添加标记
              </Menu.Item>
              <Menu.Item key="3" >
                删除标记
              </Menu.Item>
            </Menu>
        )

        return (
            <div className='draftOrder'>
                <div className='header'>
                    <div className='title'>
                        草稿
                    </div>
                    <div>
                        <Button style={{ marginRight: '30px' }}>导出</Button>
                        <Button type='primary' onClick={() => history.push('/app/createDraftOrder')}>创建订单</Button>
                    </div>
                </div>
                <Divider />
                <div className='func'>
                    <div className='clearfix'>
                        <div style={{ float: 'left', marginLeft: '20px' }} >
                            <Input name='searchOrderCode' value={searchOrderCode} placeholder='草稿订单编号' allowClear onChange={e => this.onChange(e.target.value, 'searchOrderCode')} />
                        </div>
                        <div className='inputWrapper' >
                            <Input name='searchCustomerName' value={searchCustomerName} placeholder='客户名称' allowClear onChange={e => this.onChange(e.target.value, 'searchCustomerName')} />
                        </div>
                        <div className='inputWrapper' >
                            <Select
                                name='searchOrderStatus'
                                style={{ width: '200px' }}
                                placeholder='订单状态'
                                value={searchOrderStatus}
                                onChange={e => this.onChange(e, 'searchOrderStatus')}
                            >
                                <Option value="0">未结</Option>
                                <Option value="1">已发送发票</Option>
                                <Option value="2">已完成</Option>
                            </Select>
                        </div>
                    </div>
                    <div className='clearfix'>
                        <div style={{ float: 'left', marginLeft: '20px', marginTop: '15px' }} >
                            <RangePicker
                                key={resetDate}
                                placeholder={['更新的开始日期', '更新的结束日期']}
                                style={{ width: '425px' }}
                                onChange={(date, dateStr) => this.onChange(dateStr, 'modified_date')}
                            />
                        </div>
                        <div className='inputWrapper' style={{ marginTop: '15px' }} >
                            <RangePicker
                                key={resetDate}
                                placeholder={['创建的开始日期', '创建的结束日期']}
                                style={{ width: '425px' }}
                                onChange={(date, dateStr) => this.onChange(dateStr, 'created_date')}
                            />
                        </div>
                    </div>
                    <Divider style={{ margin: '15px 0' }} />
                    <div className='buttonList' >
                        <Button className='button' type='primary' onClick={this.searchInfo} >搜索</Button>
                        <Button className='button' onClick={this.handleReset}>重置</Button>
                    </div>
                </div>
                <div className='table'>
                    <div style={{marginBottom: '5px'}} className='tableHandle'>
                        <Dropdown overlay={menu} disabled={!hasSelected}>
                            <Button>
                                操作 <DownOutlined />
                            </Button>
                        </Dropdown>
                        <span style={{ marginLeft: 8, fontSize: '15px' }} className='spanName' >
                            {hasSelected ? `已经选择${selectedRowKeys.length}件` : ''}
                        </span>
                    </div>
                    <AntdTable
                        columns={columns}
                        rowSelection={rowSelection}
                        data={tableData}
                    />
                </div>
            </div>
        )
    }
}

export default DraftOrder
