/*！！-------------------------------------------------------（一）平台公用的方法介绍--------------------------------------------------*/
/*
*   ！采用闭包的形式封装公共函数>>>>>>>>>针对PC
*  0 实例化必要的插件
*  1 封装 弹框插件有关公用方法
* 3 链接地址跳转相关
* 4 工具类函数
* 5 图片类相关函数
*
* */
/*！！-------------------------------------------------------（二）平台公用的方法的注意事项--------------------------------------------------*/
/*！
 * 注意事项：!!!!!! 重要的事情说三遍 !!!!!!!  !!!!!! 重要的事情说三遍 !!!!!!!  !!!!!! 重要的事情说三遍 !!!!!!!
 * 1.（ 封装插件命名空间是艋顺的简称 MS）
 * 2. 弹框插件用的是monbile-layer 轮播插件用的是 swiper 懒加载用的是lazyLoad
 * 3  弹框插件的初始化需要引入的是 layer.js  轮播需要引入相应的css 和 js (js依赖zepto/jquery)
 * 4  （ 封装页面跳转函数的命名是page的简称 PG）
 * 5   （ 封装工具函數命名是TOOL的简称 TL）
 */
/*！！-------------------------------------------------------（三）平台公用的方法参数介绍--------------------------------------------------*/
/*
    一、插件相关：
！1-1弹框插件相关
     * 1-1.1   //弹出确认框 title:标题（例如警告）content:内容，icon:(0-6),btn_suc/btn_err(自定义的按钮 如确定/取消) succ/error:点击相应按钮的回调
     * 1-1.2  //信息提示框 conntent:提示的内容 icon：图标（0-6)time:显示的时间 fn:成功的回掉
     * 1-1.3  //loading层 icon:图标（0-2）time:loading时间(2秒直接time=2) index是创建每一个loading的编号标识
     * 1-1.4
     * 1-1.4..........
 1-2 轮播插件的初始化
     * 1-2.1 轮播插件的初始化  parms (dom time)
     *  observer:true,//修改swiper自己或子元素时，自动初始化swiper
     *  observeParents:true,//修改swiper的父元素时，自动初始化swipe
     *  dom:string (放置轮播的容器 如果不设置默认是.swiper-container)
     *  time:num (轮播的时间)
     *
 1-3 懒加载相关
     * 1-3.1 懒加载插件的初始化 params (imgSrc,distance,animation,trigger,domContainer)
     *  imgSrc:站位图片的默认地址
     *  distance： num 提前加载时间  值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
     *  animation effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
     *  trigger 值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,
     *  domContainer  $(domContainer) 对某容器中的图片实现效果
     * skip_invisible:true 加载隐藏图片 为了提升性能，插件默认忽略隐藏的图片；如果想要加载隐藏图片.设置skip_invisible为false;
 1-4 滚动条插件（上拉加载下拉刷新）
     * 1-4 滚动条插件
     *
     *
     *
     *
     *
     *

 三、跳转相关：
     * 3-1.1 PG_jump 跳转到某个链接 parms( href:string flag:blank)是否打开新页面
     * 3-1.2 PG_frame 如何刷新包含该框架的页面用
     * 3-1.3 PG_childfather 子窗口刷新父窗口
     * 3-1.4 PG_refleshOther 如何刷新另一个框架的页面用 parms(id:另一FrameID)
     * 3-1.5 PG_openOrClose 如果想关闭窗口时刷新或者想开窗时刷新
     * 3-1.6 PG_Back 返回
 四、工具相关函數：
     * 4-1.1  TL_multiplication 乘法函数，用来得到精确的乘法结果
     * 4-1.2  TL_money 将数值四舍五入(保留2位小数)后格式化成金额形式 @param num 数值(Number或者String) @return 金额格式的字符串,如'1,234,567.45' 无效参数 返回0.00
     * 4-1.3  TL_RegExp 正则验证 @param s 验证字符串 @param type 验证类型 money,china,mobile等
     * 4-1.4  TL_base64 将图片src转化为data 64:
     * 4-1.5  TL_getUrlparamsArray 将当前页面参数数组进行返回
     * 4-1.6  TL_getParamValue  根据参数名称获取参数值
     * 4-1.7  TL_getrandom  获取随机数 params(x:下限 y:上限) type:string||number
     * 4-1.8  TL_getInputVal  获取input控件的值 params(controlID:控件ID  ||controltype:类型 如text radio 注意单选框和复选框controlID为radio,checkbox 在需要绑定的元素添加 data-name="checkbox||radio")
     * 4-1.9  TL_setInputVal  获取input控件的值 params(controlID:控件ID  ||controltype:类型 如text radio ||controlvalue:绑定值 注意单选框和复选框controlID为radio,checkbox)
     * 4-1.10 TL_scroll 回到顶部回到底部
     * 4-2.1
     * .......
 五、图片相关函數：
     * 5-1.1  IMG_adapt 保证图片在div中等比例显示剪裁图片
     * 5-2.2 IMG_auto 图片的动态展示
     * .......
     *
 六. 、异步加载页面
     * 6-1.1 AjaxPage()
     *
     * */


var MS=(function (win,doc,$) {
    var MS={};
    MS.CommonFlag=false;//是否正在执行的标记
    MS.CurrentPage=1;//当前页数 用于isscroll 的滚动刷新
    MS.loadingIndex=0;//loading页面的索引值
    $(function () {
        FastClick.attach(document.body);
    });
    MS.popAbout=function(title,content,icon,btn_suc,btn_err,suc,error){
        layer.confirm(content,{
            icon: icon||3,
            title: title,
            shade: !1,
            btn:[btn_suc,btn_err]
        },suc,error)
    };
    MS.popTip=function (content,sel,time) {
        layer.tips(content,sel, {
            tips: [1, '#CB1F46'],
            time: 1000||time
        });
    };
    MS.popInfo=function (content,icon,time,fn) {
        layer.msg(content, {
            icon: icon||6,
            time: time||1000
        },fn)
    };
    MS.popAlert=function(html,title,width,height){
        layer.open({
            type: 1,
            title:title,
            area: [width,height],
            content: html
        });
    };
    MS.popSingle=function(title,msg,icon,fn){
        layer.alert(msg,{
            icon:1||icon,
            title:title
        },fn);
    };
    MS.popLoadingStart=function(icon){
        var index = layer.load(0, {
            shade: [0.2, '#393D49']
        });
        return index;
    };
    MS.popLoadingEnd=function(index){
        layer.close(index);
    };
    MS.swiper=function (domContainer,time) {
        var swiper = new Swiper(domContainer||'.swiper-container', {
            autoplay: time||3600,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            observer:true,
            observeParents:true,
            loop: true
        });
    };
    MS.lazyLoad=function(imgSrc,distance,animation,trigger,domContainer){
        $("img.lazy").lazyload({
            placeholder: imgSrc||"http://www.d-du.com/images/grey.gif",
            threshold: distance||400,
            effect: animation||"fadeIn",
            skip_invisible: false,
            event: trigger||"scroll",
            container: $(domContainer)||"wrapper"
        });
    };

/* 3 链接地址跳转相关*/
    MS.PG_jump=function (href,flag) {
       if(MS.CommonFlag) return;
       MS.CommonFlag=true;
       if(typeof href !="string"){
           MS.autoHide("类型错误,必须是字符串类型");
           return;
       }
       flag=="blank"?window.open(href):(window.location.href=href);
       MS.CommonFlag=false;
   };
    MS.PG_frame=function () {
       parent.location.reload();
   };
    MS.PG_childfather=function(){
       self.opener.location.reload();
    };
    MS.PG_refleshOther=function(id){
       parent.id.location.reload();
   };
    MS.PG_openOrClose=function(){
       window.opener.location.reload(true);
    };
    MS.PG_Back=function () {
       var href = window.location.href;
       if (/#top/.test(href)) {
           window.history.go(-2);
           window.location.load(window.location.href)
       } else {
           window.history.back();
       }
   };
/*  4  工具类函数 */
    MS.TL_multiplication=function (num1,mum2) {
        var m = 0, s1 = num1.toString(), s2 = mum2.toString();
        try { m += s1.split(".")[1].length } catch (e) { }
        try { m += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    MS.TL_money=function(num){
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    };
    MS.TL_RegExp = function (s, type) {
        var objbool = false;
        var objexp = "";
        switch (type) {
            case 'money': //金额格式,格式定义为带小数的正数，小数点后最多三位
                objexp = "^[0-9]+[\.][0-9]{0,3}$";
                break;
            case 'numletter_': //英文字母和数字和下划线组成
                objexp = "^[0-9a-zA-Z\_]+$";
                break;
            case 'numletter': //英文字母和数字组成
                objexp = "^[0-9a-zA-Z]+$";
                break;
            case 'numletterchina': //汉字、字母、数字组成
                objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
                break;
            case 'email': //邮件地址格式
                objexp = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
                break;
            case 'tel': //固话格式
                objexp = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
                break;
            case 'mobile': //手机号码
                objexp = "^1[3|4|5|7|8][0-9]{9}$";
                // objexp = "^1[0-9]{10}$";
                break;
            case 'decimal': //浮点数
                objexp = "^[0-9]+([.][0-9]+)?$";
                break;
            case 'url': //网址
                objexp = "(http://|https://){0,1}[\w\/\.\?\&\=]+";
                break;
            case 'date': //日期 YYYY-MM-DD格式
                objexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
                break;
            case 'int': //整数
                objexp = "^[0-9]*[1-9][0-9]*$";
                break;
            case 'int+': //正整数包含0
                objexp = "^\\d+$";
                break;
            case 'int-': //负整数包含0
                objexp = "^((-\\d+)|(0+))$";
                break;
            case 'china': //中文
                objexp = /^[\u0391-\uFFE5]+$/;
                break;
        }
        var re = new RegExp(objexp);
        if(re.test(s)) {
            return true;
        }
        else{
            return false;
        }
    };
    MS.TL_base64=function(img) {
        var image = new Image();
        image.src = img.src || img;
        var tmpCanvas = $("<canvas></canvas>")[0];
        var tmpCtx = tmpCanvas.getContext("2d");
        if (tmpCanvas) {
            tmpCanvas.width = image.width;
            tmpCanvas.height = image.height;
            tmpCtx.drawImage(image, 0, 0);
            return tmpCanvas.toDataURL();
        }
    };
    MS.TL_getUrlparamsArray=function() {
        var search = window.location.search;
        var tmparray = search.substr(1, search.length).split("&");
        var paramsArray = new Array;
        if (tmparray != null) {
            for (var i = 0; i < tmparray.length; i++) {
                var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
                var set1 = tmparray[i].replace(reg, '&');
                var tmpStr2 = set1.split('&');
                var array = new Array;
                array[tmpStr2[0]] = tmpStr2[1];
                paramsArray.push(array);
            }
        }
        return paramsArray;
    };
    MS.TL_getParamValue=function (name){
        var paramsArray = MS.TL_getUrlparamsArray();
        if (paramsArray != null) {
            for (var i = 0; i < paramsArray.length; i++) {
                for (var j in paramsArray[i]) {
                    if (j == name) {
                        return paramsArray[i][j];
                    }
                }
            }
        }
        return null;
    };
    MS.TL_getrandom=function(x,y){
        return parseInt(Math.random() * (y - x + 1) + x);
    };
    MS.TL_getInputVal=function(controlID, controltype){
        var objValue = "";
        switch (controltype) {
            case 'text': //文本输入框
                objValue = $.trim($("#" + controlID).attr("value")); //取值去左右空格
                break;
            case 'password': //密码
                objValue = $.trim($("#" + controlID).attr("value")); //取值去左右空格
                break;
            case 'tel': //电话
                objValue = $.trim($("#" + controlID).attr("value")); //取值去左右空格
                break;
            case 'search': //搜索
                objValue = $.trim($("#" + controlID).attr("value")); //取值去左右空格
                break;
            case 'radio': //单选框
                //objValue = $("input[data-name='" + controlID + "']").attr("value");
                var radio=$("input[data-name='" + controlID + "']");
                var objValue=null;   //  selectvalue为radio中选中的值
                for(var i=0;i<radio.length;i++){
                if(radio[i].checked==true) {
                    objValue=radio[i].value;
                    break;
                }
            }
                break;
            case 'select': //下拉列表
                objValue = $("#" + controlID + "").val();
                break;
            case 'checkbox': //多选框
                var arr=[];
                $("input[data-name='" + controlID + "']").each(function () {
                   arr.push($(this).val());
                });
                if(arr.length){
                   return arr;
                }
                break;
            default:
                break;
        }
        return objValue;
    };
    MS.TL_setInputVal=function(controlID, controltype, controlvalue){
        switch (controltype) {
            case 'text': //文本输入框
                $("#" + controlID + "").attr("value", controlvalue); //填充内容
                break;
            case 'password': //文本输入框
                $("#" + controlID + "").attr("value", controlvalue); //填充内容
                break;
            case 'tel': //文本输入框
                $("#" + controlID + "").attr("value", controlvalue); //填充内容
                break;
            case 'search': //文本输入框
                $("#" + controlID + "").attr("value", controlvalue); //填充内容
                break;
           /* case 'radio': //单选框
                $("input[data-name='" + controlID + "'][value='" + controlvalue + "']").attr("checked", true);
                break;*/
            case 'select': //下拉列表
                $("#" + controlID + "").val(controlvalue);
                break;
            /*case 'checkbox': //多选框
              var ForDom=$("input[data-name='"+controlID+"']");
                if(ForDom.size()==controlvalue.length){
                    ForDom.each(function(i,v){
                        $(v).val(controlvalue[i]);
                    });
                }
                break;*/
            default:
                break;
        }
    };
    MS.TL_ajax=function(reqUrl,reqData,reqType,resType,contentType,reqTime){
      var AJAX=$.ajax({
          url:reqUrl,
          type:reqType||"GET",
          dataType:resType||"json",
          data:reqData||{},
          crossDomain: true,
          contentType:contentType||"application/x-www-form-urlencoded",
          timeout:reqTime||3000,
          beforeSend:function (XHR) {
              MS.loadingIndex=MS.popLoadingStart();
          },
          complete:function(XHR, TS){
              MS.popLoadingEnd(MS.loadingIndex);
          }
      });
        return AJAX;
    };
    MS.TL_scroll=function(){
        $(window).scroll(function() {
            var top = $(window).scrollTop();
            var bottom = $(document).height()-$(window).height();
            if(top > 100) {
                $('.go-top').fadeIn();
            }else {
                $('.go-top').fadeOut();
            }
        });
        $(".go-top").click(function(){
            $("html,body").animate({scrollTop:"0px"},1000);
        });
        $(".go-bottom").click(function(){
            $("body,html").stop().animate({scrollTop:bottom},1000);
        });
    };
    MS.TL_trans=function(num){
        var v;
        v = parseFloat(num.replace(/,/g,""));
        return v
    };
/*  5  图片类函数 */
    MS.IMG_adapt=function(){
        var divContainer=$(".AdaptDiv"),
                      img=$(".AdaptImg"),
            divWidth=divContainer.width(),
            divHeight=divContainer.height(),
            imgWidth=img.width(),
            imgHeight=img.height(),
            divRate=divHeight/divWidth,
            imgRate=imgHeight/imgWidth;
            if(imgRate>divRate){
                img.width(divWidth);
                var r_height=img.height(),r_top=-(r_height-divHeight)/2;
                img.css("marginTop",r_top);
            }else{
                img.height(divHeight);
                var r_width=img.width(),r_left=-(r_width-divWidth)/2;
                img.css("marginLeft",r_left);
            }
    };
    MS.IMG_auto=function(){
        var screenImage = $(".imgAuto");
        var theImage = new Image();
        for(var i=0;i<screenImage.length;i++){
            theImage.src = screenImage.eq(i).attr("src");
            var imageWidth = theImage.width;
            var imageHeight = theImage.height;
            if(imageWidth>imageHeight){
                screenImage.eq(i).css({"width":"auto","height":"100%"})
            }else{
                screenImage.eq(i).css({"width":"100%","height":"auto"})
            }
        }
    };
/* 6 异步加载页面*/
    MS.Ajax_page=function(selHeader,selFooter,tplUrlHeader,tplUrlFooter) {
        $(selHeader).load(tplUrlHeader);
        $(selFooter).load(tplUrlFooter);
    };
/* 7.定义模板函数*/
    MS.template=function(templateSel,htmlSel,data){
        var source = $(templateSel).html();
        var template = Handlebars.compile(source);
        var context = data;
        var html    = template(context);
        $(htmlSel).html(html);
    };
    return MS;
})(window,document,jQuery);

