# commit-ish中的ish是什么意思？

## npm支持非github的repo吗？

本想搭个私有npm仓库，共享几个项目的package，但觉得npm不会这么弱吧，按理说应该支持啊？
仔细看了看 [npm script](https://www.npmjs.org/doc/misc/npm-scripts.html) 文档，果然…… 不看官方文档必瞎……

其实就是格式的问题，这样即可：
```bash
npm install git+https://github.com/cutsin/passion-of-the-Cutsin.git#commit-ish
```
或：
```json
dependencies: {
  "passion-of-the-Cutsin": "git+https://github.com/cutsin/passion-of-the-Cutsin.git#commit-ish"
}
```
（#号及其后面可选）

这样根本不需要什么私有npm了嘛，无非看不了依赖、被依赖、被下载的数量，对一般的需求足够了；
ps：npmjs.org还提供了对企业的使用方式，即用@前缀，目前免费，例如：
```json
dependencies: {
  "@moonless.net/passion-of-the-Cutsin": "*"
}
```

## 后缀 `-ish` 又是什么意思呢？

查了下，大约是：sort of like something else （某种这类东西），所以在这里，`commit-ish` 大意是：某种commit；`tree-ish` 大意是：树/路径的形式

综上，目测 npm install git+https://xxx.xxx/xx.git#commit-ish，可以用tag/release/sha1/branch等指代版本号(默认master)

最后附张表：
```bash
----------------------------------------------------------------------
|    Commit-ish/Tree-ish    |                Examples
----------------------------------------------------------------------
|  1. <sha1>                | dae86e1950b1277e545cee180551750029cfe735
|  2. <describeOutput>      | v1.7.4.2-679-g3bee7fb
|  3. <refname>             | master, heads/master, refs/heads/master
|  4. <refname>@{<date>}    | master@{yesterday}, HEAD@{5 minutes ago}
|  5. <refname>@{<n>}       | master@{1}
|  6. @{<n>}                | @{1}
|  7. @{-<n>}               | @{-1}
|  8. <refname>@{upstream}  | master@{upstream}, @{u}
|  9. <rev>^                | HEAD^, v1.5.1^0
| 10. <rev>~<n>             | master~3
| 11. <rev>^{<type>}        | v0.99.8^{commit}
| 12. <rev>^{}              | v0.99.8^{}
| 13. <rev>^{/<text>}       | HEAD^{/fix nasty bug}
| 14. :/<text>              | :/fix nasty bug
----------------------------------------------------------------------
|       Tree-ish only       |                Examples
----------------------------------------------------------------------
| 15. <rev>:<path>          | HEAD:README, :README, master:./README
----------------------------------------------------------------------
|         Tree-ish?         |                Examples
----------------------------------------------------------------------
| 16. :<n>:<path>           | :0:README, :README
----------------------------------------------------------------------
```
