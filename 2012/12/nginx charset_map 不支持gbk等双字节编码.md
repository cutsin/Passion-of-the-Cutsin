# nginx charset_map 不支持gbk等双字节编码

（更新：其实应用场景都已不存在了，仅作backup）

我们知道对于中文，windows的默认文件名编码是gbk；linux默认文件名编码是utf-8，所以跨平台作业注定会遇到恶心的编码问题。

nginx的autoindex对编码转换的支持又很不好，即使以gbk显示文件列表，文件的url同样使用gbk编码，于是……

我尝试了很多方案，企图在不装额外模块、只修改配置的情况下解决这个问题，最终仍以失败告终，只有3个选择：

1. 等nginx未来版本解决
2. 用php等外部程序代替autoindex
3. 不使用gbk，或在windows中约束文件名编码为utf-8

标题所指的问题是：nginx.conf中除了可设置`charset sth;`之外，还可使用`charset_map`指定一个编码转换表，比如俄语的2种编码转换：
```
charset_map  koi8-r  windows-1251 {
  C0  FE ; # small yu
  C1  E0 ; # small a
  # ...
}
```
然后我们能找到示例文件：`conf/koi-utf`等，它们可以通过这样的形式代替`charset_map`引用：
```
include include koi-utf;
charset utf-8;
source_charset koi8-r;
```
我本以为依葫芦画瓢替换为gbk映射表即可，于是在示例文件中找到github上的开源项目contrib/unicode2nginx/，里面有个unicode-to-nginx.pl，这是个perl脚本，需要安装perl环境；
装好后，从unicode.org找到windows CP936（即GBK）的编码映射表并下载，然后将原perl脚本小改为：
```perl
require 5.006;

while (<>) {
	# Skip comments and empty lines

	next if /^#/;
	next if /^\s*$/;
	chomp;
open(FILE,">>gbk-utf.txt");
	# Convert mappings

	if (/^\s*0x(.{2,4})\s*0x(....)\s*(#.*)/) {
		# Mapping <from-code> <unicode-code> "#" <unicode-name>
		my $cs_code = $1;
		my $un_code = $2;
		my $un_name = $3;

		# Produce UTF-8 sequence from character code;

		my $un_utf8 = join('', map { sprintf("%02X", $_) } unpack("C*", pack("U", hex($un_code))));

		print "    $cs_code  $un_utf8 ; $un_name\n";
print FILE "    $cs_code  $un_utf8 ; $un_name\n";

	} else {
		warn "Unrecognized line: '$_'";
	}
}
close(FILE);
```
得到文本文档后，去掉后缀.txt并配置好nginx.conf，重启，报错……

尼玛！原来nginx只支持utf-8和单字节编码！

——以上浪费了我半天时间，生命在于折腾。
