# Service Work 极简介

* 需要同源，有协议要求（走https或localhost，总之符合[secure origin](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features)）
* 假设有：`http://localhost/ws.js`, `http://localhost/demo.html`
* `ws.js`会作为daemon驻留在浏览器里，有自己的生命周期。

## 代理/拦截

在`ws.js`里listen事件`fetch`，这样同域(都在`/`下)的fetch类请求都会通过这里，可以直接放行，也可以通过`new Request`构造或修改请求，然后直接响应或通过'new Response'构造或修改响应

## 通信

在`ws.js`里listen事件`message`，然后就可以在console里，通过postMessage通信了，比如：
```javascript
navigator.serviceWorker.controller.postMessage('Are you ok?')
```
[示例42](https://moonless.net/demo/42/)
