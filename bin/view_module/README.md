## Rights_management
---
**isAvailable:**  
查找某用户是否拥有某个权限  

参数：  
+ ID：查找用户的ID
+ right：查找的权限
+ callback：回调函数，sql查询完毕后会调用此函数，并传入参数  
  + bool:true(该用户有此权限),false(该用户无此权限)
