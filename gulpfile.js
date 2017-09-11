
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
var pngquant = require('imagemin-pngquant');//深度压缩图片
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
var requirejsOptimize = require('gulp-requirejs-optimize');//require
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
    js:'dist/js/',
};
var src = {
    root:'./src',
    images:'./src/images/',
    js:'./src/js/'
};
var ver={
    root:"./rev/",
    src:"./rev/**/*.json",
    css:"./rev/css/",
    js:"./rev/js/",
    img:"./rev/images/"
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
    gulp.src([src.root+"/css/*.css",'!'+src.root+"/css/webStyle.css"])
        .pipe(postcss(processors));
    gulp.src(src.root+"/css/**/*")
        .pipe(gulp.dest(dist.root+"/css/"))
        .pipe(reload({stream: true}))
        .pipe(notify("compass==>hack==>dist==>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("compassComplete", function (callback) {
    gulpSequence("compass", "autoprefix")(callback)
});


/**fonts lib app img js/html 移动  **/
gulp.task("moveLib",function(){
    return gulp.src(src.root+"/lib/**/*")
        .pipe(changed(src.root+"/lib/**/*"))
        .pipe(gulp.dest(dist.root+"/lib"))
        .pipe(reload({stream: true}))
        .pipe(notify("lib移动==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("moveFonts",function(){
    return gulp.src(src.root+"/fonts/**/*")
        .pipe(gulp.dest(dist.root+"/fonts"))
        .pipe(notify("fonts==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("moveApp",function(){
    return gulp.src(src.root+"/app/*.js")
        .pipe(changed(src.root+"/app/*.js"))
        .pipe(jshInt())
        .pipe(jshInt.reporter()) // 输出检查结果
        .pipe(gulp.dest(dist.root+"/app"))
        .pipe(reload({stream: true}))
        .pipe(notify("js校验==>dist==>>完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("moveImg",function () {
    return gulp.src(src.root+"/images/**/*")
        .pipe(changed(src.root+"/images/**/*"))
        .pipe(gulp.dest(dist.root+"/images"))
        .pipe(reload({stream: true}))
        .pipe(notify("moveImg ==>> dist 完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("moveAll",function(){
   return gulp.src(src.root+"/*.{js,html}")
       .pipe(changed(src.root+"/*.{js,html}"))
       .pipe(gulp.dest(dist.root))
       .pipe(reload({stream: true}))
       .pipe(notify("moveJs ==>> dist 完成 ^_^ [<%= file.relative %>]"))
});

gulp.task("copy",function(callback){
    gulpSequence(["moveLib","moveFonts","moveApp","moveImg","moveAll"],"compassComplete")(callback)
});

gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port:7777
    });
});

gulp.task('watch', function() {
    gulp.watch(src.root+"/*.{js,html}",["moveAll"]);
    gulp.watch(src.root+"/sass/*.scss",["compassComplete"]);
    gulp.watch(src.root+"/app/**/*",["moveApp"]);
    gulp.watch(src.root+"/images/**/*",["moveImg"]);
    gulp.watch(src.root+"/fonts/**/*",["moveFonts"]);
    gulp.watch(src.root+"/lib/**/*",["moveLib"]);
});
/** 开发时，运行 'gulp test' **/
gulp.task("test",function (callback) {
    gulpSequence("copy",'browser',"watch")(callback)
});

/*****部署项目做得版本*****/

gulp.task("revImg",function () {
    return gulp.src(src.root+"/images/**/*")
        .pipe(changed(src.root+"/images/**/*"))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.root+"/images"))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest())
        .pipe(gulp.dest(ver.img))
        .pipe(notify("revImg ==>> dist 做版本完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("revScss",function () {
    var processors = [autoprefixer, cssnext, precss];
    gulp.src([src.root+"/css/*.css",'!'+src.root+"/css/webStyle.css"])
        .pipe(postcss(processors))
        .pipe(base64({
            maxImageSize:1*1024,
            debug:true
        }));
    gulp.src(src.root+"/css/**/*")
        .pipe(css0())
        .pipe(rename(function (path) {
            path.basename+=".min";
            path.extname=".css"
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.root+"/css/"))
        .pipe(reload({stream: true}))
        .pipe(rev.manifest()) //生成一个rev-manifest.json
        .pipe(gulp.dest(ver.css))
        .pipe(notify("compass==>hack==>dist==>做版本完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("revCss",function (callback) {
    gulpSequence("compass","revScss")(callback);
});
gulp.task("revJs",function () {
    return gulp.src(src.root+"/app/*.js")
        .pipe(changed(src.root+"/app/*.js"))
        .pipe(jshInt())
        //.pipe(jshInt.reporter()) // 输出检查结果
        .pipe(uglify())
        //.pipe(rev())
        .pipe(gulp.dest(dist.root+"/app"))
        .pipe(reload({stream: true}))
        //.pipe(rev.manifest()) //生成一个rev-manifest.json
       // .pipe(gulp.dest(ver.js))
        .pipe(notify("js==>压缩==>dist==>做版本完成 ^_^ [<%= file.relative %>]"))
});
gulp.task("revCopy",function(){
    return gulp.src([src.root+"/*.{html,js}",src.root+"/fonts/**/*",src.root+"/lib/**/*"],{base: './src'})
        .pipe(gulp.dest(dist.root))
        .pipe(reload({stream: true}))
        .pipe(notify("html==>dist==>> 做版本完成 ^_^ [<%= file.relative %>]"))
});
/*做版本*/
gulp.task("rev",function () {
    return gulp.src([ver.src,src.root+"/*.html"])
        .pipe(changed(src.root+"/*.html"))
        .pipe(gulpcollector({replaceReved:true}))
        //.pipe(minifyHtml({empty:true,spare:true,quotes:true}))
        .pipe(gulp.dest(dist.root))
        .pipe(reload({stream: true}))
        .pipe(notify("html页面刷新完成==>>dist 做版本完成 ^_^  [<%= file.relative %>]"))
});
//***更改sass文件中版本的引用***//
gulp.task("revcollectorcss",function () {
    return gulp.src([ver.src,src.root+"/sass/*.scss"])
        .pipe(gulpcollector({replaceReved:true}))
        .pipe(gulp.dest(dist.root+"/css/"))
        .pipe(reload({stream: true}))
});
//***更改js文件中版本的引用***//
gulp.task("revcollectorjs",function () {
    return gulp.src([ver.src,src.root+"/js/*.js"])
        .pipe(gulpcollector({replaceReved:true}))
        .pipe(gulp.dest(dist.root+"/js/"))
        .pipe(reload({stream: true}))
});
gulp.task("paying",function (callback) {
    gulpSequence(["revCopy","revImg","revcollectorcss","revcollectorjs"],"revCss","revJs","rev")(callback)
});

// ******生产环境的服务器********//

gulp.task('Dbrowser',function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port:8888
    });
});
gulp.task("one",function (callback) {
    gulpSequence("revcollectorcss","revCss","rev",callback)
});
gulp.task("two",function (callback) {
    gulpSequence("revcollectorjs","revJs","rev",callback)
});
gulp.task('three',["Dbrowser","paying"],function () {
    gulp.watch(src.root+"/sass/**/*", ["one"]);
    gulp.watch(src.root+"/*.html",['rev']);
    gulp.watch(src.root+"/js/**/*", ["two"]);
});
