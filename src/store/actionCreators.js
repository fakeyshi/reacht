// 定义一个与token相关的action创建函数
function changeToken(data){
    return {
        type: 'changeToken',
        payload: data
    }
}

// 定义一个与购物车相关的action创建函数
function changeCartList(data){
    return { // 返回一个action，是一个json对象，根据这个action，才知道这个动作是用来改变购物车数量
        type: 'changeCartList', // action的类型
        payload: data // action的参数
    }
}

export {
    changeToken,
    changeCartList
}