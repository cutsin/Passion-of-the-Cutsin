# 不搭私有npm如何使用coffee

一般用到CoffeeScript的项目，可以通过分开src/lib工作区，然后用npm的prepublish来解决，即：
```javascript
{
  "index": "lib/index.js",
  "prepublish": "coffee -mo ./lib ./src"
}
```

但如果[不想搭私有npm，直接引用git package](../11/commit-ish中的ish是什么意思？.md)，就会有个小问题：

## 在哪个阶段编译？

1.`prepublish`是不行了，`preinstall`？ 囧rz...
2. 强制每次必须跑npm test？ 囧rz...
```javascript
{
  "test": "coffee -bco lib/ src/ && node test"
}
```

最后还是这样吧…… 每次要发布时，输入：`npm run pub`，即依次执行：复制 -> 编译 -> 提交
```javascript
  "main": "lib/index.js",
  "scripts": {
    "publish": "npm run build && npm run commit",
    "build": "npm run clone && npm run compile",
    "compile": "cd ./lib && coffee -bc ./ && find ./ -name '*'.coffee'*' -exec rm -rf {} \\;",
    "clone": "cp -urf ./src/* ./lib/",
    "commit": "git add -A && git commit -am 'npm run pub' && git pull && git push"
  },
```
