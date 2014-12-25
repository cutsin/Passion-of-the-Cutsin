# 为什么要省略html标签

## 理由

项目中根据[《可省略的html标签及其实践》](https://github.com/cutsin/Passion-of-the-Cutsin/blob/master/2012/10/%E5%8F%AF%E7%9C%81%E7%95%A5%E7%9A%84html%E6%A0%87%E7%AD%BE%E5%8F%8A%E5%85%B6%E5%AE%9E%E8%B7%B5.md)，大量使用了不闭合标签、标签多样性原则，归纳了下，有以下5个理由：

1. __优化传输：__省略字符，减少bytes，节省流量

2. __提高性能：__我们有大约100种标签可以使用，让标签的种类尽可能多样化（比如原来多是div/p/li，现在能用的全招呼上），能有效减轻querySelector的遍历负担（如getElementsByTagName）

3. __正确处置[white-space processing model](https://github.com/cutsin/Passion-of-the-Cutsin/blob/master/2011/04/white-space%20processing%20model%E7%AE%80%E4%BB%8B.md)：__通常我们将如下结构显示为`li{display:inline-block}`时，按照规则，[空白字符](http://www.w3.org/TR/html5/infrastructure.html#space-character)会合并为一个空格，而“额外”的空格会对样式控制造成不必要的麻烦。 通过省略`</li>`可以避免这个问题，原理见第4个理由；
  ```html
  <ul>
    <li>你</li>
    <li>好</li>
    <li>吗</li>
  </ul>
  ```

4. __不会影响浏览器的性能：__
  
  浏览器解析dom的过程是：文档 → 词法分析 → 语法分析 → DOM树解析
  
  而在解析DOM树的时候，会按照[很复杂的html标记解析规则](http://www.w3.org/TR/2011/WD-html5-20110525/tree-construction.html#parsing-main-inhtml)去处理元素，里面列出了不少需要“[生成隐含的结束标签](http://www.w3.org/TR/html5/syntax.html#generate-implied-end-tags)”的情况，而具体的做法是：
  
  如果执行某条规则时，下一步需要浏览器生成隐含的结束标签，而且当前节点是 dd, dt, li, option, optgroup, p, rt [等元素](https://github.com/cutsin/Passion-of-the-Cutsin/blob/master/2012/10/%E5%8F%AF%E7%9C%81%E7%95%A5%E7%9A%84html%E6%A0%87%E7%AD%BE%E5%8F%8A%E5%85%B6%E5%AE%9E%E8%B7%B5.md)，浏览器必须将[当前节点](http://www.w3.org/TR/html5/syntax.html#current-node)从[开放元素栈](http://www.w3.org/TR/html5/syntax.html#the-stack-of-open-elements)中弹出。
  
  如果该元素不在上面的列表中，那浏览器也需要完成当前规则，比如抛出[parse error](http://www.w3.org/TR/html5/syntax.html#parse-error)。
  
  由此我们知道，第3个理由中的例子，浏览器相当于在每一个<li>前面加了一个</li>，而源码中的空白字符会被包在li元素里面，而不是li元素之间，而根据规则，这些[空白字符](http://www.w3.org/TR/html5/infrastructure.html#space-character)在解析时会被移除。
  
  而由于这一切都是内置在最基本的html parser之中，所以不会有解析性能影响。（如果有详实的证据请告诉我……）

## 缺点：

1. 对多数IDE不友好：代码折叠会部分受到影响
2. 交付不友好：由于使用inspector获取的html是浏览器的parsed html，所以需要下游工程师（后端/js）通过`view-source:`直接copy源码，而这样阅读起来会很困难，我们总说代码是写给别人看的，好在有很多方法可以帮我们平衡这个问题，比如通过特殊的注释、模块间的换行做出明显区别：
  ```html
  <div class="sth">
    <div>
     ...非常复杂的片段
  <!-- .sth 在这里结束--></div></div>
  
  <div class="bla">
    <div>
     ...非常复杂的bla
  <!-- .bla 在这里结束--></div></div>
  ```

## 推荐配置：

* 一个最简的html文档

  *如用utf-8，可在保存文件时选择with BOM（即\ffef）*
  ```html
  <!DOCTYPE html>
  正文
  ```

* 一个最简且实用的html文档

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN" class="">	<!--不同时指定lang，IE编码不正确；预留class为了打印ua等信息-->
  <meta charset="utf-8">	<!--charset要求出现在文档前129个字符内，可单行出现，也可交织出现-->
  <title></title>	<!--此行可省-->
  	<!--预留此行仅只是为了看起来清晰，便于插入其他标签-->
  </head><body><!--这2个标签单独成行，规避comment-->
  	<!--预留此行仅只是为了看起来清晰，便于插入其他标签-->
  正文
  ```

## emmet去掉安全标签的自闭合

找到Data\Packages\Emmet\emmet\snippets.json文件并打开，然后找到html部分的”abbreviations”行，然后修改为：

```json
	"abbreviations": {
		"li": "<li/>",
		"dt": "<dt/>",
		"dd": "<dd/>",
		"p": "<p/>",
		"rt": "<rt/>",
		"rp": "<rp/>",
		"tr": "<tr/>",
		"th": "<th/>",
		"td": "<td/>",
		"body": "<body/>",
		"html": "<html/>",

		"!": "html:5"
	}
```
