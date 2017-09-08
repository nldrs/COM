define(["jquery","layer","handlebars"],function($,layer){
    return {
        currentIndex:0,
        popAbout:function(title,content,icon,btn_suc,btn_err,suc,error){
            layer.confirm(content,{
                icon: icon||3,
                title: title,
                shade: !1,
                btn:[btn_suc,btn_err]
            },suc,error)
        },
        popTip:function (content,sel,time) {
            layer.tips(content,sel, {
                tips: [1, '#CB1F46'],
                time: 1000||time
            });
        },
        popInfo:function (content,icon,time,fn) {
            layer.msg(content, {
                icon: icon||6,
                time: time||1000
            },fn)
        },
        popAlert:function(html,title,width,height){
            layer.open({
                type: 1,
                title:title,
                area: [width,height],
                content: html
            });
        },
        popSingle:function(title,thisg,icon,fn){
            layer.alert(thisg,{
                icon:1||icon,
                title:title
            },fn);
        },
        popLoadingStart:function(icon){
            var index = layer.load(0, {
                shade: [0.2, '#393D49']
            });
            return index;
        },
        popLoadingEnd:function(index){
            layer.close(index);
        },
        PG_jump:function (href,flag) {
            if(typeof href !="string"){
                this.popInfo("类型错误,必须是字符串类型",5);
                return;
            }
            flag=="blank"?window.open(href):(window.location.href=href);
        },
        PG_frame:function () {
            parent.location.reload();
        },
        PG_childfather:function(){
            self.opener.location.reload();
        },
        PG_refleshOther:function(id){
            parent.id.location.reload();
        },
        PG_openOrClose:function(){
            window.opener.location.reload(true);
        },
        PG_Back:function () {
            var href = window.location.href;
            if (/#top/.test(href)) {
                window.history.go(-2);
                window.location.load(window.location.href)
            } else {
                window.history.back();
            }
        },
        TL_multiplication:function (num1,mum2) {
            var m = 0, s1 = num1.toString(), s2 = mum2.toString();
            try { m += s1.split(".")[1].length } catch (e) { }
            try { m += s2.split(".")[1].length } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        TL_money:function(num){
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
        },
        TL_RegExp:function (s, type) {
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
        },
        TL_base64:function(img) {
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
        },
        TL_getUrlparathisArray:function() {
            var search = window.location.search;
            var tmparray = search.substr(1, search.length).split("&");
            var parathisArray = new Array;
            if (tmparray != null) {
                for (var i = 0; i < tmparray.length; i++) {
                    var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
                    var set1 = tmparray[i].replace(reg, '&');
                    var tmpStr2 = set1.split('&');
                    var array = new Array;
                    array[tmpStr2[0]] = tmpStr2[1];
                    parathisArray.push(array);
                }
            }
            return parathisArray;
        },
        TL_getParamValue:function (name){
            var parathisArray = this.TL_getUrlparathisArray();
            if (parathisArray != null) {
                for (var i = 0; i < parathisArray.length; i++) {
                    for (var j in parathisArray[i]) {
                        if (j == name) {
                            return parathisArray[i][j];
                        }
                    }
                }
            }
            return null;
        },
        TL_getrandom:function(x,y){
        return parseInt(Math.random() * (y - x + 1) + x);
    },
        TL_getInputVal:function(controlID, controltype){
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
    },
        TL_ajax:function(reqUrl,reqData,reqType,resType,contentType,reqTime){
            var me=this;
        var AJAX=$.ajax({
            url:reqUrl,
            type:reqType||"GET",
            dataType:resType||"json",
            data:reqData||{},
            crossDomain: true,
            contentType:contentType||"application/x-www-form-urlencoded",
            timeout:reqTime||3000,
            beforeSend:function (XHR) {
                this.currentIndex=me.popLoadingStart();
                console.log(this.currentIndex)
            },
            complete:function(XHR, TS){
                me.popLoadingEnd(this.currentIndex);
            }
        });
        return AJAX;
    },
        TL_scroll:function(){
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
    },
        TL_trans:function(num){
        var v;
        v = parseFloat(num.replace(/,/g,""));
        return v
    },
        Ajax_page:function(selHeader,selFooter,tplUrlHeader,tplUrlFooter) {
        $(selHeader).load(tplUrlHeader);
        $(selFooter).load(tplUrlFooter);
    },
        template:function(templateSel,htmlSel,data){
        var source = $(templateSel).html();
        var template = Handlebars.compile(source);
        var context = data;
        var html    = template(context);
        $(htmlSel).html(html);
    }
    }
});


