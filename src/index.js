/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-29 21:16:38
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 09:56:40
 */
import React from 'react'
import ReactDOM from 'react-dom'
import MRoute from './routes/index'
import './index.css'
import * as serviceWorker from './serviceWorker'

import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { config as AmapReactConfig } from '@amap/amap-react'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'

// window._AMapSecurityConfig = {
//   securityJsCode:'56b029b943f8ac52348b67ae03004b83',
// }

AmapReactConfig.version = '2.0' // 默认2.0，这里可以不修改
AmapReactConfig.key = '72063e9ed9d11bbd05b789f4736ae5af'
AmapReactConfig.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation'
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
]

ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <MRoute />
    </ConfigProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
