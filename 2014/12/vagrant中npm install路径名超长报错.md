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
# 假设你的git仓库在/vagrant/appName，创建linux目录：~/node_symbolic_links/appName/node_modules
cd /vagrant/appName
ln -s ~/node_symbolic_links/appName/node_modules/
npm install
```
这里还会遇到软连接的坑，virtualbox跨系统创建软连接会遇到权限问题，可能的解决方案如下：
  1. 当前用户没创建的权限，进入cmd，然后输入：`whoami /priv`，如果看不到`SeCreateSymbolicLinkPrivilege`，可以尝试运行`secpol.msc`，进入本地策略->用户权限分配->创建符号链接，把当前用户或Users组添加到这里（不过我始终不能无法通过这个方案）
  2. 直接以管理员身份运行起vagrant
  3. virtualbox本身的问题：[当软链接遇上virtualBox、vagrant、npm](/2015/04/当软链接遇上virtualBox、vagrant、npm.md)

ps：其实有[面对应用程序的解决方案](http://www.ibm.com/developerworks/cn/java/j-lo-longpath.html)，但为毛操作系统都64位了，这种问题还是存在呢？
