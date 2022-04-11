import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import SaleOrder from '../../../views/order/saleOrder'
import DraftOrder from '../../../views/order/draftOrder'
import AbandonedOrder from '../../../views/order/abandonedOrder'
import Product from '../../../views/product'
import Clients from '../../../views/clients/clients'
import ManageProducts from '../../../views/product/manageproducts'
import Inventory from '../../../views/product/inventory'
import ProductSeries from '../../../views/product/productseries'
import * as constants from './constants'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  routers: [
     {
      routerDom: <Route key={'/app/record'} path={'/app/record'} component={ (props) => <Index { ...props }/> } />,
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
          routerDom: <Route key={'/app/saleOrder'} path={'/app/saleOrder'} component={(props) => <SaleOrder {...props} />} />,
          link: '/app/saleOrder',
          title: '订单',
          key: '/app/saleOrder',
          child: []
        }, {
          routerDom: <Route key={'/app/draftOrder'} path={'/app/draftOrder'} component={(props) => <DraftOrder {...props} />} />,
          link: '/app/draftOrder',
          title: '草稿订单',
          key: '/app/draftOrder',
          child: []
        }, {
          routerDom: <Route key={'/app/abandonedOrder'} path={'/app/abandonedOrder'} component={(props) => <AbandonedOrder {...props} />} />,
          link: '/app/abandonedOrder',
          title: '弃单',
          key: '/app/abandonedOrder',
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
