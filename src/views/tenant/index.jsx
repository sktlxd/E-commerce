import React, { Component } from 'react'
import Add from './component/Add'
import './index.less'

export default class Tenant extends Component {
  render() {
    return (
      <div className='title'>
          <Add/>
          <div className='red'>hognse</div>
      </div>
    )
  }
}
