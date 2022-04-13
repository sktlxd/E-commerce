import React, { Component, useState } from 'react'
import { Table, Input, Button, Space, Tag, Radio, Divider,Tooltip, Popconfirm, Menu, Dropdown, } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditTwoTone, DeleteTwoTone,DownOutlined } from '@ant-design/icons';
import './clients.less'
import history from '../../components/common/history'

const data = [
    {
      key: '1',
      name: '甲',
      tags: ['草稿'],
      consumptionAmount:1245,
      orderVolume: 32,
      address: '军工路',
    },
    {
      key: '2',
      name: '乙',
      tags: ['草稿'],
      orderVolume: 42,
      consumptionAmount:1245,
      address: '军工路',
    },
    {
      key: '3',
      name: '丙',
      tags: ['草稿'],
      orderVolume: 32,
      consumptionAmount:1245,
      address: '军工路',
    },
    {
      key: '4',
      name: '丁',
      tags: ['草稿'],
      orderVolume: 32,
      consumptionAmount:1245,
      address: '军工路',
    },
  ];
  const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" >
        删除
      </a>
    </Menu.Item>
  </Menu>
);
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
};
export default class Clients extends Component {

    state = {
        searchText: '',
        searchedColumn: '',
        selectedRowKeys: [],
    };
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`输入搜索内容 `}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                重置
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  this.setState({
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                筛选
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    //页面跳转
    switchPage = (value, key) => {
      switch (key) {
        case 'add':
          history.push('/app/addNewClients')
          break
        default:
          break
      }
    }

    render() {
        const {selectionType, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
              title: '客户姓名',
              dataIndex: 'name',
              render: (text) => <a>{text}</a>,
              key: 'name',
              ...this.getColumnSearchProps('name'),
            },
            {
                title: '状态',
                key: 'tags',
                dataIndex: 'tags',
                
                ...this.getColumnSearchProps('tags'),
                render: tags => (
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
                ),
            },
            {
                title: '地点',
                dataIndex: 'address',
                key: 'address',
                
                // ...this.getColumnSearchProps('address'),
                // sorter: (a, b) => a.address.length - b.address.length,
                // sortDirections: ['descend', 'ascend'],
            },
            {
                title: '订单量',
                dataIndex: 'orderVolume',
                key: 'orderVolume',
                
                ...this.getColumnSearchProps('orderVolume'),
            },
            {
                title: '消费金额',
                dataIndex: 'consumptionAmount',
                key: 'consumptionAmount',
                
                ...this.getColumnSearchProps('consumptionAmount'),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <div>              
									<Tooltip title='编辑客户信息'>
										<EditTwoTone style={{ fontSize: '20px', marginRight: '8px' }}
											onClick={() => this.showModal('edit', record)}
										/>
									</Tooltip>
									<Popconfirm
										title='确定删除该客户信息?'
										onConfirm={() => this.deleteInfo(record.key)}
										okText='是'
										cancelText='否'
									>
										<DeleteTwoTone style={{ fontSize: '20px', marginRight: '8px' }}
											twoToneColor='red'
											/>
									</Popconfirm>
								</div>
                ),
              },
          ];
        return (
            <div className='Clients'>
                <span className='pageName'>客户</span>
                <div className='btn'>
                <Button type="primary" onClick={e => this.switchPage(e,'add')}
                >添加客户</Button>
                <Button type="primary">编辑客户</Button>
                </div>
                <div className='table'>
                    <Divider />
                    <div>
                      <Dropdown disabled={!hasSelected} overlay={menu} placement="bottomLeft" arrow>
                        <Button>操作<DownOutlined /></Button>
                      </Dropdown>
                    </div>
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
                
            </div>
        )
    }
}
