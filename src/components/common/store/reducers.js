import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import SaleOrder from '../../../views/order/saleOrder'
import DraftOrder from '../../../views/order/draftOrder'
import AbandonedOrder from '../../../views/order/abandonedOrder'
import * as constants from './constants'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  routers: [
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
