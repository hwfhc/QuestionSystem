## 前端：
 + 兼容性暂时只考虑chrome
 + 暂时不考虑移动端页面
 + 会用js dom 和 margin布局
 + 推荐学习webpack（打包工具），less（css编译器，写的更舒服），git（协作工具）
 + 了解ajax（前后端交互）
 + 建议代码结构清晰
 
---

## 后台：
 + 模块式开发，使用npm
 + 使用git进行协作
 + 暂时不考虑并发，安全等问题
 + node版本6.10.0，可使用es6语法
 
---

## 目录结构：
+ project1（工作室答题系统）
  + docs(存放说明文档)
    + ProductRequirements.md:需求文档
    + 前端页面说明.md（对每个页面进行说明，注明页面负责人）
    + 后台模块说明.md（说明模块，注明负责人）
    + 后台接口说明.md（说明后台接口所需参数和返回值，注明接口负责人和从属模块）
   + app（存放后台代码）
     + server.js(接受浏览器请求并调用相应函数)
       + AJAX请求为/action/* 
       + 对于页面的请求为/page.html、/page/javascripts/file.js、/page/css/file.css
         +
      + Sign（存放功能性模块，如Sign模块负责登陆和注册）
      + ......
    + public（存放前端页面）
      + page1（一个页面一个文件夹，页面统一命名）
        + javascripts（存放js文件)
        + css（存放css文件）
        + imgs(存放图片等资源)
        + page1.html（页面html文件）
      + page2
        + ......
      + ......
    + node_modules(存放第三方模块，如express，中间件等) 
      + express(使用express框架)
      + ......
    + main.js（node程序启动代码）  

+ project2（组队系统）  
  + 同理  
