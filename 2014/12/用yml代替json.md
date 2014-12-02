# 用 yml/yaml 代替 json

常常看到一些流行的repo里出现`.yml`的文件，里面的语法乍看比较莫名，比如`.travis.yml`：
```
language: node_js
node_js:
  - '0.10'
```

yml/yaml 全称也许是：
*Why A Markup Language?!* or *YAML Ain't Markup Language*

用惯了JSON描述数据的同学，也许遇到过由于丢逗号引起的bug、无法注释致使后继者困扰、花括号嵌套的眩晕等等问题

或许 yml/yaml 可以帮你解脱：
访问：[js-yaml](http://nodeca.github.io/js-yaml/)，输入：
```yaml
human:
  head: file:./mykey
  body:
    arms: [left,right,true,false,null,undefined]
    legs:
      - left:
          toes: [1,2,3,4,5]
      - right:
    # 脚趾头
    toes:
      - 1
      - 2
      - 3
      - 4
      - 5: litte toe
```
