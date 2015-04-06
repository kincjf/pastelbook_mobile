/* global define */
/**
 * Image, Textbox등의 관리에 필요한 공통 데이터
 * fabric object 구조를 따름
 * - 아직 추가요소별로 확정된 데이터 구조 아니기 때문에 지속적으로 추가될 예정임.
 *
 * Created by KIMSEONHO
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
		//	localStorage: new Backbone.LocalStorage('pb-object'),

		// attribute가 확정되는대로 {defaults}에 추가될 예정임

		// object type - type: "image", "text", "shape", etc...
		// positioning — left, top;
		// dimension — width, height;
		// rendering — fill, opacity, stroke, strokeWidth;
		// scaling and rotation — scaleX, scaleY, angle;
		// and even those related to flipping — flipX, flipY.

		defaults: {},

		initialize: function (model, options) {
			myLogger.trace('BaseObject - initialize');
		}
	});
});

