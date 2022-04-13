import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { getCookie, setCookie } from '../../helpers/cookies'
import store from '../../store'
import { Provider } from 'react-redux'
import { actionCreators as commonAction } from './store'
import { flattenArrays } from '../../publicFunction'

import SideMenu from './SideMenu'

import CreateDraftOrder from '../../views/order/draftOrder/createDraftOrder'
import EditDraftOrder from '../../views/order/draftOrder/editDraftOrder'
//导入跳转页面
import AddNewProducts from '../../views/product/manageproducts/addNewProducts'
import AddNewproductSeries from '../../views/product/productseries/addNewProductSeries'
import AddNewClients from '../../views/clients/addNewClients'

// import HeaderMenu from './HeaderMenu'
import HeaderCustom from './HeaderCustom'
import Index from '../index/index'
import noMatch from './404'
import '../../style/index.less'



const { Content, Footer, Sider } = Layout
class App extends Component {
  state = {
    collapsed: getCookie('mspa_SiderCollapsed') === 'true'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    }, function() {
      setCookie('mspa_SiderCollapsed', this.state.collapsed)
    })
  };

  componentDidMount() {
    if (getCookie('mspa_SiderCollapsed') === null) {
      setCookie('mspa_SiderCollapsed', false)
    }
    commonAction.getAllBillTypes()
  }

  render() {
    const { collapsed } = this.state
    // const { location } = this.props
    let name
    if (!getCookie('mspa_user') || getCookie('mspa_user') === 'undefined') {
      return <Redirect to='/login' />
    } else {
      name = JSON.parse(getCookie('mspa_user')).username
    }

    let routers = store.getState().get('commonReducer').get('routers').toJS()
    routers = flattenArrays(routers, 'child')
    // console.log(routers)
    // const breadcrumbList = getBreadFromLocation(routers, location.pathname)

    return (
      <Layout>
        <Provider store={store}>
          <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />
          {/* <Header className='header-style2'>
            <HeaderMenu/>
          </Header> */}
          <Content>
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <SideMenu />
              </Sider>
              <Layout style={{ padding: '0 0', background: '#F6F6F7' }}>
              <Breadcrumb style={{ margin: '3.4rem 2rem 0' }}>
                {/* { breadcrumbList?.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>) } */}
              </Breadcrumb>
              <Content style={{ padding: '0 32px', minHeight: 'calc(100vh)' }}>
                <Switch>
                  <Route exact path={'/app'} component={ (props) => <Index { ...props }/> } />
                  <Route exact path={'/app/createDraftOrder'} component={ (props) => <CreateDraftOrder { ...props }/> } />
                  <Route exact path={'/app/editDraftOrder/:id'} component={ (props) => <EditDraftOrder { ...props }/> } />
                    {/* 产品 */}
                    <Route path={'/app/addNewProducts'}  component={(props) => <AddNewProducts {...props} />} />
                    <Route path={'/app/addNewProductSeries'}  component={(props) => <AddNewproductSeries {...props} />} />
                    <Route path={'/app/addNewClients'}  component={(props) => <AddNewClients {...props} />} />
                    {/* <Route path={'/app/editContact/:contractId'} exact component={(props) => <EditContact {...props} />} />
                  <Route path={'/app/renewContact/:contractId'} exact component={(props) => <RenewContact {...props} />} />
                  <Route path={'/app/terminatedContact/:contractId'} exact component={(props) => <TerminatedContact {...props} />} />
                  <Route path={'/app/canceledContact/:contractId'} exact component={(props) => <CanceledContact {...props} />} /> */}
                  { routers.map(item => item.routerDom) }
                  <Route component={noMatch} />
                </Switch>
              </Content>
              </Layout>
            </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', backgroundColor: '#778899', color: 'white', marginLeft: 200}}>
            <span style={{ display: 'block' }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
            <span style={{ display: 'block' }}>联系电话：12345</span>
            <span style={{ display: 'block' }}>邮箱：12345@qq.com</span>
          </Footer>
        </Provider>
      </Layout>
    )
  }
}

export default withRouter(App)
