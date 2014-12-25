# white-space processing model简介

* __在html源码中，属性前后空白字符会被移除，一个或多个空白字符序列映射为单个词间空格（white-space）__

  [图暂缺]

* __白空格合并规则__ html源码中的回车、换行、制表符、空格会根据包含元素的显示类型合并、忽略或转义，而根据`white-space`属性的不同设置（`normal`/`nowrap`/`pre`/`pre-wrap`等）表现又有所不同。
通常情况下的`white-space processing model`执行步骤：

  [图暂缺]
