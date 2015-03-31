/*global define */
/**
 * Image를 구성하는 fabric object형 데이터
 *
 * Created by KIMSEONHO
 */
define([
	'backbone',
	'js/models/BaseObject'
], function (Backbone, BaseObject) {
	'use strict';

	return BaseObject.extend({
		// attribute가 확정되는대로 {defaults}에 추가될 예정임
		defaults: {
			src: "./image/dummy.png"
		},

		initialize: function (attrs, options) {
			myLogger.trace('Image - initialize');

			BaseObject.prototype.initialize.call(this, options);
		}
	});
});

