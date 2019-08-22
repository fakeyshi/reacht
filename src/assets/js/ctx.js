import React from 'react'

// 创建一个全局的上下文对象
const context = React.createContext()

// 使用里面的Provider组件，为整个项目提供一些全局共享的参数
const GlobalProvider = context.Provider

// 使用里面的Consumer组件，在项目的任何地方调用全局共享的参数
const GlobalConsumer = context.Consumer

export{
    GlobalProvider,
    GlobalConsumer
}

export default context