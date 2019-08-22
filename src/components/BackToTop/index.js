import React, { Component,Fragment } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'

export class BackToTop extends Component {
    constructor(){
        super()

        this.state = {
            isBack: false
            // obj: {
            //     isBack: false
            // }            
        }
    }

    // 设置props的默认值
    static defaultProps = {
        scrollObj: window
    }

    // 设置props的类型
    static propTypes = {
        scrollObj: PropTypes.object.isRequired
    }

    backToTop = () => {
        this.props.scrollObj.scrollTo(0,0)
    }    

    onScroll = () => {
        const scrollObj = this.props.scrollObj

        const scrollTop = (scrollObj == window) ? (document.documentElement.scrollTop || document.body.scrollTop) : scrollObj.scrollTop

        this.setState({
            isBack: scrollTop > 500
        })           
    }

    render() {
        return (
            <Fragment>
                {this.state.isBack && <img className={styles.backToTop} src={require('@/assets/img/backToTop.png')} alt="" onClick={this.backToTop} />} 
                {/* {this.state.isBack && <div className={styles.backToTop} style={{
                    backgroundImage: 'url(' + require('@/assets/img/backToTop.png') + ')',
                    backgroundSize: '100%'
                }} alt="" onClick={this.backToTop}></div>} */}
                {/* {this.state.isBack && <div className={styles.backToTop} alt="" onClick={this.backToTop}></div>}*/}
            </Fragment>
        )
    }

    componentDidMount(){
        const that = this

        // 使用原生的"on事件名"给同一个DOM节点添加新的事件，会覆盖之前的事件
        // this.props.scrollObj.onscroll = function(){
        //     const scrollTop = (this == window) ? (document.documentElement.scrollTop || document.body.scrollTop) : this.scrollTop

        //     that.setState({
        //         isBack: scrollTop > 500
        //     })
        // }     
        
        // 使用原生的addEventListener给同一个DOM节点添加新的事件，不会覆盖之前的事件
        this.props.scrollObj.addEventListener('scroll',this.onScroll)
    }

    componentWillUnmount(){
        // 使用原生的removeEventListener给某个DOM节点移除事件，必须加这个事件函数
        this.props.scrollObj.removeEventListener('scroll',this.onScroll)
    }
}

export default BackToTop
