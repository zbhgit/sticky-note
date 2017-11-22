### 搭建初始环境
**默认安装了node,npm,git**
> 利用Express应用程序生成器[详细见官网(中文)](http://expressjs.com/zh-cn/starter/generator.html)
安装搭建工具
```
$ npm install express-generator -g

```
初始化环境
```
$ express --view=ejs project_name
```
安装依赖
```
$ cd project_name
$ npm install
```
启动bin目录下的www文件
```
$ node ./bin/www
```
启动成功后,即可在[localhost:3000](localhost:3000)查看效果

> 利用git管理项目
```
// 创建初始仓库
$ git init 
```

