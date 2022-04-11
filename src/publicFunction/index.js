import { getCookie } from '../helpers/cookies'
import createBrowserHistory from '../components/common/history'
import { message } from 'antd'
import axios from 'axios'
// import {
//   useLocation,
//   useNavigate,
//   useParams
// } from 'react-router-dom'

export function changeDateToString(date) {
  const seperator1 = '-'
  const seperator2 = ':'
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const strHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const strMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + strHours + seperator2 + strMinutes
}

export function nowTime() {
  const date = new Date()
  return changeDateToString(date)
}

export function nowTimeBigInt() {
  const date = new Date()
  // eslint-disable-next-line radix
  return parseInt(changeDateToString(date))
}

export function getUserName() {
  if (!getCookie('mspa_user') || getCookie('mspa_user') === 'undefined') {
    return createBrowserHistory.push('/login')
  } else {
    return JSON.parse(getCookie('mspa_user')).username
  }
}

export function getUserId() {
  if (!getCookie('mspa_user') || getCookie('mspa_user') === 'undefined') {
    return createBrowserHistory.push('/login')
  } else {
    return JSON.parse(getCookie('mspa_user'))._id
  }
}

export function handleChange(value, type, me) {
  if (value === '' || value === undefined) value = null
  const form = me.state
  form[type] = value
  me.setState(form)
}

export function ejectMessage(text, type) {
  if (type === 'success') {
    message.success(text)
  } else if (type === 'error') {
    message.error(text)
  } else if (type === 'warning') {
    message.warning(text)
  } else {
    message.info(text)
  }
}

export function flattenArrays(rawArray, childItem) {
  let newArray = []
  for (const i of rawArray) {
    newArray.push(i)
    if (i[childItem].length !== 0) {
      const children = flattenArrays(i[childItem], childItem)
      newArray = newArray.concat(children)
    }
  }
  return newArray
}

export function getBreadFromLocation(routers, location) {
  for (const i of routers) {
    if (i.link === location) {
      return [i.title]
    }
    if (i.child.length !== 0) {
      for (const x of i.child) {
        if (location === x.link) {
          return [i.title, x.title]
        }
      }
    }
  }
}

export function formDate(dateForm) {
  if (dateForm === '') {
    return ''
  } else {
    const dateee = new Date(dateForm).toJSON()
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  }
}

// export function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     const location = useLocation()
//     const navigate = useNavigate()
//     const params = useParams()
//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     )
//   }

//   return ComponentWithRouterProp
// }


// 导出excel数据
// url: 127.1.1.1:8000/xxxx/xxx
// params: { tenantId: xxx }
// fileName: 文件名称
export const exportExcelData = (url, params, fileName) => {
  axios({
    method: 'get',
    url: url,
    params: params,
    responseType: 'blob'
  }).then((res) => {
      // console.log(res)
      const reader = new FileReader()
      reader.readAsDataURL(res.data)

      reader.onload = function (e) {
          // console.log(e)
          // 转换完成，创建一个a标签用于下载
          const a = document.createElement('a');
          a.style.display = 'none';
          a.download = fileName
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      return '下载成功'
  }).catch((err) => {
          message.error('下载文件失败')
          return err
      }
  )
}