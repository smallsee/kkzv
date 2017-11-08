# kkzvue

> A Vue.js project

###laravel


###描述：

```
更新盘点详情
```
###请求接口地址：

```
bkstage.zhaoyl.com/bkstage/stockCheck/updateStockAttrition
```
###请求方式：

|参数|说明|
|---|---|
|请求方式|get|

###请求参数：


|参数|类型|说明|是否必填|
|---|---|---|---|
|stockCheckDetailId|int|盘点详情id|是|
|attritionType|int|损耗类型，0拆包损耗，1研发损耗，2其他损耗|否|
|explanation|string|差额说明|否|
|realQuantity|int|盘点数量|否|
|isCancel|int|是否取消核对，0执行核对，1取消核对|是|
###接口返回：

```
{
    "code": 0,
    "msg": "操作成功",
    "datas": {
         }
}