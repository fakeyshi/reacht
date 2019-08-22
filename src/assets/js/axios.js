// 引入aixos
import axios from 'axios'
// 引入loading组件
import {Toast} from 'antd-mobile'
// 引入createHashHistory
import {createHashHistory} from 'history'
// 引入store
import store from '@/store'

// 添加请求拦截器
axios.interceptors.request.use(function(config){
	// 添加loading
	Toast.loading('加载中...',0)

	// 添加axios请求的参数默认值
	config.data = config.data || {}

	// 添加所有axios请求的路径抬头
	config.url = (config.data.proxyUrl || '/xiaoshi/api') + config.url 

	// 添加axios请求的公共参数
	config.data.token = store.getState().token.token

	return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response){
	// 关闭loading
	Toast.hide()

	// 获取前端是否需要跳转到登录页的参数
	const noLogin = JSON.parse(response.config.data).noLogin

	// 如果token失效，并且需要登录的时候，才会跳转到登录页
	
	if(response.data.code == -2 && !noLogin) {
		// 为了保证当前组件的历史记录已经生成，延迟300ms之后再跳往登录页
		setTimeout(() => {
			createHashHistory().push('/user/login')
		},300)
	}

	// 只返回服务器的响应内容,其实就是res.send里面的数据
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios

