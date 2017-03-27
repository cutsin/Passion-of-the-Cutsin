# Alpine安装Phantomjs.md

在Docker里运行karma跑测试，会报：

```bash
[launcher]: PhantomJS have not captured in 60000 ms, killing.
```

被这个问题困扰了找了很久，也找了很多资料，最后定位到phantomjs实际上没有在alpine里安装成功，报symbol not found：
```bash
ldd ./node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs
```

然后原因找了很久……
最后的方案如下：

> Since Phantomjs-prebuilt has been compiled for glibc environments, ot musl which Alpine Linux uses.
> 
> So, we need install binary package manually: [https://github.com/dustinblackman/phantomized](https://github.com/dustinblackman/phantomized)
> 
> In future, Phantomjs may went to be a alpine package.

基本上是补了些lib包，[以后估计能apk add phantomjs了](https://bugs.alpinelinux.org/issues/4664)，然后package.json去掉phantomjs-prebuilt的依赖，安装次序如下：

1. 下载[phantomjs.tar.gz](https://github.com/cutsin/Passion-of-the-Cutsin/raw/master/2017/03/24/phantomjs.tar.gz)
2. 执行 `tar -xzf phantomjs.tar.gz -C /`

### 附注

* `node-canvas` 的依赖：`apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev`
* `node-gyp` 的依赖：`apk add --no-cache python make gcc`
