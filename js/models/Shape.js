/*global define */
/**
 * Created by KIMSEONHO
 *
 * 추가요소를 구성하는 Model
 * - 아직 추가요소별로 확정된 데이터 구조가 없기 때문에 정해야함.
 *
 */
define([
	'backbone',
	'BaseObject'
], function (Backbone, BaseObject) {
	'use strict';

	return BaseObject.extend({
		/** .LocalStorage('name') : 'name이 Key이고 item과 쌍이 됨
		 * 초기 loading시 key에 해당하는 data set들을 읽어옴
		 * ex)'pb-object : c1, c2
		 *    'pb-object-c1 : {"imgSrc": "img1"}
		 *    'pb-object-c2 : {"imgSrc": "img2"}
		 * 자세한건 데이터를 직접 넣어보고 localStorage를 확인해 볼 것.
		 */
//		localStorage: new Backbone.LocalStorage('pb-object'),

		defaults: {
			type: 'shape',
			title: 'BaseShape'
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		initialize: function (modelData, options) {
			myLogger.trace('BaseObject - init');

			if (!_.has(modelData, "_id")) {
				this.set('_id', this.cid);
			}
			/** collection에 별칭을 지어서 model.attributes안에 가지고 있음 */
		}
	});
});

