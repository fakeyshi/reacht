import React, { Component } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'


export class index extends Component {
    constructor() {
        super()

        this.state = {
            userInfo: null
        }

    }
    render() {
        const { userInfo } = this.state
        const { exit } = this
        return (
            <div className={styles.top}>
                <span className={styles.top_logo}></span>
                <Link to="/home">
                <img className={styles.middle} src={require("@/assets/img/logo.jpg")} alt="" />
                </Link>
                <div className={styles.bottom}>CopyRight©2007-2019 南京新与力文化传播有限公司</div>
                <Link to="/home" className={styles.boy} >
                    男生
                    <span className={styles.lighter}>BOYS</span>
                </Link>
            </div>

        )
    }
    componentDidMount() {
        if (this.props.token) this.reqUserInfo()
    }
}

export default index
