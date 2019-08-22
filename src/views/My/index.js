import React, { Component, PureComponent } from 'react'
import style from './index.module.scss'
import './index.scss'
import {Link} from 'react-router-dom'

import ctx, { GlobalConsumer } from '@/assets/js/ctx'
import { connect } from 'react-redux'
import { changeToken } from '@/store/actionCreators'


const Fn = (OldComponent) => {
    class newComponent extends Component {
        render() {
            // 给传入的组件注入自身的props和其他参数
            return <OldComponent {...this.props} name="xiaobu" />
        }
    }

    return newComponent
}

// 使用Fn装饰Home
@Fn


class HomeUI extends PureComponent {
    static contextType = ctx
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null
        }
        this.top = React.createRef()
    }
    reqUserInfo() {
        this.context.axios.post('/user/info', {
            // token: this.state.token,
            // token: this.props.token,
            noLogin: true
        }).then((res) => {
            const { code, msg, info } = res

            if (code == 1) {
                this.setState({
                    userInfo: info
                })
            } else {
                console.log(msg)
            }
        })
    }
    // 退出登录
    exit = () => {
        // 将本地存储上的token清空
        localStorage.setItem('token', '')

        // 将当前组件中的token和userInfo清空
        this.setState({
            // token: '',
            userInfo: null
        })

        // 将仓库中的token清空 
        // this.context.store.changeToken('') 
        this.props.changeToken('')
    }
    render() {
        const { userInfo } = this.state
        const { exit } = this
        return (
            <div className={style.dizhi}>
                <div className={style.backColor}></div>

                <div className={style.info}>
                    <img className={style.touxiang} src="http://i10.m.vancl.com/Content/H5/img/H5-V0.jpg" alt=""></img>
                    <div ref={this.top} className={style.top}>
                        <span className={style.register}>{!userInfo ? '' : userInfo.username}</span>

                        {<p className={style.btns}>
                            {userInfo
                                ? <span className={style.login} onClick={exit}>退出登录</span>
                                : <><Link to="/user/register" className={style.register}>注册</Link> | <Link to="/user/login" className={style.login}>登录</Link></>
                            }
                        </p>}
                    </div>
                </div>

                <div className={style.main}>
                    <span className={style.main_1}>默认购物频道</span>
                    <p className={style.main_2}>男士MEN <span class="iconfont iconxiangyou"></span></p>
                </div>
                <div className={style.main}>
                    <span className={style.main_1}>我的订单</span>
                    <span className={style.main_2}>全部订单 <span class="iconfont iconxiangyou"></span></span>
                </div>
                <div className={style.service}>
                    <p className={style.item}>
                        <span class="iconfont icondaifukuan"></span>
                        <span className={style.size}>待付款</span>
                    </p>
                    <p className={style.item}>
                        <span class="iconfont icondaifahuo"></span>
                        <span className={style.size}>待发货</span>
                    </p>
                    <p className={style.item}>
                        <span class="iconfont iconchongzhifanxian"></span>
                        <span className={style.size}>充值返现</span>
                    </p>
                </div>
                <div className={style.service}>
                    <p className={style.item}>
                        <span class="iconfont iconbuilding_"></span>
                        <span className={style.size}>地址管理</span>
                    </p>
                    <p className={style.item}>
                        <span class="iconfont iconlipinka"></span>
                        <span className={style.size}>我的礼品</span>
                    </p>
                    <p className={style.item}>
                        <span class="iconfont iconjifen"></span>
                        <span className={style.size}>我的积分</span>
                    </p>
                </div>
                <div className={style.service1}>
                    <p className={style.item1}>
                        <span class="iconfont iconwodeyouhuijuan"></span>
                        <span className={style.size1}>优惠券</span>
                    </p>
                    <p className={style.item1}>
                        <span class="iconfont iconxinxi"></span>
                        <span className={style.size1}>消息</span>
                    </p>
                    <p className={style.item1}>
                        <span class="iconfont iconyishengjianyi"></span>
                        <span className={style.size1}>服务及反馈</span>
                    </p>
                </div>

            </div>
        )
    }
    componentDidMount(){
        if(this.props.token) this.reqUserInfo()
    }
}
function mapStateToProps(state){
    return {
        token: state.token.token
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeToken: (token) => {
            dispatch(changeToken(token))
        }
    }
}
const HomeContainer = connect(mapStateToProps,mapDispatchToProps)(HomeUI)
export default HomeContainer
