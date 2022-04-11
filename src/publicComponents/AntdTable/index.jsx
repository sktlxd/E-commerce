import React, { Component } from 'react'
import { Table, Pagination } from 'antd'

/*
传入的参数说明：
data: 表格数据
columns: 第一行各列标题
isLoading: 表格是否载入中
currentPage: 现在所处的页数
size: 每页表格的数量
total：表格所有数据总数
changePageOrSize: 改变页数或size时触发
changeSize: 改变每页表格显示的数目的函数
changePage： 改变页数的函数
rowSelection: 可选行
控制是否开启分页器 isPagination true为开启分页器
*/

class AntdTable extends Component {
    render() {
      const { data, columns, isLoading, currentPage, total, size, rowSelection, changePageOrSize,  isPagination} = this.props
      const isPage = isPagination === undefined ? true : isPagination
      
        return (
            <div
                style={{
                    width: '100%',
                    position: 'relative',
                    marginBottom: '30px'
                }}
            >
            <Table
              style={{
                overflow: 'hidden',
                width: '100%',
                wordBreak: 'keep-all',
                whiteSpace: 'nowrap',
                fontSize: '5px'
              }}
              dataSource={ data }
              columns={ columns }
              bordered
              pagination={!isPage}
              size='middle'
              loading={ isLoading }
              rowSelection={rowSelection === undefined ? null : rowSelection}
            />
            {
              isPage ?
             <div style={{ marginTop: 15, position: 'absolute', right: '0%' }}>
              <Pagination
                size='small'
                current={ currentPage }
                total={ total === undefined ? 0 : total }
                showQuickJumper
                style={{ marginRight: 0 }}
                showSizeChanger
                pageSize={size === undefined ? 10 : size}
                pageSizeOptions={[10, 20, 30, 40]}
                onChange={ changePageOrSize === undefined ? () => {} : (page, size) => changePageOrSize(page, size) }
              />
             </div>
             : null
            }
          </div>
        )
    }
}
export default AntdTable
