import React from 'react'; // 引入核心类库文件
import ReactDOM from 'react-dom'; // 引入虚拟DOM处理工具
import './index.scss'; // 引入全局样式文件
import App from './App'; // 引入根组件
import * as serviceWorker from './serviceWorker'; // 引入service worker
import axios from './assets/js/axios'
import {Provider} from 'react-redux'
import store from './store'

// 引入React的内置组件HashRouter，模式是hash
// 整个路由有且仅有一个HashRouter
// 将HashRouter放在虚拟DOM的最外层
import {HashRouter} from 'react-router-dom' 

// 引入一个全局的上下文对象
import {GlobalProvider} from './assets/js/ctx'

// 定义一个全局变量，相当于一个简陋的仓库
const store2 = {
    // token: '', // 提供一个token，并设置它的初始值
    token: localStorage.getItem('token'),
    changeToken(data){ // 提供一个改变token的方法
        this.token = data
    }
}

// 使用render方法，将虚拟DOM渲染成真实DOM，涉及diff算法
ReactDOM.render(
    <Provider store={store}>
        <GlobalProvider value={{
            axios,
            commonUrl: 'http://47.94.224.74:8888',
            store: store2
        }}>
            <HashRouter>
                <App />
            </HashRouter>
        </GlobalProvider>
    </Provider>
, document.getElementById('root'));

// 当用户第一次打开应用的时候，会将资源文件缓存在本地，当用户再次访问的时候就会快很多，即使在离线情况下，也能正常访问
serviceWorker.unregister();
