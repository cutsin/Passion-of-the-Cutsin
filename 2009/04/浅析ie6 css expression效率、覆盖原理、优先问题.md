浅析ie6 css expression效率、覆盖原理、优先问题

通常expression就是不标准、效率低、消耗大、不稳定的代名词，原因大家都知道，很早以前就知道用简单的表达式和重置可以克服这个问题，但由于以前一直规定不允许用expression，所以也没细看是怎么重置的，知道最近看了`old9`去年的文章才略知一二，其实原理很简单，无非就是利用级联的规则重新赋值，从[这个例子](http://moonless.net/demo/18)可以看到，ie6仍是按照css的级联规则来决定是否、何时执行expression，而expression的执行次数除了事件之外，和它所能作用的元素的个数有关，重置其实是为html标签增加style属性（Inline Styles），而Inline Styles优先级通常是最高的，所以内部样式、外联样式定义的expression不再执行，也就达到了我们的目的：减少expression多次执行带来的灾难。

个人觉得对于IE6这种东西，用简单的expression修正一些不舒服的bug是完全没有问题的，比如IE6不缓存背景图的bug：
```css
body {_zoom:expression(function(x){document.execCommand(‘BackgroundImageCache’, false, true);x.style.zoom=1;}(this))}
```
没有max-width、max-height，ie6对于元素的高宽难以限制，也可以用这种方法；
有人会说用脚本更好，但举个例子吧，我们都遇到过图片缩放问题，用户上传了分辨率超大的图片，如何限制在一个较小的区域内并且等比缩放呢？用脚本缩放会出现一个情况，在网络较慢的时候，页面会先显示一张大图，然后瞬间被缩放，图多的时候尤为明显，IE6中onload事件对这个点的判断不太准确，这里有两个例子：

* haslayout渲染与不渲染时，onload的区别
* expression、onload、window.attachEvent的执行次序

所以，如果要将图片缩放到75*100，可以这样，思路是先加载，再处理：
```css
img {max-width:75px;max-height:100px;_zoom:expression(function(x){var w=x.width||x.offsetWidth,h=x.height||x.offsetHeight);if(w>75&&75*h/w<=100)x.style.width=75;if(h>100&&100*w/h<=75)x.style.height=100;if(x.style.width!=''||x.style.height!='')x.style.zoom=1}(this))}
```
但事实上这样的效率也不怎么样，要给所有img赋style.width/height并判断，最后才取消expression；
==2009.4.4补充==============
用expression处理图片不稳定，img onload与否不好判断，还是不建议这么用。
============================
另一种流行的解决方法是用脚本，思路是先处理，再加载（[查看示例](http://moonless.net/demo/18/02.html)）

在允许使用expression的前提下，适度使用还是可以的，退一步说，IE6早晚都消亡，应该给IE6的用户培养这样一种感觉：“IE6效果不好、速度慢，升升级是不是好点……”囧~
