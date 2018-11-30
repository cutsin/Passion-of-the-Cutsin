# 可携带的Windows 10

### 需求其实很简单：
1. 便携，不用每天背电脑
2. 数据安全

### 面临的问题：

1. Windows默认不能安装在USB设备上
2. 但提供了**Windows To Go**方案支持USB设备，但限定了只能装企业版，企业版的诸多问题暂且不提
3. 目标是用**Windows To Go**按照专业版，以保证能正版激活

### 硬件清单：
1. Surface Pro 6，预装专业版
2. 三星T5 SSD加密盘

### 软件清单：
1. [Rufus](https://github.com/pbatard/rufus/releases)，最快的USB引导生成工具，支持**Windows To Go**
1. 官方的专业版镜像，注意不能是Media Creation Tools下载的镜像，Rufus也无法支持，据开发者说是官方自己的api不同
 
  这里提供一个下载：
  `SHA1: 82091d67fff5b49726ffc22d35d9c1cbe81dc443`
  `ed2k://|file|cn_windows_10_consumer_editions_version_1803_updated_march_2018_x64_dvd_12063766.iso|4714162176|FB8C05DE594CD7E58D88993652DD2102|/`

### 流程：
1. 先用**BitLocker**给T5盘加密，记好密码
2. 用Rufus加载镜像，GPT引导，选中T5硬盘，然后生成即可
3. 在Windows设置里，搜`Windows To Go`，然后更改引导顺序为**Windows To Go**优先，然后重启就可以了

嗯，最终看起来挺简单的，中间趟了很多坑，不想再提了……

这样做的好处太多了，谁用谁知道 -_,-
