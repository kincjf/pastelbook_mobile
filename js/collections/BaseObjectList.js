/*global define */
/**
 * Created by KIMSEONHO
 *
 * fabric 형태의 Object들을 저장하는 Collection
 *
 */
define([
	'js/models/Image',
	'js/models/TextBox',
	'js/models/Shape',
	'js/models/BaseObject',
	'js/common/CustomError'
], function (Radio, Image, TextBox, Shape, BaseObject,
             CustomError) {
	'use strict';

	return Backbone.Collection.extend({
		model: function(attrs, options) {
			if(attrs.type == 'image') {
				return new Image(attrs, options);
			} else if (attrs.type == 'textbox') {
				return new TextBox(attrs, options);
			} else if (attrs.type == 'shape') {
				return new Shape(attrs, options);
			} else if (attrs.type == 'object') {
				return new BaseObject(attrs, options);
			} else {
				try {
					throw new CustomError({
						name: 'BaseObjectList - insert Error',
						message: 'BaseObject Type isn`t exist type!'
					});
				} catch(e) {
					return null;
				}
			}
		},

		initialize: function(models, options) {
			myLogger.trace('BaseObjectList - initialize');
		}
	});
});
