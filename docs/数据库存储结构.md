##数据库存储结构
+ PersonalInformation:  
个人信息表，存储所有用户的信息

  + ID(int):用户的序号
  + Name(string):用户的昵称
  + Graph:用户的头像图片
  + PhoneNumber(int):联系电话
  + Score(int):个人的分数

---

+ ShadowTable:  
密码表，存储所有用户的密码

  + ID(int):用户的序号
  + Shadow(string):仅限英文和数字

---

+ RightsTable:  
权限表，存储所有用户的权限

  + ID(int):用户的序号
  + Rights(string):用户的权限，用|分割，如：publish|view

---

+ AskQuestionTable:  
问答题表，存储所有问答题的数据

  + ID(int):题目的序号
  + description(string):题目描述
  + score(int):题目分数
  + time(string):出题时间,2016.10.22
  + author(int):出题人的ID

---

+ MultipleChoiceTable:  
选择题表，存储所有选择题的数据

  + ID(int):题目的序号
  + description(string):题目描述
  + choices(string):题目选项描述,分割|选项,如：http无状态|http有状态
  + correct(int):正确选项
  + score(int):题目分数
  + time(string):出题时间,2016.10.22
  + author(int):出题人的ID

---

+ AnswerTable:  
所有题目回答的列表

  + ID(string):题目的序号
  + title(string):题目的标题
  + type(string):题目的类型
  + userID(int):该答案所属用户的ID
  + answer(string):题目回答信息
  + state(int):回答状态，0:未审核,1:已通过,2:未通过

---

+ QuestionTable:  
所有题目回答的列表

  + ID(int):题目的序号
  + title(string):题目的标题
  + type(string):题目的类型

---

+ TeamWorkTable:  
组队题表，存储所有问答题的数据