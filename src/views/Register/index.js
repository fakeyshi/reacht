import React, { Component } from 'react'
import MyForm from '@/components/MyForm'
import { Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './index.module.scss'

export class Register extends Component {
   
    onRegister = (res) => {
        Toast.success('注册成功', 2, () => {
            this.props.history.replace('/user/login')
        })
    }
    render() {
        console.log(this)
        const { onRegister } = this
        return (
            <div>
                <MyForm btnText="注册" reqPath="/user/register" reqSuccess={onRegister}>
                    <p key="header">
                        <Link to="/user/login" className="iconfont iconiconset0423"></Link>
                        <img src="//img11.static.yhbimg.com/yhb-img01/2018/03/26/10/01cf2c685c5d7ddbb21b7c7b961da77454.jpg?imageView2/2/w/750/h/290" alt=""></img>
                    </p>
                    <p key="footer"></p>
                </MyForm>
            </div>
        )
    }
}

export default Register
