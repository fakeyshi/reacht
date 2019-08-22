import React, { Component } from 'react'
import {Button,Toast} from 'antd-mobile'
import { Link } from 'react-router-dom'
import MyForm from '@/components/MyForm'
import './index.scss'

import ctx from '@/assets/js/ctx'
import { connect } from 'react-redux'
import { changeToken } from '@/store/actionCreators'

export class LoginUI extends Component {
    onLogin = (res) => {
        Toast.success('登录成功')

        // 获取token
        const { token } = res
        console.log(token)
        // 把token存到本地
        localStorage.setItem('token', token)
        // 把token存到仓库
        this.props.changeToken(token)

        // 返回到上一页
        this.props.history.goBack()
    }

    render() {
        const { onLogin } = this

        return (
            <div>
                {/* 使用封装好的表单组件 */}
                <MyForm btnText="登录" reqPath="/user/login" reqSuccess={onLogin}>
                    <p key="header">
                        <Link to="/goods/list" className="iconfont iconiconset0423"></Link>
                        <Link to="/user/register" className="register" replace>注册</Link>
                        <img src="//img11.static.yhbimg.com/yhb-img01/2018/03/26/10/01cf2c685c5d7ddbb21b7c7b961da77454.jpg?imageView2/2/w/750/h/290" alt=""></img>
                    </p>
                    <Link  to="/user/register" key="footer" className="bottom">
                    <div className="btn">注册</div>
                    </Link>
                </MyForm>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeToken: (token) => {
            dispatch(changeToken(token))
        }
    }
}
const LoginContainer = connect(null, mapDispatchToProps)(LoginUI)
export default LoginContainer
