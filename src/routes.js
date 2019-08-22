// 使用懒加载
import lazyLoad from '@/assets/js/lazyLoad'
import Logo from './views/Logo'
import Home from './views/Home'
import GoodsList from './views/GoodsList'
import GoodsDetail from './views/GoodsDetail'
import CartList from './views/CartList'
import My from './views/My'
import Login from './views/Login'
import Register from './views/Register'
const Error = lazyLoad(() => import('./views/Error'))

//配置不同路由的路径和组件内容
const routes=[
    {
        path:'/logo',
        key:'logo',
        component:Logo,
    },
    {
        path:'/home',
        key:'home',
        component:Home,
        exact:true
    },
    {
        path:'/goods/list',
        key:'goodslist',
        component:GoodsList,
    },
    {
        path:'/goods/detail/:id',
        key:'goodsdetail',
        component:GoodsDetail,
    },
    {
        path:'/cart/list',
        key:'cartlist',
        component:CartList,
    },
    {
        path:'/user/login',
        key:'login',
        component:Login,
    },
    {
        path:'/user/register',
        key:'register',
        component:Register,
    },
    {
        path:'/my',
        key:'my',
        component:My,
    },
    //404
    {
        path:'',
        key:'error',
        component:Error,
    }
]
export default routes