# 缩进用tab还是or空格？

遇到两次坑，一次是coffe，一次是yaml……

* __Yaml__ 必须是空格，默认2个
* __Markdown__ 可tab可空格，但空格必须4个
* __Python__ 都可以，不能混用
* __Javascript__ 都可以，可以混用
* __Go__ 默认tab

so，貌似最兼容的只能是4个空格……

但4个实在是有点大，还是根据不同语言设不同的默认缩进吧（但仍不能指望每个人都不掉坑……）

## Sublime里，根据不同语言设不同的缩进的方法如下：

打开某语言进入编辑状态，然后依次选：`Preferences -> Settings More -> Syntax Specific - User`

以CoffeeScript为例：
```json
{
	"translate_tabs_to_spaces": false
}
```
以YAML为例：
```json
{
  "tab_size": 2,
  "translate_tabs_to_spaces": true
}
```
