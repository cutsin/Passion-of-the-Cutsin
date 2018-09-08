# TypeScript一些问题

花了一些时间配置，总体来看，ts引入了很多不错的概念：interface、enum、泛型、类型推导，各大厂的框架也都使用了ts，各种类型的库，也不少都用ts重构了，但总体看来有几个点不能忍：

## 兼容性

  导入非ts的库非常繁琐（也可能我浅尝辄止了），比如要引入非ts的模块，有几种方法：
  a. npm有的包，使用`@types/`前缀安装，这[利用了npm](https://www.npmjs.com/~types)，官方自动帮你转，但这不是妥妥的滥用公共资源么……
  b. 对于私有库，可以用被弃用的[Typings](https://www.npmjs.com/package/typings)
  c. 简单点，在你项目的根目录下加一个文件`global.d.ts`，内容只写一行也可以：`declare module "*";`，然后在`tsconfig.json`里，添加如下配置：
  ```json
  {
    "compilerOptions": {
      "typeRoots": ["."]
    }
  }
  ```
 
## 书写

  相对es6还是啰嗦太多，就算有snippets，就算有vscode加持，还是啰嗦，不能忍；
  
  对于应用型的场景，枷锁还是太多，又不是做框架，我感觉还是es比较流畅
 
## TSLint

  官方推荐的，是`tslint:recommended`，默认的rule包括：始终要写分号、要用双引号、逗号在块的末尾也要写…… 不能忍
  
  改了rules就是跟社区过不去，不改，就是跟自己过不去

## IDE

  轻量的除了亲生的vscode，其他基本不好用，而vscode那个速度…… 不能忍

## 未来

  之前趟过coffee的坑，ts又不像dart，有flutter这样的强场景在，谁知道ts会不会是下一个coffee，万一以后es加入了类型呢？而且未来不是wasm的么……
  
## 结语

   人生苦短，花了2天时间，还是决定暂时放弃，观望下，或许前面的问题都被时间解决的差不多了，再入坑不迟，而且与其花时间在同是ecma实现的ts上，还不如花时间看看dart，嗯就这样。
