// #datepicker
(function (DATEPICKER_DIRECTIVE) {
	var m = angular.module('ngDatepicker', []);
	m.version = '1.0.0';



	var _DP = {
		// CONSTANT
		'OPTION_PREFIX': 'ng-dp-option-',
		'EVENT_PREFIX': 'ng-dp-event-',

		// Attributes
		'defaults': {
			format: 'M d, yyyy',
			autoclose: true
		},
		'parseAttr': function (str) {
			var arr = str.split('-'), i, len = arr.length, rst = arr[0];

			for(i = 1; i < len; i++) {
				rst += arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1);
			}
			return rst;
		}
	};

	if (!$.fn.datepicker)
		throw 'datepicker required';

	Date.prototype.format = function (format, lang) { //author: Chan
		return $.fn.datepicker.DPGlobal.formatDate(new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())), format || _DP.defaults.format, lang || 'en');
	};


	$.fn.datepicker.DPGlobal.template = $.fn.datepicker.DPGlobal.template.replace('<div class="datepicker">', '<div class="datepicker ng-datepicker">')
		.replace('&#171;', '<').replace('&#187;', '>')
		.replace('&#171;', '<').replace('&#187;', '>')
		.replace('&#171;', '<').replace('&#187;', '>');

	m.directive('ngDatepicker', function($parse, $compile) {
		return {
			restrict: "AE",
			replace: true,
			scope: {
				ngDpModel: '='	//the modal in parent scope
			},
			template: function (elem, attrs) {
				if (attrs.ngDpInline)
					return '<div class="ng-datepicker datepicker"></div>';

				return '<div class="ng-datepicker-input">' +
							  '<input type="text" ng-model="ngDpModel" readonly="readonly">' +
							  //'<span class="add-on"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></span>' +
						'</div>';
			},
			link: function(scope, element, attrs) {
				var jqAttr = {}, jqEvent = {}, obj = null, dom = null, config = null, ignoreSet = false, fireEvent = true,
					inline = !!attrs.ngDpInline,
                    rangeMode = !!attrs.ngDpRangeMode,
                    range = [],
					weekly = attrs.ngDpView === 'week',
					onload = null,
					defaultValue = attrs.ngDpDefault,
					rangeTarget = attrs.ngDpRangeTarget ? attrs.ngDpRangeTarget : null,
                    tmp = null,
					ngAttrs = attrs.$attr, k, v;

				if (ngAttrs['ngDpLoad'] && attrs['ngDpLoad']) {
					onload = attrs['ngDpLoad'];
					delete ngAttrs['ngDpLoad'];
					delete attrs['ngDpLoad'];
				}

				for (k in ngAttrs) {
					if (ngAttrs[k].indexOf(_DP.OPTION_PREFIX) === 0)
						jqAttr[_DP.parseAttr(ngAttrs[k].substr(_DP.OPTION_PREFIX.length))] = attrs[k];

					if (ngAttrs[k].indexOf(_DP.EVENT_PREFIX) === 0)
						jqEvent[_DP.parseAttr(ngAttrs[k].substr(_DP.EVENT_PREFIX.length))] = attrs[k];
				}
				if (attrs.id)
					element.attr('id', attrs.id);

				if (jqAttr.startDate && jqAttr.startDate === 'today') {
					jqAttr.startDate = new Date();
				}
				if (jqAttr.endDate && jqAttr.endDate === 'today') {
					jqAttr.endDate = new Date();
				}

				dom = (inline) ? element : element.find('input');
                config = $.extend({}, _DP.defaults, jqAttr);

				for (tmp in config) {
                     if (config[tmp] === 'false')
                         config[tmp] = false;
                     if (config[tmp] === 'true')
                         config[tmp]  = true;
                }
                if (rangeMode) {
                    config.forceParse = false;
                    config.autoclose = false;
                }

                obj = dom.datepicker(config);
                if (element.attr('required')){
					element.removeAttr('required');
					dom.attr('required', true);
					$compile(element)(scope);
				}

				if (attrs.ngDpElement)
					scope.$parent[attrs.ngDpElement] = obj;

				if (onload && typeof(scope.$parent[onload]) === 'function') {
					scope.$parent[onload].call(obj);
				}
				obj.callMethod = function () {
					fireEvent = false;
					obj.datepicker.apply(obj, arguments);
				};

				scope.ngDpElem = obj;
				if (weekly) {
					obj.on('changeDate', function (e) {
						if (!fireEvent) {
							fireEvent = true;
							return;
						}
						var dates = [], date = e.date, day = date.getDay(),
							onedaytime = 3600 * 1000 * 24,
							i = 0,
							firstDate = new Date(date.getTime() - day * onedaytime);
						dates.push(firstDate);
						while (++i < 7) {
							dates.push(new Date(firstDate.getTime() + i * onedaytime));
						}
						ignoreSet = true;
						fireEvent = false;
						obj.datepicker('setDates', dates);
					});
				}
				if (!inline) {
					element.find('.add-on').click(function () {
						obj.datepicker('show');
					});
				} else {
					obj.on('changeDate', function (e) {
						ignoreSet = true;
						scope.ngDpModel = obj.datepicker('getFormattedDate');
						if (!scope.$root.$$phase)
							scope.$apply();
					});
				}
				if (rangeTarget) {
					obj.on('changeDate', function (e) {
						scope.$parent[rangeTarget].datepicker('setStartDate', e.date);
					});
				}
                if (rangeMode) {
                    obj.on('changeDate', function (e) {
                        var choose = null;
                        if (!fireEvent) {
                            fireEvent = true;
                            return false;
                        }
                        if (range.length === 2)
                            range = [];
                        range.push($.fn.datepicker.Constructor.prototype._local_to_utc(e.date).valueOf());
                        choose = (range.length === 2 && range[1] > range[0]) ? range : null;
                        fireEvent = false;
                        obj.datepicker('setRange', choose);
                        obj.datepicker('setDate', e.date);

                        if (choose) {
                            scope.ngDpModel = new Date(choose[0]).format() + ' - ' + new Date(choose[1]).format();
                            scope.$apply();
                            setTimeout(function () {
                                obj.datepicker('hide');
                                // Because input datepicker only have a focus event, so we have to manual blur it.
                                dom.blur();
                            }, 300);
                        } else if (range.length === 2) {
                            range = [range[1]];
                        }
                    });
                }
				for (k in jqEvent) {
					obj.on(k, (function (evt) {
						return function (e) {
							if (fireEvent) {
								// If it's weekly view, it will trigger change date twice.
								if (!weekly || (weekly && e.dates.length > 1))
									scope.$parent[evt].call(element, e);
							}
							else
								fireEvent = true;
						};
					})(jqEvent[k]));
					/*obj.on(k, function (e) {
						if (fireEvent) {
							// If it's weekly view, it will trigger change date twice.
							if (!weekly || (weekly && e.dates.length > 1))
								scope.$parent[jqEvent[k]].call(element, e);
						}
						else
							fireEvent = true;
					});*/
				}
				if (defaultValue) {
					if (defaultValue === 'today') {
						scope.ngDpModel = new Date().format('M d, yyyy');
					} else {
						scope.ngDpModel = defaultValue;
					}
				}
				scope.$watch('ngDpModel', function(newVal) {
					if (newVal) {
						if (!ignoreSet) {
                            if (!rangeMode) {
                                fireEvent = false;
                                obj.datepicker('setDate', newVal);
                            }
                        }
						ignoreSet = false;
					}
				});
			}
		};
	});
})();