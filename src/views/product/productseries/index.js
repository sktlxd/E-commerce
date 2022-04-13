import React, { Component } from 'react'
import Highlighter from 'react-highlight-words';
import { Table, Input, Button, Space, Divider, Tooltip, Popconfirm, Menu, Dropdown, } from 'antd';
import { SearchOutlined, EditTwoTone, DeleteTwoTone, DownOutlined } from '@ant-design/icons';
import { originalUrl, getGourpUrl, deleteGourpUrl } from '../../../dataModule/UrlList';
import EditProductSeriesModal from './editModal';
import history from '../../../components/common/history'
import './index.less'
import axios from 'axios';

const menu = (
  <Menu>
    <Menu.Item key="1">
        删除
    </Menu.Item>
  </Menu>
)

export default class ManageProducts extends Component {

  state = {
    searchText: '',
    searchedColumn: '',
    isloading: false,
    data: [{ groupId: '1', groupName: '知识系列'}],
    selectedRowKeys: [],
    editModalVisible: false,
    productSeriesInfo: null
  }

  componentDidMount() {
    this.getAllGroup()
  }

  getAllGroup = (page = null, size = null) => {
    this.setState({isloading: true})
    const me = this
    let params = {
      page, size
    }
    axios.get(originalUrl+getGourpUrl, params)
    .then((res) => {
      me.setState({data: res.data.result, isloading: false})
      console.log(res)
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
  }

  deleteInfo = (id) => {
    let me = this
    axios.delete(originalUrl+deleteGourpUrl, {data: {id}})
    .then((res) => {
      // console.log(res)
      me.getAllGroup()
    })
  }

  //页面跳转
  switchPage = (value, key) => {
    switch (key) {
      case 'add':
        history.push('/app/addNewProductSeries')
        break
      default:
        break
    }
  }

  showModal = (action, record) => {
    switch (action) {
      case 'edit':
        this.setState({
          productSeriesInfo: record,
          editModalVisible: true
        })
        break;
      default:
        break;
    }
  }

  closeModal = () => {
    this.setState({
      editModalVisible: false
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const {data, isloading, selectedRowKeys, editModalVisible, productSeriesInfo} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0
    const columns = [
      {
        title: '系列编号', dataIndex: 'groupCode', align: 'center',
        ...this.getColumnSearchProps('groupCode'),
      },
      {
        title: '系列名称', dataIndex: 'groupName', align: 'center',
        ...this.getColumnSearchProps('groupName'),
      },
      {
        title: '系列描述', dataIndex: 'groupDescription', align: 'center',
        ...this.getColumnSearchProps('groupDescription'),
      },
      {
        title: '集合名称', dataIndex: 'collection', align: 'center',
        ...this.getColumnSearchProps('groupDescription'),
      },
      {
        title: '操作', key: 'action', align: 'center',
        render: (text, record) => (
          <div>
            <Tooltip title='编辑产品系列信息'>
              <EditTwoTone style={{ fontSize: '20px', marginRight: '8px' }}
                onClick={() => this.showModal('edit', record)}
              />
            </Tooltip>
            <Popconfirm
              title='确定删除该产品系列信息?'
              onConfirm={() => this.deleteInfo(record.groupId)}
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
    ]

    return (
      <div className='ProductSeries'>
        <span className='pageName'>产品系列</span>
        <div className='btn'>
          <Button type="primary" onClick={e => this.switchPage(e, 'add')}
          >添加产品系列</Button>
          <Button >导入</Button>
          <Button type="primary">导出</Button>
        </div>
        <div className='table'>
          <Divider />
          <div>
            <Dropdown overlay={menu} placement="bottomLeft" arrow disabled={!hasSelected}>
              <Button>操作<DownOutlined /></Button>
            </Dropdown>
          </div>
          <Table
            loading={isloading}
            rowSelection={rowSelection}
            rowKey='groupId'
            columns={columns}
            dataSource={data}
          />
        </div>
        <EditProductSeriesModal
          visible={editModalVisible}
          onCancel={this.closeModal}
          productSeriesInfo={productSeriesInfo}
          getAllGroup={this.getAllGroup}
        />
      </div>
    )
  }
}
