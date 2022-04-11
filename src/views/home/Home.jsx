// import React, { Component } from 'react'
// import { connect } from 'react-redux'

// class Index extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//     }
//   }

//   render() {
//     return (
//       <div style={{ overflowX: 'auto', marginTop: 60 }}>
//         <div style={{ background: 'red' }}>home</div>
//         <div></div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//     return {
//     }
// }

// export default connect(mapStateToProps, null)(Index)

import React, { useState, useEffect } from 'react'
// import React, { useState } from 'react'

function Home() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default Home
