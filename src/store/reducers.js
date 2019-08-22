// 定义一个初始化的状态对象
const initialState = {
    token: localStorage.getItem('token'),
    cartList: []
}

// 定义一个与token相关的状态变更函数
function tokenReducer(state=initialState,action){
    const {type,payload} = action
    
    switch(type){
        case 'changeToken':
            state.token = payload
            return state
        default:
            return state
    }
}

// 定义一个与购物车相关的状态变更函数，第一个参数是当前状态，第二个参数是来自每个react组件的action
function cartReducer(state=initialState,action){
    // action是一个json对象，type表示它的类型，payload表示它的参数
    const {type,payload} = action

    // 针对不同的action，返回不同的state
    switch(type){
        case 'changeCartList':
            // 不要在reducer中直接操作state，需要先生成一个state的副本，然后操作这个副本
            const newState = JSON.parse(JSON.stringify(state))

			// 查找购物车列表中是否已有此商品
			const ele = newState.cartList.find(e => e.id == payload.id) 

			if(ele){
				ele.num++
			}
			// 如果不存在，就把该商品添加到购物车，并添加一个数量为1
			else{
				newState.cartList.push({
					...payload,
					num: 1
				})
            }

            return newState
        default: 
            return state
    }
}

export {
    tokenReducer,
    cartReducer
}