import React, { Component, useState } from 'react'
import { Table, Input, Button, Space, Tag, Radio, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'

const data = [
    {
      key: '1',
      name: 'python',
      tags: ['草稿'],
      age: 32,
      address: '0000',
    },
    {
      key: '2',
      name: 'java',
      tags: ['草稿'],
      age: 42,
      address: '0001',
    },
    {
      key: '3',
      name: '前端',
      tags: ['草稿'],
      age: 32,
      address: '0001',
    },
    {
      key: '4',
      name: 'react',
      tags: ['草稿'],
      age: 32,
      address: '0003',
    },
  ];
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
export default class Inventory extends Component {

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
              placeholder={`输入搜索内容`}
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

    render() {
        const [selectionType, setSelectionType] = ('checkbox');
        const columns = [
            {
              title: '产品',
              dataIndex: 'name',
              render: (text) => <a>{text}</a>,
              key: 'name',
              width: '20%',
              ...this.getColumnSearchProps('name'),
            },
            {
                title: '状态',
                key: 'tags',
                dataIndex: 'tags',
                width: '20%',
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
              title: '数量',
              dataIndex: 'age',
              key: 'age',
              width: '20%',
              ...this.getColumnSearchProps('age'),
            },
            {
              title: 'SKU',
              dataIndex: 'address',
              key: 'address',
              ...this.getColumnSearchProps('address'),
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
            },
            {
                title: '厂商',
                key: 'action',
                render: (text, record) => (
                  <Space size="middle">
                    <a> {record.name}</a>
                    <a>删除</a>
                    <span>123</span>
                  </Space>
                ),
              },
          ];
        return (
            <div className='Inventory'>
                <span className='pageName'>库存</span>
                <div className='btn'>
                <Button type="primary">查看产品</Button>
                <Button type="primary">编辑产品</Button>
                <Button type="primary">其他操作</Button>
                </div>
                <div className='table'>
                    <Divider />
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
