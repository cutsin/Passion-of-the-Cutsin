# 当软链接遇上virtualBox、vagrant、npm

上周不慎把win10升到了10049，openvpn、vagrant/virtualbox统统不能用了……

好在ssd重装很快，重来一遍后，用了centos7的box，但发现npm装某些报的时候，报类似`ENOENT: symlink xxx`的错误

虽然加参数`--no-bin-link`可以解决，我本身也要用[/vagrant共享文件夹的软链接](/2014/12/vagrant中npm install路径名超长报错.md)啊~~

查了一下好像是virtualBox存在已久的bug，有人说通过参数可以开启这个设置，在vagrant里大概是这样的：
```ini
config.vm.box = "base"
# 如果你的box名是base
config.vm.provider "virtualbox" do |vb|
  vb.name = "base"
  vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/base", "1"]
end
```

~~然后`vagrant reload`就解决了，不过莫名其妙的是我后来去掉这段配置再次`vagrant up`，依然正常…… :sob:~~ 似乎reload无效，需要`vagrant destroy`然后重新配置一下
