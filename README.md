# 我自己的代码规范  (用于整站风格)

## 页面布局方面

    1.页面需要引入重置的css RESET-PC/TEL.css

    2.页面需要引入工具类的js util.js

    3.页面需要引入整站风格的  Plan-css/js 用于统一整站的风格和按钮样式以及动画效果的展示

        3.1 用到的css类库有 animate.css / buttons.css  / csshake.css / csshover / cssmagic / cssImageHover / cssBounce

        3.2 弹框方面暂用layer

        3.3 校验方面暂用easyForm

        3.4 分页暂用page.js

        3.5 轮播暂用swiper.js

        3.6 涉及到的本地存储用store.js

        3.7 涉及到的点击延迟 用的是fastclcik插件
        
        3.8 涉及到的懒加载用的是lazyload.js 插件

    4.如果动画库不能完成项目的动态效果 animate.js 用于网站自定义的动画效果,考虑动画效果不是很多的时候不用封装

    5.app下的*.js为业务类的抽象函数(可以定义一些异步加载公共部分的函数和定义全局的rootUrl配置);


## 模块化管理

    1.使用require.js 进行模块化管理  对于简单的项目可以使用 LAB.js 进行模块化管理
    
## 前端自动化方面

 1.尝试使用 webpack 和 gulp web starter kit 进行打包自动化



