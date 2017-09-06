# 我自己的代码规范(用于整站风格)

## 页面布局方面

    1.页面需要引入重置的css RESET-PC/TEL.css

    2.页面需要引入工具类的js Tools-PC/TEL.js

    3.页面需要引入整站风格的  Plan-css/js 用于统一整站的风格和按钮样式以及动画效果的展示

        3.1 用到的css类库有 animate.css / buttons.css  / csshake.css / csshover / cssmagic / cssImageHover / cssBounce

        3.2 弹框方面暂用layer

        3.3 校验方面暂用easyForm

        3.4 分页暂用page.js

        3.5 轮播暂用swiper.js

        3.6 涉及到的本地存储用store.js

        3.7 .....

    4.如果动画库不能完成项目的动态效果 Plan-js 用于网站自定义的动画效果,考虑动画效果不是很多的时候不用封装

    5.Business-PC/TEL.js为业务类的抽象函数(可以定义一些异步加载公共部分的函数和定义全局的rootUrl配置);

## 前端自动化方面

 1.尝试使用 webpack 和 gulp web starter kit 进行打包自动化

## 模块化管理


