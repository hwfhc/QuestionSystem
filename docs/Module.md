## **全局变量**:
+ root：  
存储全局变量的对象，模块初始化时传入

  + app:指向express应用
  + directory:字符串，public目录的绝对路径
  + modules.......(挂载所有模块)

## 模块：
### **说明**:
 + 模块接口：各个模块在初始化时将自己的接口挂载到express应用上

---

### **rights_management**（权限管理模块） by：开水专烫鸡
管理权限的模块，能查找某个用户是否拥有相应权限。管理员能通过此模块添加、删除特定用户权限。  
每个用户在数据库中拥有一段权限字符串，权限管理模块可以读取该字符串(直接连接到数据库)。

权限表：
 + publish：发布题目
 + answer：回答题目
 + view：查看所有题目
 + view_personal_information:查看他人信息
 + admin:超级权限

依赖：
 + tag_set

方法：
 + isAvailable(user,right):  
判断某用户是否拥有某个权限
    + true：用户存在且拥有该权限
    + false：用户不存在或没有该权限


 + Add(user,right):  
为某个用户添加某个权限，若已拥有该权限则不重复，内存中和数据库中都添加
    + true：用户拥有该权限
    + false：用户不存在或没有该权限


 + Delete(user,right):  
删除某个用户的某个权限，内存中和数据库中都删除
    + true：权限删除成功,或用户不存在
    + false：权限删除失败

---

### **publish_module**（题目发布模块）
前端请求发布一个题目时，此模块将数据写入数据库，并且返回一个布尔值代表操作是否成功

接口：
+ /publishPage:  
获取发布题目的页面，前端通过js代码在发布四种题型间切换(切换时不与后台交互)，题目名字不得重复

+ /publishPage/AskQuestion:   
提交一个发布问答题的表单  

  + title:标题(不能为空)
  + description:题目描述(不能为空)
  + score:题目分数(不能为空)


+ /publishPage/MultipleChoice:  
提交一个发布多选题的表单

  + title:题目标题
  + description:题目描述
  + choices[]:题目选项描述
  + score:题目分数
  + correct:正确选项


+ /publishPage/TeamWork:


方法：
+ start():初始化模块，挂载模块拥有接口，返回一个实例对象
+ publishAskQuestion(title,description,score,time,author):  
发布一个问答题(直接连接到数据库)

  + title:题目标题
  + description:题目描述
  + score(int):题目分数
  + time:出题时间
  + author(int):出题人ID


+ publishMultipleChoice：  
发布一个选择题(直接连接到数据库)

  + title:题目标题
  + description:题目描述
  + choices[string]:题目选项描述
  + score(int):题目分数
  + correct:正确选项
  + time:出题时间
  + author(int):出题人ID


+ publishTeamWork(以后再做):  
发布一个组队合作题(直接连接到数据库)

---

### **view_module**（题目查看模块）
前端请求查看所有的题目时，此模块将数据从数据库中调出，然后以json的格式传回，并有查看题目详情，出题人判断是否给分(直接操作数据库)

接口：
+ /questionList:  
请求显示题目列表的页面

+ /questionList/questionDetail?title= &type= :  
请求显示题目详情的页面

+ /questionList/viewAnswer?ID= ：  
查看答题人答题详情，ID(用户ID),拥有判断是否给分按钮

+ /questionList/correct:  
判断是否给分，post传递数据，ID(用户ID),ID(题目的序号),judge(布尔值，指示是否给分)

方法：
+ start():初始化模块，挂载模块拥有接口，返回一个实例对象

+ GetQuestionList():  
获取所有题目的列表

+ GetQuestionDetail(ID):  
获取题目的详情,根据session和cookie判断请求者是否为出题人  
若是出题人则还要返回答了此题的用户的列表（并显示答案目前状态），出题人点击该用户获取该用户答题详情
  + ID:题目的序号

---
### **answer_module**（回答模块）
当前端请求回答一个题目时，此模块将数据写入数据库，并且返回一个布尔值代表操作是否成功(直接操作数据库)

接口：
+ /answerPage:  
获取答题页面

+ /answerPage/postAnswer:  
获取用户推送的答案，post方法

方法：
+ start():初始化模块，挂载模块拥有接口，返回一个实例对象
+ postAnswer(ID,userID,answer):  
在回答表中增添一个回答

  + ID:题目的序号
  + userID:答题人的序号
  + answer:答案的详情

---

### **personalInformation_module**（个人信息模块）
读取、写入个人信息(直接连接到数据库),可以与其他模块交互

接口：
+ /personalHomePage:    
获取个人主页，前端解析一个json字符串来渲染页面信息

+ /personalHomePage/getPersonalInformation:  
获取个人的信息，返回json字符串

方法：
+ start():初始化模块，挂载模块拥有接口，返回一个实例对象
+ isSignIn():
获取发来的http中的cookie和session数据，若无此数据则判断未登录，发回请先登录页面

---

### **sign_module**（登录注册模块）
登录注册的页面(直接连接到数据库)

接口：
+ /signPage:    
获取登录注册主页，前端通过js代码在发布两种题型间切换(切换时不与后台交互)

+ /signPage/signIn:  
获取登录的请求，post表单

+ /signPage/signUp:  
获取注册的请求，post表单

+ /signPage/logOut:  
清除用户的登录状态


方法：
+ start():初始化模块，挂载模块拥有接口，返回一个实例对象
+ signUp(name,password,repassword,phone_number):  
注册一个用户，写入数据到ShadowTable、PersonalInformation表、呼叫rights_management模块初始化该用户的权限
  
  + name:用户名(不能为空)
  + password:密码(不能为空)
  + repassword:重复密码(不能为空)
  + phone_number:联系电话


+ signIn(name,password):  
用户登录，若登录成功,则在http中设置cookie和session，并返回个人信息页面的url，前端自动跳转到这个url

  + name:用户名
  + password:密码


+ logOut():  
根据http中的session信息，清除用户的session和cookie信息
