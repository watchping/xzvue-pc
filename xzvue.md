
# 三.懒加载
1.问题：单页面应用首屏加载速度极慢！
2.原因：
(1).Vue项目发布时，要用npm run build打包、压缩、编译代码为浏览器可以直接使用的传统的html,css和js
演示npm run build
dist目录没有vue文件了
(2)默认情况下，npm run build会将整个项目中所有的js,打包在一个js文件中，将所有的css打包在一个css文件中，这2个文件体积会相当大！
(3)所以，如果将来网页必须等着两个文件下载完才能使用，当然加载速度极慢！
3.解决:懒加载
(1).懒加载就是指用哪个页面，就只下载哪个页面的内容，不用的页面内容，暂时不下载或者暂缓下载。
比如说：只看首页，就只看首页的js和首页的css，其他页面比如详情页和商品列表页面的js和css暂缓下载。用户何时需要看其他页面，再下载其他页面的内容。
4.如何：
(1)Vue脚手架默认的懒加载方式：分开打包，异步自动下载！
Src/router/index.js中：
//不要用import引入需要懒加载的页面
routes:[
	{path:"/",component:Index},//首页不需要懒加载
	{
		path:"/details/:lid",
		component:()=>import(/* webpackChunkName:"details" */ "../views/Details.vue"),//临时引入需要的页面组件,单独打包当前页面组件的内容，并将其命名为details.js
		props:true
	}
]
结果：1)npm run build时，会将每个懒加载的页面单独打包为一个js文件，文件名就是webpackChunkName配置的文件名。
2)当访问首页时，仅加载首页组件的内容，其余懒加载的组件内容，在后台异步悄悄下载，不影响首屏加载速度！
3)问题：虽然分开打包，但不需要看的页面依然在后台悄悄下载，浪费流量。
注意js文件引用时的参数prefetch

(2)更懒得加载，课节约流量
a.要在上一种情况的基础上再进行配置
b.再vue脚手架项目的跟目录，新建一个文件:vue.config.js
module.exports={
	chainWebpack:config=>{
		config.plugins.delete("prefetch") //删除页面引用js时的rel="prefetch"属性，禁止后台异步下载暂时不需要的其他页面组件——节约流量
	}
}
c.结果：首屏加载时，完全不会加载懒加载的页面！而是当用户确实想跳转到懒加载的页面时，才临时下载加载页面的js文件——节约流量！

练习一
1.解压昨天发的xzvue_start_with_axios.zip文件到当前工作文件夹
2.用vscode打开xzvue文件夹
3.右键单击package.json文件，选择在终端/命令行中打开
4.等淡出的命令行窗口出现xxx>后，在命令行输入npm run serve
看到Compile Successfully说明编译成功
5.按住Ctrl，点击http://localhost:8080，自动打开浏览器，显示当前空脚手架项目的首页，如果端口号变成8081或更大的端口号，说明你开了两个npm run serve,解决：关闭所有的vscode，从第2步重新执行一遍。
6.点击about和home,可以在首页和关于页之间来回切换。

练习二：两个页面(Index,Details)和页头组件(MyHeader)
1.在src/views文件夹中
删除现有的两个文件：Home.vue、About.vue
创建两个.vue文件：Index.vue、Details.vue
2.在Index.vue和Details.vue中分别象征性地写入一个标题，标记当前是哪个页面，如：<h1>这里是XXX页面</h1>
3.在src/router/index.js中配置Index.vue和Details.vue的路由
Index.vue默认加载
Details.vue异步延迟加载，且必须传入参数lid
4.修改App.vue中<router-view>之前的<div>中的两个链接地址为如下内容：
<router-link to="/">首页<router-link>
|
<router-link to="/details/5">详情页<router-link>
5.测试
如果刚才没有关闭npm run serve，不用重新运行npm run serve,网页就已经自动变化了。如果刚才关闭了npm run serve，就需要重新运行npm run serve，打开网页。然后点击顶部的首页和详情页，能够来回切换两个页面，说明本练习成功了。
6.因为页头是所有页面的共有部分，最适合定义为全局组件，所以：
1).在src/components文件夹中新建一个组件文件MyHeader.vue
2).剪切App.vue中<router-view>之前的<div>...</div>到MyHeader.vue组件的<template>内部，App.vue中源<div>...</div>位置可替换为<my-header></my-header>占位。
3).但此时的MyHeader.vue只是一个普通组件，还不是全局组件。
4).在src/main.js中，new Vue()之前，添加：
引入MyHeader.vue组件文件：import MyHeader from "./components/MyHeader.vue
设置MyHeader.vue为全局组件：Vue.component("my-header",MyHeader);
结果：在当前脚手架项目的任何位置都可以使用<my-header>标签引用全局页头组件了
7.重复第5步测试修改结构是否正确？

练习三:把旧版的jquery版的学子商城首页移植到vue脚手架中
(用到public.zip压缩包,解压到当前工作文件夹)
1.先将原jquery项目中不是我们自己编写的代码、图片等复制到脚手架中对应的位置，今后所有不是我们自己编写的文件,一律放在public文件夹下
img文件夹
css文件夹/
 bootstrap.min.css
js文件夹/
 jquery.min.js
 bootstrap.min.js
旧项目中以上文件一律拷贝到脚手架的public文件夹下。 
将来编译项目时凡是放在public下的内容都不会编译而是原样放入打包后的项目中。
2.在唯一完成的index.html页面顶部像旧jquery旧项目一样引入这些固定不变的css和js
 <link rel="stylesheet" href="css/bootstrap.min.css">
 <script src="js/jquery-3.4.1.min.js"></script>
 <script src="js/bootstrap.min.js"></script>
3.试着将旧jquery项目中的首页内容移植到脚手架中首页组件vue中
(因为学子商城的HTML+CSS第二阶段已经学过了,所以这里不再重复编写HTML+CSS)
(1).复制
旧jquery项目(public)的indx.html页面中主要内容部分的HTML
 15行<main id="main" class="container">
 ......
 325行</main>
到
脚手架项目(xzvue)中src文件夹/views文件夹Index.vue中<template>内部
(2).复制:
旧jquery项目(public)的css文件夹中的index.css所有内容
到
脚手架项目(xzvue)中src/views/Index.vue文件的的<style scoped>内部
问题:如果HTML内容和css内容都放在src/views文件夹中的xxx.vue文件内,那么引用到的图片、css以及js的相对路径和以前是不是就不一样了呢?
答:不管写在哪个vue文件中的HTML和CSS,最终都会编译为xxx.js文件，在index.html中引入。
所以vue文件中的图片相对路径,是以index.htlm页面所在位置为准的!因此,即使把html和css代码藏在很深的vue文件中,最终运行时相对路径都是以 index.html为准,和原来旧jquery项目保持不变。
巧记:所有路径都以/开头,/表示网站根目录,在脚手架中指的是public文件夹。


练习四:将轮播图部分封装为一个首页中的子组件
1.在src/components文件夹下新建一个文件夹Index，再在Index文件夹下新建一个Carousel.vue组件文件。
2.将Index.vue中轮播图部分的HTML代码剪切到components中的Carousel.vue组件中的<template>内部,在原轮播图位置暂时写一个自定义标签<carousel></carousel>
3.将Index.vue中轮播图相关的css代码剪切到components中的Carousel.vue组件中的style内部(本例中可省略这步,因为Index.vue中没有Carousel相关的样式)

4.在Index.vue中<script>内export default{}上方引入Carousel.vue组件文件
5.在Index.vue中<script>内export default{}内添加 components成员,设置Carousel对象为子组件
强调:在编写代码过程中,因为可能在代码没有编写完时就自动编译了一次,会遗留一些错误记录。如果确信自己的代码编写完了,可以刷新一下页面,这些编译过程中遗留的错误就会没有了!

练习五：移植页头
1.将旧jquery项目中header.html中的页头主体内容复制到新xzvue项目中src/components/MyHeader.vue中的<template>内部
2.将旧jquery项目中header.css的所有样式复制到新xvue项目中src/components/MyHeader.vue中的<style scoped>内部
讨论：scoped是如何避免组件间样式冲突的？
1.为当前组件内的所有元素添加自定义属性
(1).同一组件内的元素,这个自定义属性名都相同
(2).不同组件之间的元素,自定义属性名各不相同
2.为当前组件中所有自定义的选择器结尾添加属性选择器,以当前组件的自定义属性名为结尾。
(1).以此区分当前选择器只在当前组件内才有效
(2).不同组件之间,即使有完全相同的选择器样式也会因为结尾的这个自定义属性选择器名不同而不会发生组件间样式冲突

练习六:如果有整个项目所有页面共用的css,比如css reset,怎么处理？
因为css reset代码是我们自己编写的,所以必须放在src文件夹中某个位置
选择一:放在App.vue中的<style>中,不要加scoped
复制旧jquery项目中css/base.css中所有css代码到新xzvue项目中src/App.vue中<style>内,不要加scoped

选择二:其实css也可以用import引入的
将旧jquery项目中css/base.css文件拷贝到新xzue项目中src/assets/css文件夹中
(assets文件夹保存一些共用的css或js等附件文件)
在<script>中通过 import "./assets/css/base.css" 引入。
强调:因为import引入的css是在scoped范围之外的，所以scoped无法保证import引入的css不发生组件间样式冲突,所以 import引入的只能依靠咱们自己来避免组件间样式冲突。


练习七:从服务器端请求首页6个商品,显示到Index.vue页面上,且点查看详情可跳转到详情页
1.安装axios:(大家手里的脚手架已经安装了axios,所以这步可省略)
(1).问题:脚手架中默认不带axios
(2).解决:在项目本地安装axios
a.右键点击package.json,选择在终端/命令行中打开
b.在弹出的对话框中出现xxx>之后输入npm i -save axios回车
c.结果:在项目的node_modules文件夹中找到axios文件夹
2.配置axios对象,并将axios对象放入所有组件的原型对中:在main.js中new Vue()之前
(1).import axios from "axios" //引node_modules中安装的模块时不需要加任何路径
(2).配置基础路径: axios.defaults.baseURL="http://xzserver.applinzi.com"
(3).将axios对象放入Vue类型的原型对象中:Vue.prototype.axios=axios
(4).结果:其实不管是全局组件,还是根组件,还是子组件,都是Vue类型的实例，所以在任何组件中都可用this.axios访问到原型对象中的axios对象。
3.在首页组件Index.vue中的<script>中编写js代码
(1).在data(){ return {}}中定义变量准备接收服务器端返回的结果
(2).在mounted()钩子函数中发送axios请求将返回的结果保存到data中对应的变量上备用
4.在Index.vue中<template>中对应位置绑定data中的变量值
5.在App.vue中<style>中添加[v-cloak]{display:none}

jquery项目中:
<a class="btn-primary" href="product_details.html?lid=1">查看详情<a> 
vue中要求
<router-link to="/details/1">查看详情</router-link>

提示：
可以这样获取p1.href中lid的值：p1.href.split("=")[1])
空值引用会出错：p1.price.tofixed(2)，可以这样给数据p1设置默认值 p1: {price:0,href:""} 
接收数据的默认值要求和axios调用从数据库中返回值类型相同
数据others不需要给默认值?如果数组length为0,则v-for一次都不执行,也就不会读取循环元素的内容
在mounted()钩子函数中可以这样发送axios请求
this.axios.get("/index").then(result=>{//异步、延迟
 this.p1=result.data[0]
 ...
}