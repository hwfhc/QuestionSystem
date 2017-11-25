## 文件存储
---
### 调用方法：
第一次加载模块
```js
var config = {
  path: /xxx/xxx,
  hash: 'md5'
}
var fm = require('fm')(config);
```
第N次加载模块
```js
var fm = require('fm');
```
第一次加载时传入配置数据，第N次加载无需再次配置

### config:
+ path:文件存储路径
+ hash:文件命名使用的hash算法


### store(file)：  
将文件存储在指定目录，文件名为文件的md5值，同时将文件名、路径(config中路径的相对路径)存入数据库

### getPath(fileName):
通过文件名在数据库中检索，得到文件路径

### delete(fileName):
通过文件名删除此文件

### 关于文件重复
若要存储一个数据库中已有的文件，则丢弃要存储的文件，只保留数据库中的已有文件