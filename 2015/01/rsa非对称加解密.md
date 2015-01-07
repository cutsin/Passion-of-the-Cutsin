# rsa非对称加解密

## 前提

无法使用https时，http服务前后端做隐私字符加密。

可选package：ursa、node-bignumber、node-rsa

## todo

* 通过memcache/redis增加nonce防止请求播放
* 最好用https
* 让浏览器端使用pkcs1_oaep

## 几点注意

### 公钥，私钥

* openssl 生成的一般是 privateKey，它同时包含了公钥的系数(Modulus, n)和指数(Exponent, e)，可以从私钥导出公钥
* 目前只靠系数和公钥指数无法反推出key，所以提供 n 和 e 是安全的
* `openssl rsa -in privateKey.pem -noout -text` 得到的参数都是 hex string，大小写无关
* 最后的密文都是 hex to base64

### pkcs1和pkcs8方案的区别

一般各种库都会自动辨别，不用指定，勿掉坑。
* pkcs1: '-----BEGIN RSA PUBLIC KEY-----'
* pkcs8: '-----BEGIN PUBLIC KEY-----'

### pkcs1方案padding填充的区别

* `RSA_PKCS1_PADDING`(pkcs1) 默认填充
* `RSA_NO_PADDING` 不填充
* `RSA_PKCS1_OAEP_PADDING`(pkcs1_oaep) 随机填充，安全性最高，[Tom Wu](www-cs-students.stanford.edu/~tjw/jsbn/)的jsbn未支持

## Usage

## Code
