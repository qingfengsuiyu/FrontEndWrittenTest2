# React + Vite

2题目二：React项目搭建及开发antd组件库使用
1.通过vite脚手架搭建react18项目
2.集成React Redux
3.集成React Router
a.创建一个/login的路由
b.默认跳转到/login
c.使用路由懒加载
4.集成antd组件库
a.配置antd主题变量为 #1890ff
5.使用 react函数式语法和antd组件库根据原型编写/login页面代码

根据要求，完全实现各各表单逻辑，一定程度保持页面样式优美（样式和逻辑完成度越高得分越高）

5.登录模块
a.用户名输入框：必填，不超过6位数，可以为纯数字、纯英文字母(不区分大小写) 或者 数字与英文字母组合;
b.密码输入框：必填，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符；
c.点击忘记密码切换表单为忘记密码模块，点击快速注册切换到快速注册模块
d.点击登录验证表单，验证通过后存储表单数据至React Redux和localStorage

6.快速注册模块
a.用户名输入框：同登录用户名
b.手机号输入框：必填，1（3,4,5,6,7,8,9）开头的11位数字
c.密码输入框：同登录密码验证。
d.验证码输入框：必填，六位数字
e.发送验证码按钮：填写了手机号后才可点击，30s倒计时
f.点击忘记密码切换表单为忘记密码模块，点击马上登录切换表单为登录模块
g.点击立即注册，验证表单，验证通过后存储表单数据至React Redux和localStorage

7.忘记密码
a.手机号：同用户注册手机号规则
b.新密码：同登录密码验证。
c.验证码输入框：同上
d.发送验证码按钮：填写了手机号后才可点击
e.点击立即登录切换表单为立即登录模块，点击快速注册切换表单为快速注册模块
f.点击确定，进行表单验证，验证通过后存储表单数据至React Redux和localStorage