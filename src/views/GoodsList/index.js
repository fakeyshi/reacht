import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import GoodsItem from '@/components/GoodsItem'
import BackToTop from '@/components/BackToTop'
import {PullToRefresh,ListView,SearchBar} from 'antd-mobile'

export class GoodsList extends Component {
    static contextType = ctx

    constructor(){
        super()

        this.state = {
            gua: '',

            goodsList: [], // 列表数据
            pageNum: 1, // 页数
            isRefreshing: false, // 是否正在下拉刷新中 
            dataSource: new ListView.DataSource({ // 实例化长列表的数据源
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            
            ipt_keyword: '123', // 输入框的值
            keyword: '', // 被搜索的关键字    
            
            isType: false, // 是否显示商品类别   
            goodsTypes: [
                {type: '',name: '全部'},
                {type: 0,name: '鞋'},
                {type: 1,name: 'T恤'},
                {type: 2,name: '帽子'}
            ],         
            goodsType: '', // 被选中的商品类别      
            
            rank: '', // 排序依据
            order: 0, // 排序顺序    
            
            isFilter: false, // 是否显示可供筛选的选项
            ipt_start: '',
            ipt_end: '',
            start: '',
            end: ''        
        }

        this.mylist = React.createRef()
    }

    // 使用ES6的getter，导出的结果是一个根据state中某个参数去变的变量
    get goodsTypeName(){
        // 使用ES6的数组查询，导出满足条件的第一个数组元素
        const ele = this.state.goodsTypes.find((e) => e.type === this.state.goodsType)

        return ele.name
    }

    reqGoodsList(pageNum){
        const {keyword,goodsType,rank,order,start,end} = this.state

        return this.context.axios.post('/goods/list2',{
            pageNum,
            keyword,
            goodsType,
            rank,
            order,
            start,
            end
        })
    }

    // 下拉刷新
    loadTop = (type='下拉刷新') => {
        // 如果是下拉刷新动作触发的刷新，清空输入框的值和搜索关键字
        if(type == '下拉刷新'){
            this.setState({
                ipt_keyword: '',
                keyword: ''
            })
        }

        // 添加顶部loading
       this.setState({
           isRefreshing: true
       })

        this.reqGoodsList(1)
        .then((res) => {
            const {code,msg,list} = res

            if(code == 1){
                this.setState({
                    goodsList: list, // 整个列表显示第一页的数据
                    dataSource: this.state.dataSource.cloneWithRows(list),
                    pageNum: 1, // 页数变成1
                    isRefreshing: false, // 是否正在刷新
                    isLoadingMore: false, // 是否正在加载更多
                    hasMore: true // 是否还有更多数据
                })                

                this.mylist.current.scrollTo(0,0) // 自动回到顶部
            }else{
                alert(msg)
            }
        })
    }  
    // 上拉加载更多
    loadBottom = () => {
        // 当没有更多数据的时候，就不再执行加载更多
        if(!this.state.hasMore) return false

        // 显示正在加载中
        this.setState({
            isLoadingMore: true
        })

        this.reqGoodsList(this.state.pageNum + 1)
        .then((res) => {
            const {code,msg,list} = res

            if(code == 1){
                if(list.length){
                    // 将新数据拼接在旧数据的后面
                    const goodsList = this.state.goodsList.concat(list)

                    this.setState({
                        goodsList, // 更改列表数据
                        dataSource: this.state.dataSource.cloneWithRows(goodsList), // 更新数据源
                        pageNum: this.state.pageNum + 1 // 页数加1
                    })
                }else{
                    // 关闭上拉加载更多的功能
                    this.setState({
                        hasMore: false
                    })
                }

                // 去掉底部提示
                this.setState({
                    isLoadingMore: false
                })
            }else{
                alert(msg)
            }
        })
    }    

    // 输入关键字
    iptKeyword = (value) => {
        this.setState({
            ipt_keyword: value
        })
    }
    // 点击搜索
    onSearch = () => {
        /*
            setState一般是异步的
            如果在事件监听函数和生命周期函数中，setState是异步的
            如果是手动调用一个函数，在这个函数中，setState是同步的
            setState还提供第二个参数，是一个回调函数，为了保证在执行setState之后再去执行剩下的操作，把这些操作写在这个回调函数中
        */
    
        // 此时，输入框的值才是需要搜索的关键字
        this.setState({
            keyword: this.state.ipt_keyword
        },() => {
            //  请求获取第一页，传入一个不为空的参数，用作判断
            this.loadTop('模糊查询')
        })
    }    

    // 显示商品类别
    showType = () => {
        this.setState({
            isType: !this.state.isType
        })
    }
    // 选择分类
    chooseType = (goodsType) => {
        this.setState({
            goodsType, // 选择商品类别
            isType: false // 隐藏分类
        },
            // 加载第一页，传入一个参数，避免清空关键字
            () => this.loadTop('分类')
        )   
    }        

    // 选择排序
    showRank = (rank) => {
        // 使用promise对象对异步操作进行封装
        new Promise((resolve,reject) => {
            // 如果排序依据没有变
            if(this.state.rank == rank){
                this.setState({
                    order: -this.state.order // 改成反序
                },() => resolve())
            }
            // 如果排序依据变了
            else{
                this.setState({
                    rank, // 改变依据
                    order: 1 // 改成升序
                },() => resolve())
            }     
        })
        .then(() => {
            // 加载第一页，传入一个参数，避免清空关键字
            this.loadTop('排序')            
        })
    }

    // 显示筛选
    showFilter = () => {
        this.setState({
            isFilter: !this.state.isFilter
        })
    }
    // 输入最低价
    iptMinPrice = (event) => {
        this.setState({
            ipt_start: event.target.value
        })
    }
    // 输入最高价
    iptMaxPrice = (event) => {
        this.setState({
            ipt_end: event.target.value
        })
    }    
    // 选择价格区间
    choosePrice = () => {
        this.setState({
            start: this.state.ipt_start,
            end: this.state.ipt_end,
            isFilter: false // 隐藏可供筛选的选项
        },() => 
            // 加载第一页，传入一个参数，避免清空关键字
            this.loadTop('价格区间')        
        )
    }    

    render() {
        return (
            <div className={styles.goodsList}>
                {/* 顶部 */}
                <div className={styles.top}>
                    {/* 搜索框 */}
                    <SearchBar placeholder="请输入关键字" value={this.state.ipt_keyword} onChange={this.iptKeyword} onSubmit={this.onSearch} />

                    {/* 条件查询 */}
                    <div className={styles.condition}>
                        {/* 分类 */}
                        <span className={styles.goodsType} onClick={this.showType}>{this.goodsTypeName}</span>      

                        {/* 销量 */}
                        <p className={styles.goodsNum} onClick={() => this.showRank('goodsNum')}>
                            <span>销量</span>
                            {this.state.rank == 'goodsNum' && <img src={require('@/assets/img/sort.png')}className={this.state.order == 1 ? styles.asc : ''} alt="" />}
                        </p>   

                        {/* 价格 */}
                        <p className={styles.goodsPrice} onClick={() => this.showRank('goodsPrice')}>
                            <span>价格</span>
                            {this.state.rank == 'goodsPrice' && <img src={require('@/assets/img/sort.png')} className={this.state.order == 1 ? styles.asc : ''} alt="" />}
                        </p>   

                        {/* 筛选 */}
                        <span className={styles.filter} onClick={this.showFilter}>筛选</span> 
                    </div>  

                    {/* 以下是可供选择的商品类别 */}
                    {this.state.isType && <div className={styles.goodsTypes}>
                        {this.state.goodsTypes.map(e => <span key={e.name} 
                        className={e.type === this.state.goodsType ? styles.active : ''}
                        onClick={() => this.chooseType(e.type)}>{e.name}</span>)}
                    </div>}       

                    {/* 以下是可供筛选的选项 */}
                    {this.state.isFilter && <div className={styles.filters}>
                        {/* 价格区间 */}
                        <p className={styles.cell}>
                            <span>价格区间：</span>
                            <input type="number" value={this.state.ipt_start} onChange={this.iptMinPrice} />
                            <span>——</span>
                            <input type="number" value={this.state.ipt_end} onChange={this.iptMaxPrice} />
                            <button onClick={this.choosePrice}>确定</button>
                        </p>
                    </div>}                                                     
                </div>
             
                {/* 单独使用下拉刷新 */}
                {/* <PullToRefresh
                    style={{
                        height: 'calc(100vh - 0.5rem)',
                        overflow: 'auto',
                    }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.loadTop}
                >
                {
                    this.state.goodsList.map(e => <GoodsItem itemInfo={e} key={e._id} />)
                }
                </PullToRefresh> */}

                {/* 结合下拉刷新和上拉加载更多 */}
                <ListView 
                    ref={this.mylist}

                    // 如果不加以下两个样式，就会出现各种问题
                    style={{
                        height: 'calc(100vh - 0.5rem)',
                        overflow: 'auto',
                    }}
                    
                    // 数据源
                    dataSource={this.state.dataSource}

                    // 渲染每一行
                    renderRow={
                        (rowData, sectionID, rowID) => {
                            // console.log(rowData,sectionID,rowID)
                            return <GoodsItem itemInfo={rowData} key={rowID} />
                        }
                    }

                    // 下拉刷新
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.loadTop}
                    />}

                    // 上拉加载更多
                    onEndReached={this.loadBottom}
                    onEndReachedThreshold={1}
                    renderFooter={() => {
                        const {isLoadingMore,hasMore} = this.state

                        return (
                            <div style={{ padding: 30, textAlign: 'center' }}>
                                {isLoadingMore ? '正在加载中' : (hasMore ? '' : '没有更多数据了')}
                            </div>
                        )
                    }}            
                />

                {/* 回到顶部 */}
                {/* 等到ref对应的DOM节点加载出来之后，再往组件传入这个节点参数 */}
                {this.mylist.current && <BackToTop scrollObj={this.mylist.current.listviewRef.ListViewRef.ScrollViewRef} />}
            </div>
        )
    }

    componentDidMount(){
    
        this.loadTop()

        // this.setState({
        //     gua: '大窝瓜'
        // },() => {
        //     console.log(this.state.gua)
        // })

        // this.mylist.current.listviewRef.ListViewRef.ScrollViewRef.onscroll = function(){
        //     const scrollTop = this.scrollTop
        //     console.log(scrollTop)
        // }
    }
}

export default GoodsList
