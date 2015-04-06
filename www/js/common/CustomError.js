/*global define */
/**
 * custom Error Module
 */
define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.Error.extend({
		urlRoot: 'http://www.pastelbook.com/docs/' + pb.value.VERSION + '/'
	});
});
