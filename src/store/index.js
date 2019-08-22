/*
    1.state：定义需要被共享的状态参数
    2.actionCreator：用来创建action，一个action就是一个json对象，它表示要如何修改state中的参数
    3.reducer：用来执行action，修改state中的参数，并导出一个新的state
    4.component view：组件视图，对比新旧state，如果发生变动，组件视图就会自动更新
*/

/*
    1.在store目录下的index.js文件中，创建并导出一个store对象

    2.在store目录下的actionCreators.js文件中，定义并导出各种action创建函数，每个函数的返回结果是一个action，表示要执行的动作指令

    3.在store目录下的reducers.js文件中，定义state和各种与action相关的状态变更函数，每个reducer用来执行action里的动作指令，导出这些reducer

    4.使用的时候，在组件中引入store对象和需要用到的action创建函数

    5.组件初始化的时候，监听整个store的状态

    6.根据用户的某个操作，调用store对象的dispatch方法，分发一个action指令

    7.在reducer中，执行这个action指令，改变state

    8.监听到state发生了改变，就再次获取新的state，并根据数据层的改变，更新当前组件的视图即component view
*/

import {createStore,combineReducers} from 'redux'
import {cartReducer,tokenReducer} from './reducers'

// 组合各种reducer，得到一个总的reducer
const rootReducer = combineReducers({
    cart: cartReducer,
    token: tokenReducer
})

// 基于这个总的reducer，生成一个store
const store = createStore(rootReducer)

export default store

