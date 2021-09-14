
# 运营配置

## 接口配置组件

### 使用示例及参数

```
import {InterFaceList } from "zg-base-plugin"

<InterFaceList />

props

httpBaseUrl [String]  http请求url Ip
httpBaseUrl = "http://app-api.dev.zyun.link"


headers [Object] http请求headers信息
headers = {
  'Authorization': 'Bearer 77f8f656-5a49-44a3-80b1-aa246666bb32', // 登录token
  'x-zg-system': 'kbvip' // 平台关键字
}

```


## 资源配置组件

### 使用示例及参数

```
import {ResourceAllocation } from "zg-base-plugin"

<ResourceAllocation />

props

httpBaseUrl [String]  http请求url Ip
httpBaseUrl = "http://app-api.dev.zyun.link"


headers [Object] http请求headers信息
headers = {
  'Authorization': 'Bearer 77f8f656-5a49-44a3-80b1-aa246666bb32', // 登录token
  'x-zg-system': 'kbvip' // 平台关键字
}

```
