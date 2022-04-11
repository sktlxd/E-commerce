import React, { Component } from 'react'
import { Table } from 'antd'
import './style/productTable.less'

class ProductTable extends Component {
  render() {
    const { data, columns, isLoading, rowSelection } = this.props
    return (
      <div className='productTable'>
        <Table
          dataSource={ data }
          columns={ columns }
          loading={ isLoading }
          pagination={false}
          size='middle'
          rowSelection={rowSelection === undefined ? null : rowSelection}
        />
      </div>
    )
  }
}

export default ProductTable
