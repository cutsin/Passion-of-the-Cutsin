# data:image;base64的缺陷

除去IE系列，有几个最主要的：

* base64相对图片会增加33%的体积，虽然可以被gzip减少2-3%；
* 无法被缓存，包括background方式，这意味着每次重载它的包含文件时（如css、html）都要重新编码
* 兼容性：数据被包含为简单流的形式，而许多处理环境（如web浏览器）可能不支持使用包装器（如邮件的`multipart/alternative`或`message/rfc822`）来提供像metadata、data compression或content negotiation那样的复杂性。假如用户在web浏览器中复制了base64的内容，粘贴在如邮件、office这样的环境中，将无法显示。

参考：<http://en.wikipedia.org/wiki/Data_URI_scheme>
