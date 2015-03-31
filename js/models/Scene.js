/* global define */
/**
 * Scene을 구성하는 fabric canvas형 데이터
 * - 아직 확정된 데이터 구조가 없기 때문에 정해야함.
 * Created by KIMSEONHO
 */
define([
	'backbone',
	'js/collections/BaseObjectList'
], function (Backbone, BaseObjectList) {
	'use strict';

	return Backbone.Model.extend({
		//	localStorage: new Backbone.LocalStorage('pb-scene'),
		// objects, background
		defaults: {
		},

		initialize: function (attrs, options) {
			myLogger.trace('Scene - initialize');

			/** {@link http://backbonejs.org/#Model-constructor
			* this.collection - SceneList : collection property를 지정하지 않을경우
			* 자동으로 생성됨
			*/

			if (!_.has(attrs, 'baseObjectList')) {
				this.set('baseObjectList', new BaseObjectList());
			} else {
				var baseObjectList = attrs.baseObjectList;

				if (baseObjectList instanceof BaseObjectList) {
					/** Backbone.Collection(BaseObjectList) type일 경우는 그냥 변경하면 된다. */
					this.set('baseObjectList', baseObjectList);
				} else {
					/** 하지만 그냥 array type일 경우 wrapping을 해주어야한다. */
					this.set('baseObjectList', new BaseObjectList(baseObjectList));
				}
			}
		}
	});
});

