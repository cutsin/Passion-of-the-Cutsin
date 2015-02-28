# Windows 10 装 virtualBox黑屏或断网的解决办法

~~2个月前因为Vagrant依赖的Virtualbox在 Windows 10 里无法启动，被迫回滚到了Windows 8.1，但其实[当时问题已修复了]
(https://www.virtualbox.org/ticket/13665)，只是没出新包。~~

~~昨天新的release已释出（4.3.22），放假可以重回 Windows 10 了，oh yeah! :joy:~~

更新：

尝试装了4.3.22以及最新的测试版4.3.23-98674仍然不行，困扰了好几天……

后来想起，有一次黑屏前首先是断网了，而之前装VirtualBox的时候，它本身提示了需要断网，原因是要装bridged network，会搞出一个物理设备，好吧……

然后再次重装系统（我就1个盘不好做ghost，微软的还原点也无法正确还原错误……）

最后安装VirtualBox的时候，不选择bridged network即可（需要保留host-only access）
