import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';


export default class Product extends Component {
    state = {
        columns : [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Tags',
              key: 'tags',
              dataIndex: 'tags',
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
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <a>Invite {record.name}</a>
                  <a>Delete</a>
                  <span>123</span>
                </Space>
              ),
            },
          ],
          
           data :[
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ]

    }
    render() {
        const {columns, data} = this.state
        return (
            <div className='material'>
                {/* <div className='title'>标题</div>
                <div className='searchBox'>
                    <Input style={{ width: 200 }} />
                    <Button type='primary' onClick={this.showModal}>添加物料</Button>
                </div>
                <Divider /> */}
                <div className='table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </div>
                
            </div>
        )
    }
 
}   



