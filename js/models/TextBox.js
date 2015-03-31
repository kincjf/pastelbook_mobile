/*global define */
/**
 * Created by KIMSEONHO
 *
 * 추가요소 - TextBox
 *
 */
define([
	'backbone',
	'js/models/BaseObject'
], function (Backbone, BaseObject) {
	'use strict';

	return BaseObject.extend({
		defaults: {
			type: 'textbox',
			htmlString: ''
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		initialize: function (attrs, options) {
			BaseObject.prototype.initialize.call(this, options);
			myLogger.trace('TextBox - init');

			if (!_.has(attrs, "_id")) {
				this.set('_id', this.cid);
			}
		}
	});
});

