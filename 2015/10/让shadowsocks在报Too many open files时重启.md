# shadowsocks服务端报Too many open files

按官方、网友教程改了各种配置，运行一段时间还是会报"Too many open files"，也不想深究原因，干脆在有这个log时自动重启一下算了，反正过程很短：

以CentOS 7 为例

1. 新建脚本：`vi /srv/shadowssocks-checker.sh`，如果状态有问题，重启服务
  ```bash
  if
    systemctl status shadowsocks-libev | tail -1 | grep 'Too many open files'
  then
    systemctl restart shadowsocks-libev
  fi
  
  ```

2. 新建定时任务：`crontab -e`，脚本每分钟执行一次
```bash
*/1 * * * * sh /srv/shadowsocks-checker.sh
```
