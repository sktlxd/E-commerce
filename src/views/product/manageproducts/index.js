import React, { Component,  } from 'react'
import { Table, Input, Button, Space, Tag, Radio, Divider,Tooltip, Popconfirm, Menu, Dropdown, } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditTwoTone, DeleteTwoTone ,DownOutlined} from '@ant-design/icons';
import './index.less'
import history from '../../../components/common/history'
import EditManageProductModal from './EditModal';
import axios from 'axios'

import {
	originalUrl,
	getAllProductUrl,
	
} from '../../../dataModule/UrlList'


 
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
        selectedRowKeys: [],
        editModalVisible: false,
        manageProductInfo:null,
        data : [
            //  {
            //    materialId: '1',
            //    materialName: 'python',
            //    materialStatus: ['草稿'],
            //    inventory: 32,
            //    materialCode: '0000',
            //    manufacturer:'众创空间',
            //    materialCategoryId:'编程语言'
            //  },
             
        ]
      };
    onSelectChange = selectedRowKeys => {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    };
    componentDidMount = () =>{
      const me=this;
      axios.get(originalUrl + getAllProductUrl).then( res=>{
         console.log(res.data)
         me.setState({
             data:res.data.result
         })
      }).catch(err => {
			console.log(err)
		})	

    };
    showModal = (action, record) => {
    switch (action) {
			case 'edit':
				this.setState({
					editModalVisible: true,
					manageProductInfo: record
				})
				break
			default:
				break
    }
	}

	closeModal = () => {
		this.setState({
			editModalVisible: false
		})
	}
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
    switchPinventory = (value, key) => {
      switch (key) {
        case 'add':
          history.push('/app/addNewProducts')
          break
        // case 'renew':
        //   this.setState({contactVisible: true, modal_type:'renew', contract_id: value})
        //   break
        
        default:
          break
      }
    }

    render() {
        const {selectionType, selectedRowKeys,editModalVisible,manageProductInfo,data} = this.state;
        const rowSelection = {
             selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
              title: '产品',
              dataIndex: 'materialName',
              render: (text) => <a>{text}</a>,
              key: 'materialName',
              align: 'center',
              ...this.getColumnSearchProps('materialName'),
            },
            {
                title: '状态',
                key: 'materialStatus',
                dataIndex: 'materialStatus',
                align: 'center',
                ...this.getColumnSearchProps('materialStatus'),
                render: tags => (
                  <>
                    {tags.map(tag => {
                      let color = tag.length > 5 ? 'geekblue' : 'green';
                      if (tag === '缺货') {
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
              title: '库存',
              dataIndex: 'inventory',
              key: 'inventory',
              align: 'center',
              ...this.getColumnSearchProps('inventory'),
            },
            {
              title: '产品编号',
              dataIndex: 'materialCode',
              key: 'materialCode',
              align: 'center',
              ...this.getColumnSearchProps('materialCode'),
              // sorter: (a, b) => a.number.length - b.number.length,
              // sortDirections: ['descend', 'ascend'],
            },
            {
              title: '厂商',
              dataIndex: 'manufacturer',
              key: 'manufacturer',
              align: 'center',
              ...this.getColumnSearchProps('manufacturer'),
            },
            {
              title: '类型',
              dataIndex: 'materialCategoryId',
              key: 'materialCategoryId',
              align: 'center',
              ...this.getColumnSearchProps('materialCategoryId'),
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                  <div>              
									<Tooltip title='编辑产品信息'>
										<EditTwoTone style={{ fontSize: '20px', marginRight: '8px' }}
											onClick={() => this.showModal('edit', record)}
										/>
									</Tooltip>
									<Popconfirm
										title='确定删除该产品信息?'
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
            <div className='ManageProducts'>
                <span className='pageName'>管理产品</span>
                <div className='btn'>
                <Button type="primary" onClick={e => this.switchPinventory(e,'add')}
                >添加产品</Button>
                <Button >导入</Button>
                <Button type="primary">导出</Button>
                </div>
                <div className='table'>
                    <Divider />
                    <div>
                      <Dropdown disabled={!hasSelected} overlay={menu} placement="bottomLeft" arrow>
                        <Button >操作<DownOutlined /></Button>
                      </Dropdown>
                    </div>
                    <Table
                        // rowKey={data => data.materialId}
                        rowKey="materialId"
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                          }}
                        columns={columns}
                        dataSource={data}
                    />
                </div>
                <div> 
			        		<EditManageProductModal
			        			visible={editModalVisible}
			        			cancel={this.closeModal}
			        			manageProductInfo={manageProductInfo}
			        			// editMes={this.editProprietorMes}
			        		/>
			        	</div>
                
            </div>
        )
    }
}
