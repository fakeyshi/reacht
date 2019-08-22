import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import {Toast,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {changeToken} from '@/store/actionCreators'

export class CartListUI extends Component {
    static contextType = ctx

    constructor(){
        super()

        this.state = {
            list: []
        }
    }

    get isAll(){
        // 是否每项都被选中
        return this.state.list.every(e => e.isChosen)
    }

    set isAll(val){
        // console.log(val)
        
        // 创建一个副本
        const newList = this.state.list.concat()

        // 如果全选亮起，就要把所有的列表选项全部选中，否则全部不选中
        newList.forEach(e => e.isChosen = val)

        this.setState({
            list: newList
        })
    }

    get cartTotal(){
        return this.state.list.reduce((prevTotal,currItem)=>{
            return prevTotal + (currItem.isChosen ? currItem.goodsPrice*currItem.buyNum : 0)
        },0)
    }

    reqCartList(){
        this.context.axios.post('/cart/list')
        .then((res) => {
            const {code,msg,list} = res

            if(code ==1){
                this.setState({
                    list
                })     
            }else{
                Toast.fail(msg)
            }
        })
    }
    onDecrease = (item,idx) => {
        if(item.buyNum == 1){
            Toast.fail('商品数量至少为1')
            return 
        }
        
        this.context.axios.post('/cart/update',{
            id: item._id,
            buyNum: item.buyNum -1
        }).then((res) => {
            const {code,msg} = res

            if(code == 1){
                // 成功之后，才能改变页面上的商品数量
                // 不要直接修改旧state中的数据
                // item.buyNum--
                // 根据原始数据，创建一个副本，然后针对这个副本进行剩下的操作，最后让它覆盖旧的数据
                // const newList = JSON.parse(JSON.stringify(this.state.list))
                const newList = this.state.list.concat()
               
                newList[idx].buyNum--

                this.setState({
                    list: newList
                })
            }else{
                Toast.fail(msg)
            }
        })
    }
    onIncrease = (item,idx) => {
        this.context.axios.post('/cart/update',{
            id: item._id,
            buyNum: item.buyNum +1
        }).then((res) => {
            const {code,msg} = res

            if(code == 1){
                // 成功之后，才能改变页面上的商品数量
                const newList = this.state.list.slice()
               
                newList[idx].buyNum++

                this.setState({
                    list: newList
                })
            }else{
                Toast.fail(msg)
            }
        })
    }
    // 选择某项
    chooseItem = (item,idx) => {
        // 拷贝一个state中的list变量，得到一个副本
        const newList = this.state.list.slice()
               
        // 操作这个副本
        newList[idx].isChosen = !item.isChosen

        // 让副本覆盖以前的值
        this.setState({
            list: newList
        })        
    }
    // 点击全选
    chooseALL = () => {
        this.isAll = !this.isAll
    }
    // 批量删除
    onDel = () => {
        const list = this.state.list

        // 如果一个都没有被选中
        if(list.every(e => !e.isChosen)){
            Toast.fail('请选择至少一个商品')
            return
        }

        // 遍历购物车列表，取出被选中的商品id，把这些id拼接起来
        let id = ''

        id = list.filter(e => e.isChosen).map(e => e._id).join()

        this.context.axios.post('/cart/del',{
            id
        }).then((res) => {
            const {code,msg} = res

            if(code ==1){
                Toast.success(msg)

                // 可以重新加载页面
                // this.reqCartList()

                // 也可以在页面上删除被选中的商品
                const newList = list.concat()
                for(let i=0; i<newList.length; i++){
                    if(newList[i].isChosen){
                        newList.splice(i,1)
                        i--
                    }
                }
                this.setState({
                    list: newList
                })
            }else{
                Toast.fail(msg)
            }
        })
    }

 
    render() {
        const {list} = this.state
        const {chooseItem,onDecrease,onIncrease,chooseALL,onDel,isAll,cartTotal} = this

        return (
            <div className={styles.cartList}>
                {list.map((e,i) =><div className={styles.cartItem} key={e._id}>
                    <img className={styles.choice} src={require('@/assets/img/'+ (e.isChosen ? 'chosen' :'unchosen') +'.png')} onClick={() => chooseItem(e,i)} alt="" />

                    <img className={styles.thumbnail} src={this.context.commonUrl + e.goodsImg} alt="" />

                    <div className={styles.info}>
                        <span className={styles.title}>{e.goodsName}</span>

                        <span className={styles.sku}>购买规格：{e.buySku}</span>

                        <div className={styles['price-num']}>
                            <span className={styles.price}>价格：{e.goodsPrice}</span>

                            <div className={styles.num}>
                                <span className={styles.label}>数量：</span>
                                <img src={require('@/assets/img/decrease.png')} onClick={() => onDecrease(e,i)} alt="" />
                                <span className={styles.val}>{e.buyNum}</span>
                                <img src={require('@/assets/img/increase.png')} onClick={() => onIncrease(e,i)} alt="" />
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <div className={styles.all} onClick={chooseALL}>
                            <img src={require('@/assets/img/' + (isAll ? 'chosen' : 'unchosen') + '.png')} alt="" />
                            <span>全选</span>
                        </div>

                        <Button type="warning" onClick={onDel}>删除</Button>   
                    </div>

                    <div className={styles.right}>
                        <span className={styles.total}>总价：{cartTotal}</span>
                        <Button type="primary" onClick={()=>this.props.history.push('/my')}>结算</Button>   
                    </div>
                </div>                
            </div>
        )
    }

    componentDidMount(){
        this.reqCartList()
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeToken: (token) => dispatch(changeToken(token))
    }
}

const CartListContainer = connect(null,mapDispatchToProps)(CartListUI)

export default CartListContainer
