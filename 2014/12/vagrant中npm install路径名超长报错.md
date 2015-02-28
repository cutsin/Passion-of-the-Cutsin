# Windows + Vagrant 中 npm install 报路径名超长报错

npm的某个版本（也许是node@0.10.21以后）开始，修改了node_modules中package的目录结构及依赖策略，假设当前目录下已安装了async，而mypackage依赖了async：
```
./node_modules/async
./node_modules/mypackage
```
问题大约是：那么原来的策略是不在mypackage/node_modules下创建async，现在变更为创建。
那么如果依赖层级很深，就会很容易出现类似这样的full path：
```
/vagrant/node_modules/my-app/node_modules/my-apibridge/node_modules/my-model/node_modules/my-package/node_modules/my-package/node_modules/my-package/node_modules/my-package/node_modules/my-package/node_modules/superagent/node_modules/form-data/node_modules/combined-stream/node_modules/delayed-stream/lib
```
如果装了 windows 版的 node，在 powershell 中运行能看到：
`...directory name must be less than 248 characters`，即 Windows 下完整路径不能超过248个字符（MAX_PATH）
囧……

然后最新的npm版本已到2.x了，不会轻易再改策略的样子……
Windows党肿么办…… 这卡了我好久……

最后只能靠符号链接了……
```bash
# 假设你的app都在vagrant的共享目录下
cd /vagrant
mkdir ~/node_modules.shadow
ln -s ~/node_modules.shadow/ node_modules
npm install
```
注意要以管理员身份运行起vagrant，不然创建软链接会报错

ps：其实有[面对应用程序的解决方案](http://www.ibm.com/developerworks/cn/java/j-lo-longpath.html)，但为毛操作系统都64位了，这种问题还是存在呢？
