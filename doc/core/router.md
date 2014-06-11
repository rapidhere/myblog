Blog核心框架：Router部分
========================

没有用REST方案，所有的路由调用通过`Router.all`。关于路由底层的详细信息可以参考Express框架的文档。

路由文件置于每一个app目录下，并且统一命名为`routes.js`。启动的时候框架会自动加载**已经注册**的app的路由文件。

路由文件直接`exports`一个列表，表示路由规则。每一个单独的路由规则是一个列表，格式为
```javascript
[<Require: express favor URL pattern>, <Optional: A list of middleware under this url>, <Require: handler function>]
```
中间件列表可以是嵌套的数组，Router在加载路由规则的时候会使用`underscore.flatten`来扁平化处理。