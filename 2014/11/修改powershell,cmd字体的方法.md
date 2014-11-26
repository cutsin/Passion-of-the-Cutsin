# 修改powershell,cmd字体的方法

PowserShell或cmd窗口里的字体默认比较别扭，在`属性`里又改不了，后来发现只是编码问题，方法如下：

1. 进入 powsershell 或 cmd，输入 `chcp 850`
2. 右击窗口的`属性` -> `字体`

然后就看到可选的了，我一般选 `Consolas`；
然后可选的字体比较少，想添加得改注册表：
1. 进入 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont`
2. 新建`字符串值`，key填`000`（如果已有`000`，填`0000`，以此类推），value填字体名称即可
