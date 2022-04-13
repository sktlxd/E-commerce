import React, { Component } from 'react'
import { PageHeader, Divider, Input, Button, Tree, message } from 'antd'
import './index.less'
const { Search } = Input;

export default  class ProductType extends Component {
    state = {
        expandedKeys: ['1', ],
        checkedKeys: ['2'],
        selectedKeys:[],
        autoExpandParent: true,
        typeData:[
           {
               title: '1',
               key: '1',
               children:[
                   {
                     title: '2',
                     key: '2', 
                     children:[
                         {
                             title: '3',
                              key: '3',
                         } 
                     ] 
                   }
               ]
           }
        ],
    };
    onExpand = expandedKeys => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
    }
    onCheck = checkedKeysValue => {
        // console.log('onCheck', checkedKeysValue);
        this.setState({
          checkedKeys: checkedKeysValue
        });
    }
    onSelect = selectedKeysValue => {
        // console.log('onCheck', checkedKeysValue);
        this.setState({
          selectedKeys: selectedKeysValue
        });
    }
  
    render() {
        const {expandedKeys, checkedKeys,selectedKeys,autoExpandParent,onCheck,onExpand,typeData} = this.state;
        return(
            <div className='ManageProducts'>
                <span className='pageName'>产品类别</span>
                <div className='btn'>
                <Button type="primary" onClick={e => this.switchPinventory(e,'add')}
                >添加产品类别</Button>
                <Button >导入</Button>
                <Button type="primary">导出</Button>
                </div>
                <div className='table'>
                    <Divider />
                    <Tree
                      checkable
                      expandedKeys={expandedKeys}
                      onExpand={this.onExpand}
                      autoExpandParent={autoExpandParent}
                      onCheck={this.onCheck}
                      onSelect={this.onSelect}
                      checkedKeys={checkedKeys}
                      selectedKeys={selectedKeys}
                      treeData={typeData}
                    />
                </div>
                
            </div>
        )
    }
}