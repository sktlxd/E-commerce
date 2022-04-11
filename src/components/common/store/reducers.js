import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import Test1 from '../../../views/test'
import Product from '../../../views/product'
import Clients from '../../../views/clients/clients'
import ManageProducts from '../../../views/product/manageproducts'
import Inventory from '../../../views/product/inventory'
import ProductSeries from '../../../views/product/productseries'
import Tenant from '../../../views/tenant'
import * as constants from './constants'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  routers: [
     {
      routerDom: <Route key={'/app/record'} path={'/app/record'} component={ (props) => <Test1 { ...props }/> } />,
      link: '/app/record',
      title: '主页',
      key: '/app/record',
      child: []
     },
     {
      routerDom: null,
      link: '',
      title: '订单',
      key: 'app2',
      child: [
         {
           routerDom: <Route key={'/app/type_management'} path={'/app/type_management'} component={ (props) => <Index { ...props }/> } />,
           link: '/app/type_management',
           title: '支出类型管理',
           key: '/app/type_management',
           child: []
         },
         {
           routerDom: <Route key={'/app/test'} path={'/app/test'} component={ (props) => <Tenant { ...props }/> } />,
           link: '/app/test',
           title: 'test',
           key: '/app/test',
           child: []
         }
      ]
     }, 
     {
      routerDom: <Route key={'/app/Product'} path={'/app/Product'} component={ (props) => <Product { ...props }/> } />,
      link: '/app/Product',
      title: '产品',
      key: '/app/Product',
      child: [
         {
           routerDom: <Route key={'/app/ManageProducts'} path={'/app/ManageProducts'} component={ (props) => <ManageProducts { ...props }/> } />,
           link: '/app/ManageProducts',
           title: '管理产品',
           key: '/app/ManageProducts',
           child: []
         },
         {
           routerDom: <Route key={'/app/Inventory'} path={'/app/Inventory'} component={ (props) => <Inventory { ...props }/> } />,
           link: '/app/Inventory',
           title: '库存',
           key: '/app/Inventory',
           child: []
         },
         {
          routerDom: <Route key={'/app/ProductSeries'} path={'/app/ProductSeries'} component={ (props) => <ProductSeries { ...props }/> } />,
          link: '/app/ProductSeries',
          title: '产品系列',
          key: '/app/ProductSeries',
          child: []
        }
      ]
    },
    {
      routerDom: <Route key={'/app/Clients'} path={'/app/Clients'} component={ (props) => <Clients { ...props }/> } />,
      link: '/app/Clients',
      title: '客户',
      key: '/app/Clients',
      child: []
     },
  ]
})

const calculate = (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    default:
      return state
  }
}

export default calculate
