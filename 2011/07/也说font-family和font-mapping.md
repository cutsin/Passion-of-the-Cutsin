# 也说font-family和font-mapping

__需求1__：新项目中，默认的中文字体是微软雅黑，虽然我始终认为雅黑不适合大面积阅读，but it’s my job.
__需求2__：项目上线后，和最初的担心一样，出现许多不满的声音，于是，需求又来了：让用户可以自行选择字体。

这是拿错误的方法去解决错误的问题…… but that’s my job.

## 实现过程中几个值得注意的问题：

### font-family的理想书写顺序

要兼顾win/mac，应是：
```css
{font-family:Helvetica,Tahoma,Arial,'Microsoft YaHei'}
```
目的显而易见：
* 英文字体的显示，mac优先`Helvetica`，而win中通常没有，所以默认`Tahoma`，备用为`Arial`
* 中文字体的显示，优先雅黑，如果没有遵从系统的fallback规则；
* 按照标准，`sans-serif`置后，如果不加，一些浏览器会解析错误。

### 对付Windows的font mapping

* 由于Windows注册表里的font mapping会将`Helvetica`映射为`Arial`，所以实际上上例的`Tahoma`不会生效，而且实际上`Arial`也不会生效，直接显示为雅黑，纠结了好久，就在几欲放弃`Helvetica`之际，救星出现了，它就是`Helvetica Neue`，绝大部分mac用户的系统上都有这个字体，而这个字体不在windows的font mapping中，虽然它看起来要粗壮一些，貌似macOSX/iOS会自动根据分辨率、字体粗细调整`Helvetica`字族的显示，看数据可知：`Helvetica`的安装率接近100%，`Helvetica Neue`在95%左右，而且过段时间后，我发现twitter, wordpress等，也是不约而同地用它作为前置（窃喜），so，它是可靠的：
```css
{font-family:'Helvetica Neue',Tahoma,Arial,'Microsoft YaHei'}
```

* IE6/7中，如果用户自行更改了浏览器默认中文字体，而`font-family`中的中文字体前面设置了英文比如（`Arial`, `SimSun`），那么此`font-family`会被无视
没找到解决办法，只能将中文字体放在最前面了。

* IE8/9中，如果用户自行更改了浏览器默认中文字体，而`font-family`指定了`sans-serif`，那么此`font-family`会被无视
而如果统一不写`sans-serif`，Chrome等部分浏览器，也会无视`font-family`，纠结了好久，还是上hack……
但由于常用的`\9`、`\0`不能用于`font-family`，所以只能祭出`@media screen\0`
综上，最终的方案如下：
```css
body,input,textarea,select {font:normal 12px/1.667 'Helvetica Neue',Tahoma,Arial,'Microsoft YaHei',\5fae\8f6f\96c5\9ed1;*font-family:'Microsoft YaHei',Tahoma,Arial;color:#333}
.noClearType body,.noClearType input,.noClearType textarea,.noClearType select {font-family:Tahoma,Arial}
.FontYahei body,.FontYahei input,.FontYahei textarea,.FontYahei select {font-family:'Helvetica Neue',Tahoma,Arial,'Microsoft YaHei',\5fae\8f6f\96c5\9ed1,sans-serif;*font-family:'Microsoft YaHei',Tahoma,Arial}
.FontSimsun body,.FontSimsun input,.FontSimsun textarea,.FontSimsun select {font-family:'Helvetica Neue',Tahoma,Arial,SimSun,\5b8b\4f53;*font-family:SimSun}
.FontSys body,.FontSys input,.FontSys textarea,.FontSys select {font-family:'Helvetica Neue',Tahoma,Arial,sans-serif;*font-family:'Helvetica Neue',Tahoma,Arial}
@media screen\0 {
	.FontSys body,.FontSys input,.FontSys textarea,.FontSys select {font-family:'Helvetica Neue',Tahoma,Arial}
}
```
