require.config({
    baseUrl:"app/",
    urlArgs:"_="+new Date().getTime(),
    paths:{
        "jquery":["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min","../lib/pluginJs/jquery.min"],
        "fastclick":["https://cdn.bootcss.com/fastclick/1.0.6/fastclick","../lib/pluginJs/fastclick"],
        "layer":["http://apps.bdimg.com/libs/layer/2.1/layer","../lib/pluginJs/layer/layer"],
        "handlebars":["http://apps.bdimg.com/libs/handlebars.js/2.0.0-alpha.4/handlebars.min","../lib/pluginJs/handlebars.min"],
        "swiper":["https://cdn.bootcss.com/Swiper/3.3.1/js/swiper.min","../lib/pluginJs/swiper-3.3.1.min"],
        "store":["https://cdn.bootcss.com/store.js/1.3.20/store","../lib/pluginJs/store"],
        "css":["http://apps.bdimg.com/libs/require-css/0.1.8/css.min","../lib/pluginJs/css.min"],
        "easyform":["../lib/pluginJs/easyform"],
        "lazyload":["../lib/pluginJs/jquery.lazyload.min"],
        "bounce":["../lib/pluginJs/bounce.min"],
        "page":["../lib/pluginJs/page"]
    },
    shim:{
        "layer":{
            "deps":["jquery","css!../lib/pluginJs/layer/skin/default/layer.css"]
        },
        "easyform":{
            "deps":["jquery","css!../lib/pluginCss/easyform.css"]
        },
        "handlebar":{
            "deps":["jquery"]
        },
        "swiper":{
            "deps":["jquery","css!../lib/pluginCss/swiper-3.3.1.min.css"]
        },
        "page":{
            "deps":["jquery","css!../lib/pluginCss/page.css"]
        },
        "lazyload":{
            "deps":["jquery"]
        }
    },
    map: {
        "*":{
            "css":"../lib/pluginJs/css.min"
        }
    }

});


