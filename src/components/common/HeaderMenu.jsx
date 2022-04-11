import React, { Component } from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { getUserName } from '../../publicFunction'
import history from './history'
import { actionCreators as commonAction } from './store'

const { SubMenu } = Menu

class HeaderMenu extends Component {
  state = {
    current: 'mail',
    selectedKeys: [],
    fatherKey: ''
  }

  componentDidMount() {
    this.setSelectedKeys()
    this.getMenu()
    this.setState({
      selectedKeys: [],
      fatherKey: ''
    })
  }

  setSelectedKeys = () => {
    // this.setState({
    //   selectedKeys: [],
    //   fatherKey: ''
    // })
    const { routers } = this.props
    const locationUrl = window.location.pathname
    let fatherKey = ''
    for (const i of routers) {
      if (i.key === locationUrl) {
        break
      } else if (i.child.length !== 0) {
        for (const x of i.child) {
          if (x.key === locationUrl) {
            fatherKey = i.key
            break
          }
        }
      }
    }
    this.setState({
      selectedKeys: [locationUrl],
      fatherKey
    })
  }

  // handleClick = (link) => {
  //   if (link.length !== 0) {
  //     history.push(link)
  //     this.setSelectedKeys()
  //     document.documentElement.scrollTop = 0
  //   }
  // }

  handleClick = (item) => {
    if (item.link.length !== 0) {
      history.push(item.link)
      this.setSelectedKeys()
      document.documentElement.scrollTop = 0
    }
  }

  getMenu = () => {
    const { routers } = this.props
    const menu = []
    for (const i of routers) {
      if (i.child.length !== 0) {
        menu.push(
          <SubMenu key={i.key} title={i.title} onTitleClick={() => { this.setState({ selectedKeys: [], fatherKey: i.key }) }}>
            { i.child.map(item => <Menu.Item key={item.key} onClick={() => this.handleClick(item)}>{item.title}</Menu.Item>) }
          </SubMenu>
        )
      } else {
        menu.push(
          <Menu.Item key={i.key} title={i.title} onClick={() => this.handleClick(i)}>{i.title}</Menu.Item>
        )
      }
    }
    return menu
  }

  isTabSelected = () => {
    if (this.props.isTabSelect) {
      const { selectedKeys, fatherKey } = this.props
      return { selectedKeys: selectedKeys, openKeys: [fatherKey] }
    } else {
      const { selectedKeys, fatherKey } = this.state
      return { selectedKeys: selectedKeys, openKeys: [fatherKey] }
    }
  }

  render() {
    // const menuSet = this.isTabSelected()

    return (
      <Menu

        mode='horizontal'
        // style={{ height: 'calc(100% - 3rem)', marginTop: '3rem', fontWeight: 1000, position: 'fixed', width: 200 }}
        // {...menuSet}
      >
        { this.getMenu() }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routers: state.get('commonReducer').get('routers').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchBreadcrumbList(data) {
      dispatch(commonAction.dispatchBreadcrumbList(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
