import React, { Component, PureComponent } from 'react'
import styles from './index.module.scss'
import './index.scss'

import { Carousel} from 'antd-mobile'
import ctx from '@/assets/js/ctx'

import GoodsItem from '@/components/GoodsItem'
import BackToTop from '@/components/BackToTop'

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
@Fn


class HomeUI extends PureComponent {
    static contextType = ctx

    constructor(props) {
        super(props)

        this.state = {
            swiperItems: [
                " //img10.static.yhbimg.com/goodsimg/2019/03/12/10/01dffda6fdc78991db2385d5c5c7fe69b3.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img11.static.yhbimg.com/goodsimg/2019/07/02/13/014af43e931ab17bd11be3d9b728fbcf50.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img12.static.yhbimg.com/goodsimg/2019/05/24/16/0231494df76aa544d463d782ad9289def9.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img13.static.yhbimg.com/goodsimg/2017/12/29/10/02a018ac00d93389cdb467327b619c884c.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img10.static.yhbimg.com/goodsimg/2019/07/02/15/01398cb5d913edf39e9dc17b48c541614a.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img12.static.yhbimg.com/goodsimg/2019/06/16/17/026ec2f82f235c9d7c0ced2d3491c1242d.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img11.static.yhbimg.com/goodsimg/2017/04/13/10/01d460457e10a267c40da29f6050aa5ab3.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img13.static.yhbimg.com/goodsimg/2019/07/08/10/02a962173e5362eb494edc275923c06d90.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img10.static.yhbimg.com/goodsimg/2019/07/08/10/011d5de5da41da8f579e37dc4f2eb06e96.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
                "//img11.static.yhbimg.com/goodsimg/2019/05/21/17/01109c54832ed74ab1aa0dc5dca69fd77f.jpg?imageMogr2/thumbnail/153x206/position/center/quality/60",
            ],
            sprices: [
                " ¥ 149.00",
                "¥ 539.00",
                "¥ 635.00",
                "¥ 139.00",
                "¥ 599.00",
                "¥ 123.00",
                "¥ 259.00",
                "¥ 198.00",
                "¥ 159.00",
                "¥ 158.00",
            ],
            goodsList: [],
            // token: '',
            userInfo: null
        }
        this.top = React.createRef()
    }
    reqGoodsList = () => {
        this.context.axios.post('/goods/list')
            .then((res) => {
                const { code, msg, list } = res

                if (code == 1) {
                    this.setState({
                        goodsList: list
                    })
                } else {
                    alert(msg)
                }
            })
    }

    toGoodsList = () => {
        console.log(this)
        this.props.history.push('/goods/list/')
    }
    render() {
        return (
            <div className={styles.box}>
                <div className={styles.top}>
                    <span className={styles.logo}></span>
                </div>
                {/* 轮播图 */}
                {
                    <Carousel className="myswiper" autoplay={true} infinite={true} onClick={() => this.toGoodsList()}>
                        <img src={require("@/assets/img/5.jpg")} alt="" />
                        <img src={require("@/assets/img/6.jpg")} alt="" />
                        <img src={require("@/assets/img/7.jpg")} alt="" />
                        <img src={require("@/assets/img/8.jpg")} alt="" />
                        <img src={require("@/assets/img/9.jpg")} alt="" />
                    </Carousel>
                }
                <div className={styles.items}>
                    <div className={styles.top1}>
                        <img src={require("@/assets/img/top1.png")} alt="" />
                        <span>新品推荐</span>
                    </div>
                    <div className={styles.top1}>
                        <img src={require("@/assets/img/top2.png")} alt="" />
                        <span>人气搭配</span>
                    </div>
                    <div className={styles.top1}>
                        <img src={require("@/assets/img/top3.png")} alt="" />
                        <span>折扣专区</span>
                    </div>
                    <div className={styles.top1}>
                        <img src={require("@/assets/img/top4.png")} alt="" />
                        <span>全部分类</span>
                    </div>
                </div>
                <div className={styles.next}>
                    <span className={styles.next1}>热门品类</span>
                </div>
                <ul onClick={() => this.toGoodsList()}>
                    <li>
                        <img src={require("@/assets/img/10.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/11.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/12.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/13.jpg")} alt="" />
                    </li>
                </ul>
                <ul onClick={() => this.toGoodsList()}>
                    <li>
                        <img src={require("@/assets/img/14.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/15.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/16.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/17.jpg")} alt="" />
                    </li>
                </ul>
                <ul onClick={() => this.toGoodsList()}>
                    <li>
                        <img src={require("@/assets/img/18.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/19.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/20.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/21.jpg")} alt="" />
                    </li>
                </ul>
                <div className={styles.next2}>
                    <span>热门品牌</span>
                </div>
                <ul>
                    <li>
                        <img src={require("@/assets/img/30.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/31.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/32.jpg")} alt="" />
                    </li>
                    <li>
                        <img src={require("@/assets/img/33.jpg")} alt="" />
                    </li>
                </ul>
                <div className={styles.result}>
                    <img className={styles.tupian} src={require("@/assets/img/34.jpg")} alt=""></img>
                    <img className={styles.tupian} src={require("@/assets/img/35.jpg")} alt=""></img>
                    {/* <img className={styles.tupian} src={require("@/assets/img/36.png")} alt=""></img> */}
                </div>
                <img src={require("@/assets/img/top100.jpg")} alt=""></img>
                <div className={styles.lateralSliding}>
                    <div className={styles.lateralSlidingItem}>
                        {
                            this.state.swiperItems.map((e, i) => {
                                return<img className={styles.photo} src={e} alt="" key={e._id}></img>})
                        }
                    </div>
                </div>
                <div className="title">
                   
                    <span>你可能喜欢</span>
                </div>
                {/* 商品列表 */}
                <div ref={el => this.goodsListRef = el} className={styles.goodsList}>
                    {
                        this.state.goodsList.length&&
                        this.state.goodsList.map((e, i) => {
                            return <GoodsItem itemInfo={e} key={e._id} />
                        })
                    }
                </div>
                {/* 回到顶部 */}
                <BackToTop/>
            </div>
        )
    }

    componentDidMount() {
        this.reqGoodsList()
    }
    componentWillUnmount() {
        window.onscroll = null
    }
}




function mapStateToProps(state) {
    return {
        token: state.token.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeToken: (token) => {
            dispatch(changeToken(token))
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeUI)
export default HomeContainer
