
var gulp=require("gulp");
var gulpLoadPlugins = require('gulp-load-plugins');//引入出gulp以外的所有插件
/******************html的插件*****************************/
var minifyHtml = require("gulp-minify-html");//压缩html
/******************版本控制的插件************************/
var rev=require("gulp-rev");//版本控制
var revplace=require("gulp-rev-replace");//替换对应的版本
var gulpcollector=require("gulp-rev-collector");//路劲修改
var useref=require("gulp-useref");//根据注释打包文件
/****less/sass/compass/css合并压缩的插件******************/
var css0=require("gulp-csso");//css压缩
var compass = require('gulp-compass');
var cssnext = require('cssnext');//css未来语法
var precss = require('precss');//支持像sass的函数
var postcss = require('gulp-postcss');//处理器
var autoprefixer = require('autoprefixer');//添加前缀
/***************js校验合并压缩的插件************************/
var uglify=require("gulp-uglify");//js压缩
var jshInt = require("gulp-jshint");//代码校验
var babel=require("gulp-babel");//支持6的语法
/****************图片压缩相关插件*****************************/
var base64=require("gulp-base64");//图片base64
var imagemin=require("gulp-imagemin");//压缩图片
/****************文件相关的插件*****************************/
var filter=require("gulp-filter");//过滤器
var concat=require("gulp-concat");//合并文件
var rename=require("gulp-rename");//文件重命名
var changed=require("gulp-changed");//对改变文件的操做
var plumber = require('gulp-plumber');//错误日志
var notify=require("gulp-notify");//提示信息
var del=require("del");//删除
var fs 			=	require('fs')//文件处理
var clean = require('gulp-clean');//清理文件
var fileinclude = require('gulp-file-include');//文件包含插件
/****************启一个服务器的插件*****************************/
var browserSync = 	require('browser-sync').create();
var reload      = 	browserSync.reload;//页面强制刷新
/****************逻辑控制的插件***********************************/
var gulpSequence = require('gulp-sequence');//异步同步
var gulpif=require('gulp-if');//if....else
var gulpsync = require('gulp-sync')(gulp)//异步处理
var data = require('gulp-data');//提供数据 该数据可被其他插件使用




var cleanAll={
    delArr:["./dist/*","./rev","./src/css/*","./test/**"]
};
var dist = {
    root:'./dist',
    images:'dist/images/',
    js:'dist/js/'
};
var src = {
    root:'./src',
    images:'./src/images/',
    js:'./src/js/'
};
/***clean 任务***/
gulp.task("clean",function () {
    return gulp.src(cleanAll.delArr,{read:false})
        .pipe(clean())
        .pipe(notify("删除完成 ^_^ [<%= file.relative %>]"))
});

/**compass 编译 css**/

gulp.task("compass", function () {
    return gulp.src(src.root+"/sass/*.scss")
        .pipe(changed(src.root+"/sass/*.scss"))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(compass({
            config_file: './config.rb',
            relative: false,
            css:src.root+"/css",
            sass:src.root+"/sass"
        }))
        .pipe(notify("compass编译==>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("autoprefix", function () {
    var processors = [autoprefixer, cssnext, precss];
    return gulp.src(src.root+"/css/*.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest(dist.root+"/css/"))
        .pipe(reload({stream: true}))
        .pipe(notify("compass==>hack==>dist==>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("compassComplete", function (callback) {
    gulpSequence("compass", "autoprefix")(callback)
});

/**js 检查编译并且移动到dist目录**/

gulp.task("Js",function () {
    return gulp.src(src.root+"/app/*.js")
        .pipe(changed(src.root+"/app/*.js"))
        .pipe(jshInt())
        .pipe(jshInt.reporter()) // 输出检查结果
        .pipe(gulp.dest(dist.root+"/app"))
        .pipe(reload({stream: true}))
        .pipe(notify("js校验==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});

/**foot lib 移动 foot和lib **/
gulp.task("moveLib",function(){
    return gulp.src(src.root+"/lib/**/*")
        .pipe(gulp.dest(dist.root+"/lib"))
        .pipe(notify("lib移动==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("moveFoot",function(){
    return gulp.src(src.root+"/foots/**/*")
        .pipe(gulp.dest(dist.root+"/foots"))
        .pipe(notify("foots==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});
