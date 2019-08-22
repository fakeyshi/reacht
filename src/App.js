import React, { Component } from 'react';
import './App.scss';
import './App.module.scss'
import routes from './routes.js'
import ctx from './assets/js/ctx'
import { Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom'

class AppCPU extends Component {
    static contextType = ctx
    render() {
        return <>{this.props.children}</>
    }
    componentDidMount() { }
}



function App(props) {
    const pathname = props.location.pathname
    const showNav = /home|(goods\/list)|(cart\/list)|my/.test(pathname)

    const element = (
        <div className="App">
            <Switch>
                <Redirect from="/" to="/logo" exact />
                {
                    routes.map(e => <Route {...e} />)
                }
            </Switch>
            {showNav && <div className="nav">
                {/* <NavLink to="/logo" replace></NavLink> */}
                <NavLink to="/home" replace>
                    <span className="iconfont iconshouye"></span>
                    <span>首页</span>
                </NavLink>
                <NavLink to="/goods/list" replace>
                    <span className="iconfont iconfenlei-"></span>
                    <span>列表</span>
                </NavLink>
                {/* <NavLink to="/goods/detail" replace>
                    <span className="iconfont iconxiangqingye"></span>
                    <span>商品详情</span>
                </NavLink> */}
                <NavLink to="/cart/list" replace>
                    <span className="iconfont icongouwuche"></span>
                    <span>购物车</span>
                </NavLink>
                <NavLink to="/my" replace>
                    <span className="iconfont iconwode"></span>
                    <span>我的</span>
                </NavLink>
            </div>}
        </div>
    )
    return element
}

export default withRouter(App);
