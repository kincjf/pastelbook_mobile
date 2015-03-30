/*global define */
/**
 * Created by KIMSEONHO
 *
 * Object들을 저장하는 Collection
 *
 */
define([
	'radio',
	'../models/Image',
	'../models/TextBox',
	'../models/Shape',
	'../models/BaseObject',
	'../controllers/CustomError'
], function (Radio, Image, TextBox, Shape, Video, Audio, Table, Chart, BaseObject,
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
			} else if (attrs.type == 'video') {
				return new Video(attrs, options);
			} else if (attrs.type == 'audio') {
				return new Audio(attrs, options);
			} else if (attrs.type == 'table') {
				return new Table(attrs, options);
			} else if (attrs.type == 'chart') {
				return new Chart(attrs, options);
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
			myLogger.trace('BaseObjectList - init');
			_.extend(this, Radio.Commands);

			/** BaseObjectList 안에 있는 각 BaseObject들의 z-index 값을 지정하는
			 * Scene내 Global 변수
			 */
			this.z_index = 10000;

			this.comply('add:z_index:+1', function(args) {
				++this.z_index;
			}, this);
			this.on('remove', function() {
				--this.z_index;
			}, this);
			this.on('reset', function() {
				this.z_index = 10000;
			}, this);
		}
	});
});
