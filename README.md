A enhance bootstrap-datepicker of AngularJS module.


## Demo

[Online Demo](http://www.madcoder.cn/demos/ng-bootstrap-datepicker/example/index.html)

## Install

```
bower install ng-bootstrap-datepicker --save
```

## Documentation

[Chinese](https://github.com/Gcaufy/ng-bootstrap-datepicker/blob/master/README_zh.md)

### Enhanced Properties

All properties start with a prefix `ng-dp-`. Original `bootstrap-datepicker` does not support those properties. 

| *Property Name* | *Default value* | *Description* |
| :------ |:----:| :-----------|
| ng-dp-model | - | Angularjs model, two-way binded. |
| ng-dp-element | - | Instance of `datepicker` Object, in case we need to manually control it. <br />e.g. HTML: `ng-dp-element="dpObj"`, JS: `dpObj.datepicker('setDisabled', '2015-02-03');` |
| ng-dp-inline | false | Inline datepicker, without a textbox. |
| ng-dp-default | - | `datepicker` default value, like: `today` or `2015-09-21` |
| ng-dp-view | - | View mode, when `ng-dp-view="week"`, only week can be selected. |
| ng-dp-range-target | - | Need to `datepicker`, `ng-dp-range-target` point to the `ng-dp-element` of another `datepicker`. |
| ng-dp-range-mode | false | if `ng-dp-range-mode="true"`, it allowed to select a date range. |
| ng-dp-load | - | Directive loaded event. |



### Native properties and events

All properties start with a prefix `ng-dp-option-` or `ng-dp-event-`.
`ng-dp-option-` is native property, `ng-dp-event-` is native event. Check the [Datepicker Documentation](http://bootstrap-datepicker.readthedocs.org/en/latest/) to see all the properties and events. they are all supported by adding a prefix prefix `ng-dp-option-` or `ng-dp-event-`.
e.g. There is a native property `startDate`, then it should be written like `ng-dp-option-start-date`. There is a native event `changeDate`, then it should be written like `ng-dp-event-cahnge-date`

### Original Documentation

> [bootstrap-datepicker github](https://github.com/eternicode/bootstrap-datepicker/)
>
> [bootstrap-datepicker document](http://bootstrap-datepicker.readthedocs.org/en/latest/)
>

