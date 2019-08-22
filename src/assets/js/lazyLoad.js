import React,{lazy,Suspense} from 'react'

function lazyLoad(component){
    return function(){
        // 结合ES6的动态import和React的lazy方法
        const LazyComponent = lazy(component)

        return (
            // 使用Suspense组件，添加加载过程中的loading提示
            <Suspense fallback={
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.3rem'
                }}>正在加载中。。。</div>
            }>
                <LazyComponent />
            </Suspense>
        )
    }
}

export default lazyLoad