import React, { Component, useState } from 'react'
import { Table, Input, Button, Space, Tag, Radio, Divider,Tooltip, Popconfirm, Menu, Dropdown, } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditTwoTone, DeleteTwoTone ,DownOutlined} from '@ant-design/icons';
import './index.less'
import history from '../../../components/common/history'

const data = [
    {
      key: '1',
      name: '知识系列',
      tags: ['草稿'],
      age: 32,
      number: '0000',
    },
    {
      key: '2',
      name: '夏季服装系列',
      tags: ['草稿'],
      age: 42,
      number: '0001',
    },
    {
      key: '3',
      name: '生活用品系列',
      tags: ['草稿'],
      age: 32,
      number: '0001',
    },
    {
      key: '4',
      name: '水果蔬菜系列',
      tags: ['草稿'],
      age: 32,
      number: '0003',
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
export default class ManageProducts extends Component {

    state = {
        searchText: '',
        searchedColumn: '',
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
          history.push('/app/addNewProductSeries')
          break
        // case 'edit':
        //   history.push('/app/editContact/' + value)
        //   break
        // case 'renew':
        //   this.setState({contactVisible: true, modal_type:'renew', contract_id: value})
        //   break
        // case 'terminated':
        //   this.setState({contactVisible: true, modal_type:'terminated',contract_id: value})
        //   break
        // case 'canceled':
        //   this.setState({contactVisible: true, modal_type:'canceled', contract_id: value})
        //   break
        // case 'contract_canceled':
        //   this.setState({ contractInfoVisible: true, modal_type: 'canceled', contract_id: value })
        //   break
        // case 'contract_terminated':
        //   this.setState({ contractInfoVisible: true, modal_type: 'terminated', contract_id: value })
        //   break
        default:
          break
      }
    }

    render() {
        const [selectionType, setSelectionType] = ('checkbox');
        const columns = [
            {
              title: '系列名称',
              dataIndex: 'name',
              render: (text) => <a>{text}</a>,
              key: 'name',
              align: 'center',
              ...this.getColumnSearchProps('name'),
            },
            {
                title: '状态',
                key: 'tags',
                dataIndex: 'tags',
                align: 'center',
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
              title: '系列编号',
              dataIndex: 'number',
              render: (text) => <a>{text}</a>,
              key: 'number',
              align: 'center',
              ...this.getColumnSearchProps('number'),
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                  <div>              
									<Tooltip title='编辑产品系列信息'>
										<EditTwoTone style={{ fontSize: '20px', marginRight: '8px' }}
											onClick={() => this.showModal('edit', record)}
										/>
									</Tooltip>
									<Popconfirm
										title='确定删除该产品系列信息?'
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
            <div className='ProductSeries'>
                <span className='pageName'>产品系列</span>
                <div className='btn'>
                <Button type="primary" onClick={e => this.switchPage(e,'add')}
                >添加产品系列</Button>
                <Button >导入</Button>
                <Button type="primary">导出</Button>
                </div>
                <div className='table'>
                    <Divider />
                    <div>
                      <Dropdown overlay={menu} placement="bottomLeft" arrow>
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
