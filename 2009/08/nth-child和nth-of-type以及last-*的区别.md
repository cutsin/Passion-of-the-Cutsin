# nth-child和nth-of-type以及last-*的区别

其实很简单：“with the same expanded element name”

而last-*简单理解就是倒序：“after it in the document tree”

默认是：“before it in the document tree”

计算方法同样是an+b-1，并允许取值为odd或even，[看演示](http://moonless.net/demo/24/)

详细介绍：http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
