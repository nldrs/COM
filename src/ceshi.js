
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
var less=require("gulp-less");//less
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



/**********************全局路径的配置***************************/
var config={
    cleanArr:["./src/less/*.css","./dist/*","./rev","./src/css/*","./src/handleJS/*","./test/**"],
    html:{
        root:"./src/",
        src:"./src/*.html",
        dist:"./dist/",
        test:"./test/"
    },
    less:{
        root:"./src/less/",
        src:"./src/less/*.less",
        dist:"./dist/css/",
        test:"./test/css/"
    },
    sass:{
        root:"./src/sass/",
        src:"./src/sass/*.sass",
        dist:"./dist/css/",
        test:"./test/css/"
    },
    css:{
        root:"./src/css/",
        src:"./src/css/*.css",
        dist:"./dist/css/",
        test:"./test/css/",
        rename:"index.css",
        concatArr:['./src/less/common.css','./src/less/a.css']
    },
    handleJS:{
        root:"./src/handleJS/",
        src:"./src/handleJS/*.js",
    },
    js:{
        root:"./src/js/",
        src:"./src/js/*.js",
        dist:"./dist/js/",
        test:"./test/js/",
        rename:"index.js",
        concatArr:['./src/js/common.js','./src/js/a.js']
    },
    assets:{
        root:"./assets/",
        src:"./src/assets/**/*",
        dist:"./dist/assets/",
        test:"./test/assets/"
    },
    img:{
        root:"./img/",
        src:"./src/img/**/*",
        dist:"./dist/img/",
        test:"./test/img/"
    },
    fonts:{
        root:"./fonts/",
        src:"./src/fonts/**/*",
        dist:"./dist/fonts/",
        test:"./test/fonts/"
    },
    rev:{
        root:"./rev/",
        src:"./rev/**/*.json",
        css:"./rev/css/",
        js:"./rev/js/",
        img:"./rev/img/",
        fonts:"./rev/fonts/",
    }
}
//***clean 任务***//
gulp.task("clean",function () {
    return gulp.src(config.cleanArr,{read:false})
        .pipe(clean())
        .pipe(notify("删除完成 ▲▲▲▲▲ [<%= file.relative %>]"))
});
/**********************开始构建开发环境gulp----测试环境***************************/


//***less copy test***   1//

gulp.task("Tless",function () {
    var processors = [autoprefixer, cssnext, precss];
    return gulp.src(config.less.src)
        .pipe(changed(config.less.src))
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.less.test))
        .pipe(reload({stream: true}))
        .pipe(notify("less编译==>hack==>test==>完成 ▲▲▲▲▲[<%= file.relative %>]"))
})
//***compass copy test***   1//
gulp.task("compass",function () {
    return gulp.src(config.sass.src)
        .pipe(changed(config.sass.src))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(compass({
            config_file: './config.rb',
            relative:false,
            css: config.css.root,
            sass: config.sass.root
        }))
        .pipe(reload({stream: true}))
        .pipe(notify("compass编译==>完成 ▲▲▲▲▲[<%= file.relative %>]"))
})
gulp.task("auto",function () {
    var processors = [autoprefixer, cssnext, precss];
    return gulp.src(config.css.src)
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.sass.test))
        .pipe(reload({stream: true}))
        .pipe(notify("compass==>hack==>test==>完成 ▲▲▲▲▲[<%= file.relative %>]"))
})
gulp.task("Tcompass",function (callback) {
    gulpSequence("compass","auto")(callback)
})
//***js copy test***   2//

gulp.task("Tjs",function () {
    return gulp.src(config.js.src)
        .pipe(changed(config.js.src))
        .pipe(jshInt())
        .pipe(jshInt.reporter()) // 输出检查结果
        .pipe(gulp.dest(config.js.test))
        .pipe(reload({stream: true}))
        .pipe(notify("js校验==>test==>>完成 ▲▲▲▲▲ [<%= file.relative %>]"))
})

//***img copy test***   3//

gulp.task("Timg",function () {
    return gulp.src(config.img.src)
        .pipe(changed(config.img.src))
        .pipe(gulp.dest(config.img.test))
        .pipe(reload({stream: true}))
        .pipe(notify("img==>test==>>完成 ▲▲▲▲▲ [<%= file.relative %>]"))
})

//***fonts copy test***   4//

gulp.task("Tfonts",function () {
    return gulp.src(config.fonts.src)
        .pipe(changed(config.fonts.src))
        .pipe(gulp.dest(config.fonts.test))
        .pipe(reload({stream: true}))
        .pipe(notify("fonts==>test==>>完成 ▲▲▲▲▲ [<%= file.relative %>]"))
})

//***assets copy test***   5//

gulp.task("Tassets",function () {
    return gulp.src(config.assets.src)
        .pipe(changed(config.assets.src))
        .pipe(gulp.dest(config.assets.test))
        .pipe(reload({stream: true}))
        .pipe(notify("assets==>test==>>完成 ▲▲▲▲▲ [<%= file.relative %>]"))
})

//***html copy test***  6//

gulp.task("Thtml",function () {
    return gulp.src(config.html.src)
        .pipe(changed(config.html.src))
        .pipe(gulp.dest(config.html.test))
        .pipe(reload({stream: true}))
        .pipe(notify("html==>test==>>完成 ▲▲▲▲▲ [<%= file.relative %>]"))
})

//***webserver copy test***//

gulp.task('Tbrowser', function() {
    browserSync.init({
        server: {
            baseDir: "./test/"
        },
        port:7777
    });
});

//***watch copy test***//

gulp.task('watch', function() {
    gulp.watch(config.html.src,["Thtml"]);
    gulp.watch(config.less.src,["Tcompass"]);
    gulp.watch(config.js.src,["Tjs"]);
    gulp.watch(config.img.src,["Timg"]);
    gulp.watch(config.fonts.src,["Tfonts"]);
    gulp.watch(config.assets.src,["Tassets"]);
});
/** 开发时，运行 'gulp TEST' **/
gulp.task("TEST",function (callback) {
    gulpSequence('Tbrowser',["Tless","Tjs","Timg","Tfonts","Tassets","Thtml"],"watch")(callback)
})

/**********************开始构建开发环境gulp----生产环境***************************/

//(1.1)***revFont任务***//
gulp.task("revFonts",function () {
    return gulp.src(config.fonts.src)
        .pipe(changed(config.fonts.src))
        .pipe(rev())
        .pipe(gulp.dest(config.fonts.dist))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev.fonts))
        .pipe(notify("revFont ==>> dist 完成★★★★★ [<%= file.relative %>]"))
})
//(1.2)***revImg任务(顺带压缩)***//
gulp.task("revImg",function () {
    return gulp.src(config.img.src)
        .pipe(changed(config.img.src))
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(rev())
        .pipe(gulp.dest(config.img.dist))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.rev.img))
        .pipe(notify("revFont ==>> dist 完成★★★★★ [<%= file.relative %>]"))
})
//(1.3)***revFont任务***//
gulp.task("revAssets",function () {
    return gulp.src(config.assets.src)
        .pipe(changed(config.assets.src))
        //.pipe(rev())暂时不处理插件的版本
        .pipe(gulp.dest(config.assets.dist))
        //.pipe(rev.manifest())
        // .pipe(gulp.dest(config.rev.font))
        .pipe(notify("revAssets ==>> dist 完成★★★★★ [<%= file.relative %>]"))
})
//(1.4)***更改less文件中版本的引用***//
gulp.task("revcollectorcss",function () {
    return gulp.src([config.rev.src,config.less.src])
        .pipe(gulpcollector({replaceReved:true}))
        .pipe(gulp.dest(config.less.root))
        .pipe(reload({stream: true}))
})
//(1.5)***更改js文件中版本的引用***//
gulp.task("revcollectorjs",function () {
    return gulp.src([config.rev.src,config.js.src])
        .pipe(gulpcollector({replaceReved:true}))
        .pipe(gulp.dest(config.js.root))
        .pipe(reload({stream: true}))
})
//(2)***less copy dist***//
gulp.task("Dcss",function () {
    var processors = [autoprefixer, cssnext, precss];
    return gulp.src(config.less.src)
        .pipe(changed(config.less.src))
        .pipe(less())
        .pipe(gulp.dest(config.less.root))
        .pipe(reload({stream: true}))
        .pipe(postcss(processors))
        .pipe(base64({
            maxImageSize:1*1024,
            debug:true
        }))
        .pipe(gulp.dest(config.css.root))
        .pipe(css0())
        .pipe(rev())
        .pipe(gulp.dest(config.css.dist))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest()) //生成一个rev-manifest.json
        .pipe(gulp.dest(config.rev.css))
        .pipe(notify("less编译==>hack==>dist==>完成 ★★★★★ [<%= file.relative %>]"))
})
//(2)***js copy dist***//
gulp.task("Djs",function () {
    return gulp.src(config.js.src)
        .pipe(changed(config.js.src))
        .pipe(jshInt())
        .pipe(jshInt.reporter()) // 输出检查结果
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(config.js.dist))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest()) //生成一个rev-manifest.json
        .pipe(gulp.dest(config.rev.js))
        .pipe(notify("jslint==>压缩==>dist==>完成 ★★★★★ [<%= file.relative %>]"))
})
//(3)***html copy dist***//
gulp.task("Dhtml",function(){
    return gulp.src([config.html.src,config.fonts.src,config.img.src,config.assets.src], {base: './src'})
        .pipe(gulp.dest(config.html.dist))
        .pipe(reload({stream: true}))
        .pipe(notify("html==>dist==>> 完成 ★★★★★ [<%= file.relative %>]"))
})
//(4)***做版本***//
gulp.task("Drev",function () {
    return gulp.src([config.rev.src,config.html.src])
        .pipe(changed(config.html.src))
        .pipe(gulpcollector({replaceReved:true}))
        //.pipe(minifyHtml({empty:true,spare:true,quotes:true}))
        .pipe(gulp.dest(config.html.dist))
        .pipe(reload({stream: true}))
        .pipe(notify("html页面刷新完成==>>dist 完成★★★★★ [<%= file.relative %>]"))
})
//(5)***合并重命名***//
gulp.task("Dconcatcss",function(){
    gulp.src(config.css.concatArr)
        .pipe(concat(config.css.rename))
        .pipe(rename(function (path) {
            path.basename+=".min";
            path.extname=".css"
        }))
})
gulp.task("Dconcatjs",function(){
    gulp.src(config.js.concatArr)
        .pipe(concat(config.js.rename))
        .pipe(rename(function (path) {
            path.basename+=".min";
            path.extname=".css"
        }))
})
/*********不做版本的task NB***********/
gulp.task("NB",function(callback){
    gulpSequence(["Dhtml","Dcss","Djs"])(callback)
})
/*********做版本的task DB***********/
gulp.task("DB",function (callback) {
    gulpSequence(["Dhtml","revFonts","revImg","revAssets","revcollectorcss","revcollectorjs"],"Dcss","Djs","Drev")(callback)
})
// ******生产环境的服务器********//

gulp.task('Dbrowser',function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port:8888
    });
});
gulp.task("aa",function (callback) {
    gulpSequence("revcollectorcss","Dcss","Drev",callback)
})
gulp.task("bb",function (callback) {
    gulpSequence("revcollectorjs","Djs","Drev",callback)
})
gulp.task('cc',["Dbrowser","DB"],function () {
    gulp.watch(config.less.src, ["aa"]);
    gulp.watch(config.html.src,['Drev']);
    gulp.watch(config.js.src, ["bb"]);
})
