bootstrap-datepicker的angularjs module.

> [bootstrap-datepicker github](https://github.com/eternicode/bootstrap-datepicker/)
>
> [bootstrap-datepicker document](http://bootstrap-datepicker.readthedocs.org/en/latest/)
>
> [Online Demo](http://www.madcoder.cn/demos/ng-bootstrap-datepicker/example/index.html)
>

# 属性
***

### 非原生属性

此类属性以`ng-dp-`为前缀, 其并非bootstrap-datepicker 原生支持属性, 为支持angularJS提供或者是功能扩展属性.

| *名称* | *默认值* | *描述* |
| :------ |:----:| :-----------|
| ng-dp-model | - | scope双向绑定值, 可以直接读取或者设置datepicker选择日期. |
| ng-dp-element | - | 向`scope`中添加`datepicker`实例, 防止我们需要动态操作`datepicker`. <br />如在HTML中: `ng-dp-element="dpObj"`在JS中可以直接使用`dpObj.datepicker('setDisabled', '2015-02-03');` |
| ng-dp-inline | false | 创建inline datepicker, 无文本框. |
| ng-dp-default | - | `datepicker`初始值, 值可以为`today`或者`2015-09-21`(时间字符串) |
| ng-dp-view | - | 些属性为功能扩展属性, 当`ng-dp-view="week"`时, 日历变为周选择日历. |
| ng-dp-range-target | - | 需要两个日历, `ng-dp-range-target`指向另一个`datepicker`的`ng-dp-element`. |
| ng-dp-range-mode | false | 当`ng-dp-range-mode="true"`时. 可以从日期中选取一个时间区间. |
| ng-dp-load | - | Directive 初始化完成之后执行的事件. |



### 原生属性与事件

此类属性以`ng-dp-option-`或者`ng-dp-event-`为前缀, 一个表示原生属性, 一个为原生事件, 直接所有原生属性与事件. 可以参考[官方文档](http://bootstrap-datepicker.readthedocs.org/en/latest/)查看所有可用属性与事件. 转换时, 需要将驼峰属性/事件改为-连接, 并且加上`ng-dp-(option/event)`前缀, 如原文档中属性`startDate`需要改写为`ng-dp-option-start-date`, 原文档中事件`changeDate`需要改写为`ng-dp-event-change-date`
