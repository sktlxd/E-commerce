import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Model } from '../../dataModule/testBone'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  fufu = () => {
  }

  render() {
    return (
      <div style={{ overflowX: 'auto', marginTop: 60 }}>
        <div style={{ background: 'red' }}>111111</div>
        <div></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(Index)
