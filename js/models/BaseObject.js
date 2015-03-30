/*global define */
/**
 * Created by KIMSEONHO
 *
 * 추가요소를 구성하는 Model
 * - 아직 추가요소별로 확정된 데이터 구조가 없기 때문에 정해야함.
 *
 */
define([
	'backbone'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({
		/** .LocalStorage('name') : 'name이 Key이고 item과 쌍이 됨
		 * 초기 loading시 key에 해당하는 data set들을 읽어옴
		 * ex)'pb-object : c1, c2
		 *    'pb-object-c1 : {"imgSrc": "img1"}
		 *    'pb-object-c2 : {"imgSrc": "img2"}
		 * 자세한건 데이터를 직접 넣어보고 localStorage를 확인해 볼 것.
		 */
//		localStorage: new Backbone.LocalStorage('pb-object'),

		defaults: {
			_id: '',
			type: 'object',
			top: 0,     // x
			left: 0,    // y
			z_index: 10000,    // z
			width: 100,
			height: 100,
			opacity: 1
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		initialize: function (modelData, options) {
			myLogger.trace('BaseObject - init');

			/**
			 * - 초기화 확인사항
			 * 1. _id 값 생성 (자동)
			 * 2. top, left 설정
			 * 3. width, height 설정
			 * 4. z_index 설정
			 */
			if (!_.has(modelData, "_id")) {
				this.set('_id', this.cid);
			}

			/**
			 * this.collection : BaseObjectList
			 * z-index 값은 BaseObjectList에서 관리함
			 */
			this.set('z_index', this.collection.z_index);
			this.collection.command("add:z_index:+1");
		},
		/** custom Methods */
		setTopLeft: function(top, left) {
			this.set({
				top: top,
				left: left
			});
		},

		setSize: function(width, height) {
			this.set({
				width: width,
				height: height
			});
		}
	});
});

