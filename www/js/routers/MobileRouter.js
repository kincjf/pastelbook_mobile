/**
 * - 현재는 [data-role="page, panel"]에 대해서만 Routing이 적용된다
 * - popup은 잘 모르겠음..
 * Created by KIMSEONHO on 2015-01-16.
 */

/*global define */
define([
	'jquery',
	'marionette'
], function ($, Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({
		// "someMethod" must exist at controller.someMethod
		/* standard routes can be mixed with appRoutes/Controllers above */
		routes: {
			// When there is no hash bang on the url, the home method is called
			"": "home",

			// When #category? is on the url, the category method is called
			":type": "category"
		},

		initialze: function (options) {
			myLogger.trace("MobileRouter - initialize");
			// Tells Backbone to start watching for hashchange events
		},

		// Home method
		home: function () {
			myLogger.trace("MobileRouter - home");
			// Programatically changes to the categories page
			
			// 페이지 로딩시 라우터를 써서 더 복잡하기 때문에 페이지 전환은 무조건 수동으로 전환하는 것으로 함.
			// $.mobile.changePage("#editor_main", {reverse: false, changeHash: false});
		},

		// Category method that passes in the type that is appended to the url hash
		category: function (type) {
			$.mobile.loading("show");

			// Programatically changes to the current categories page
			$.mobile.changePage("#" + type, {reverse: false, changeHash: false});
		}
	});
});
