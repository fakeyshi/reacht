import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import {withRouter} from 'react-router-dom'

@withRouter

 class GoodsItem extends Component {
    static contextType=ctx

    toDetail=(id)=>{
        console.log(this)
        this.props.history.push('/goods/detail/'+id)
    }
    render() {
        const {itemInfo} =this.props

        return (
            <div className={styles.goodsItem} onClick={()=>this.toDetail(itemInfo._id)}>   
                    <img className={styles.goodsItem2} src={this.context.commonUrl+itemInfo.goodsImg} alt=""></img>
                    <p className={styles.name}>{itemInfo.goodsName}</p>
                    <p className={styles.price}>￥{itemInfo.goodsPrice}.00</p>
            </div>
        )
    }
}



export default GoodsItem
