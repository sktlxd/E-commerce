import React, { Component } from 'react'
import { Cascader } from 'antd'

import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'

/*
  placeholder: 设置选择框默认显示内容
  width: 提示框长度
  onChange：改变提示框内容触发的函数
*/

areas.forEach(area => {
    const matchCity = cities.filter(city => city.code === area.cityCode)[0]
    if (matchCity) {
      matchCity.children = matchCity.children || []
      matchCity.children.push({
        label: area.name,
        // value: area.code
        value: area.name
      })
    }
})

cities.forEach(city => {
    const matchProvince = provinces.filter(
      province => province.code === city.provinceCode
    )[0]
    if (matchProvince) {
      matchProvince.children = matchProvince.children || []
      matchProvince.children.push({
        label: city.name,
        // value: city.code,
        value: city.name,
        children: city.children
      })
    }
})

const options = provinces.map(province => ({
    label: province.name,
    // value: province.code,
    value: province.name,
    children: province.children
}))

export class AddressCascader extends Component {
    render() {
        const { placeholder, width, disabled, defaultValue, value } = this.props

        return (
            <div>
                <Cascader
                    options={options}
                    showSearch
                    changeOnSelect
                    value={value === undefined ? '' : value}
                    placeholder={placeholder === undefined ? '选择省/市/区' : placeholder}
                    style={{ width: width === undefined ? 400 : width }}
                    onChange={this.props.onChange !== undefined ? this.props.onChange : null}
                    disabled={ disabled === true ? true : false }
                    defaultValue={ defaultValue === undefined ? null : defaultValue}
                />
            </div>
        )
    }
}

export default AddressCascader
