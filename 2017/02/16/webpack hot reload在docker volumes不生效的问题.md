# webpack hot reload在docker volumes不生效的问题.md

在入vue坑的时候，发现改了文件后hot reload没反应，甚至刷新也没反应，找了半天自己的原因也没发现啥问题……

后来怀疑是因为我跑在Docker里，用volumes挂载的工作目录，查了查还真是-_-|||

于是在[文档中](https://webpack.js.org/configuration/watch/)找到了`watchOptions.poll`，意思是改用轮询的方式看文件变没变，虽然挫，但可以了……

vue的配置在`build/dev-server.js`里`webpack-dev-middleware`的位置，跟`quiet`同级。
