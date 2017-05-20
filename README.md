## 前端：
 + 兼容性暂时只考虑chrome
 + 移动端页面以768px为分界点
 + 会用js dom(后台传数据渲染页面) 和 margin布局
 + 学习less（css编译器，写的更舒服），git（协作工具）
 + 了解ajax、json（前后端交互）
 + 建议代码结构清晰（便于以后扩展功能）
 
---

## 后台：
 + 模块式开发，使用npm
 + 使用git进行协作
 + 暂时不考虑并发，安全等问题
 + node版本6.10.0，可使用es6语法
 
---

## 目录结构：
<ul>
 <li>project1(工作室答题系统)
   <ul>
     <li>docs:存放说明文档
      <ul>
      <li>ProductRequirements.md:需求文档</li>
      <li>PageList.md:对每个页面进行说明，注明页面负责人</li>
      <li>Module.md:说明模块，注明负责人</li>    
      <li>DBtable.md:说明mysql数据库中的所有表</li>
      </ul>
     </li>
     <li>app:存放后台代码
      <ul>
      <li>node_modules:存放功能模块，如rights_management等
             <ul>
             <li>rights_management:负责管理 用户的权限</li>
             <li>......</li>
             </ul>
      </li>
      <li>server.js:接受浏览器请求并调用相应函数,相当于一个中转站，并在此处定义一些全局变量
        <ul>
        <li>AJAX请求为/action/*</li>
        <li>对于页面的请求为/page.html、/page/javascripts/file.js、/page/css/file.css</li>
        </ul>
      </li>
      </ul>
     </li>
     <li>public:存放前端页面
       <ul>
       <li>css:存放所有css文件的文件夹，应有对应html页面前缀</li>
       <li>javascripts:存放所有js文件的文件夹，应有对应html页面 </li>
       <li>page1:存放某功能对应所有html文件的文件夹
       </li>
       <li>page2</li>
       <li>......</li>
       </ul>
     </li>
     <li>tools:存放辅助开发的脚本 </li>
     <li>node_modules:存放第三方模块，如express，中间件等)
       <ul>
       <li>express:使用express框架</li>
       <li>......</li>
       </ul>
     </li>
     <li>main.js:node程序启动代码</li>
   </ul>
 </li>
 <li>project2:组队系统
    <ul>
      <li>同理</li>
    </ul>
 </li>
</ul>
