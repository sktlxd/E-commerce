import React, { Component } from 'react'
import { setCookie } from '../../helpers/cookies'
import '../../style/login.less'
import { Form, Input, Button, Checkbox, message, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const FormItem = Form.Item

const users = [{
    username: 'admin',
    password: 'admin'
}, {
  username: 'reviewer1',
  password: 'reviewer1'
}, {
  username: 'reviewer2',
  password: 'reviewer2'
}, {
  username: 'reviewer3',
  password: 'reviewer3'
}, {
  username: 'rectifier1',
  password: 'rectifier1'
}, {
  username: 'rectifier2',
  password: 'rectifier2'
}, {
  username: 'rectifier3',
  password: 'rectifier3'
}]

function PatchUser(values) {
    const { username, password } = values
    return users.find(user => user.username === username && user.password === password)
}

class NormalLoginForm extends Component {
    state = {
        isLoding: false
    }

    handleSubmit = (e) => {
        this.formRef.validateFields().then(values => {
            if (PatchUser(values)) {
                this.setState({
                    isLoding: true
                })
                values['_id'] = values.username

                setCookie('mspa_user', JSON.stringify(values))

                message.success('登录成功!')
                const that = this
                setTimeout(function() {
                    that.props.history.push({ pathname: '/app', state: values })
                }, 2000)
            }
        }).catch(errorInfo => {
            message.error('login failed!')
        })
    }

    render() {
        return (
            this.state.isLoding ? <Spin size='large' className='loading' /> : <div className='login'>
                <div className='login-form'>
                    <div className='login-logo'>
                        <div className='login-name' style={{ marginLeft: '30px' }}>产业电商服务系统</div>
                    </div>
                    <Form
                        name="login"
                        ref={ref => this.formRef = ref}
                        onFinish={this.handleSubmit}
                        style={{ maxWidth: '300px' }}
                        autoComplete="off"
                        initialValues={{ remember: true }}
                    >
                        <FormItem
                            name='username'
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined style={{ fontSize: 13 }} />} placeholder='用户名 (admin)' />
                        </FormItem>
                        <FormItem
                            name='password'
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input prefix={<LockOutlined type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码 (admin)' />
                        </FormItem>
                        <FormItem
                            name='remember'
                            style={{ marginBottom: '0' }}
                            valuePropName='checked'
                        >
                            <div>
                                <Checkbox>记住我</Checkbox>
                                <a className='login-form-forgot' href='/#' style={{ float: 'right' }}>忘记密码?</a>
                                <Button type='primary' htmlType='submit' className='login-form-button' style={{ width: '100%' }}>
                                    登录
                                </Button>
                            </div>
                        </FormItem>
                    </Form>
                    {/* <a className='githubUrl' href={`${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`}> </a> */}
                </div>
            </div>
        )
    }
}

const Login = (NormalLoginForm)
export default Login
