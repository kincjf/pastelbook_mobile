/* global define */
/**
 * Shape를 구성하는 fabric object 데이터
 * - 아직 확정된 데이터가 아니기 때문에 attribute 발견시 지속적으로 추가될 예정임.
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
		},

		initialize: function (model, options) {
			myLogger.trace('Shape - initialize');
			BaseObject.prototype.initialize.call(this, options);
		}
	});
});

