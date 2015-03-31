/*global define */
/**
 * Created by KIMSEONHO
 *
 * Scene을 구성하는 Model
 * - 아직 확정된 데이터 구조가 없기 때문에 정해야함.
 *
 */
define([
	'backbone',
	'js/collections/BaseObjectList'
], function (Backbone, BaseObjectList) {
	'use strict';

	return Backbone.Model.extend({
//		localStorage: new Backbone.LocalStorage('pb-scene'),

		defaults: {
			_id: '',
			previewScene: false,
			title: 'Scene',
			baseObjectList: null
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		initialize: function (modelData, options) {
			myLogger.trace('Scene - init');

			/**
			 * - 초기화 확인사항
			 * --
			 * -- _id 값 생성
			 * -- sceneNumber 생성
			 * -- baseObjectList 초기화
			 */

			/** cid는 attribute에 id가 없을 경우 Backbone이 자동으로 생성하는 식별자임 */
			/** id가 있을 경우 id로 쉽게 검색이 가능하고, 없다면 cid로 검색이 가능함 */
			if (!_.has(modelData, '_id')) {
				this.set('_id', this.cid);
			}

			/** {@link http://backbonejs.org/#Model-constructor
			* this.collection - SceneList : collection property를 지정하지 않을경우
			* 자동으로 생성됨
			*/

			if(!_.has(modelData, 'title')) {
				this.set('title', 'Scene No.' + this.get('_id'));
			}

			if (!_.has(modelData, 'baseObjectList')) {
				this.set('baseObjectList', new BaseObjectList());
			} else {
				var baseObjectList = modelData.baseObjectList;

				if (baseObjectList instanceof BaseObjectList) {
					/** Backbone.Collection(BaseObjectList) type일 경우는 그냥 변경하면 된다. */
					this.set('baseObjectList', baseObjectList);
				} else {
					/** 하지만 그냥 array type일 경우 wrapping을 해주어야한다. */
					this.set('baseObjectList', new BaseObjectList(baseObjectList));
				}
			}

		},

		/** 기존에 지정된 previewScene을 해제하고 현재 Scene을 대표 미리보기로 설정함 */
		setAsPreviewScene: function() {
			this.collection.findWhere({
				previewScene: true
			}).set("previewScene", false);

			this.set("previewScene", true);
		}
	});
});

