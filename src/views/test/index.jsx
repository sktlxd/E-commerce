import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Model } from '../../dataModule/testBone'

class Test1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='teshk' style={{ overflowX: 'auto', marginTop: 60 }}>
        <div style={{ background: 'red' }}>Test1</div>
        <div className='red'>22222222</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(Test1)
