### ThinkJS 入门代码

#### 部署

1. 数据库

- 修改 src/common/config/db.js
- 导入 sql 文件，创建数据库和数据表（db/food_2015-11-16.sql）

> name: 'your database name', // database name
> user: 'username',
> pwd: 'password',

2. 安装 node_module

	npm install

3. 编译并运行后台 es6 代码（请勿修改 babel 版本）

	// 最新 thinkjs 2.0.6 自动会进行 complie 操作
	npm run start

4. 使用 gulp 运行前端代码

	gulp


5. 浏览器打开：http://127.0.0.1:8360/food