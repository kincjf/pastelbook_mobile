/* global define */
/**
 * TextBox 구성에 필요한 fabric object형 데이터
 * Created by KIMSEONHO
 */
define([
	'backbone',
	'js/models/BaseObject'
], function (Backbone, BaseObject) {
	'use strict';

	return BaseObject.extend({
		defaults: {
		},

		initialize: function (attrs, options) {
			myLogger.trace('TextBox - initialize');
			BaseObject.prototype.initialize.call(this, options);
		}
	});
});

