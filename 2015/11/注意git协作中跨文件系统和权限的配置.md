# 注意git协作中跨文件系统和权限的配置

有小伙伴不注意这些的话，会常常出现没意义的冲突。

跨文件系统通常是指linux/windows，常见的是换行回车的不同，windows要对git做以下设置：
```
git config --global core.autocrlf input
or
git config --global core.autocrlf false
```

跨权限主要是指文件的所有者、读写权限等，大家统一设置一下就好：
```
git config --global core.filemode false
```
