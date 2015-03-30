/*global define */
/**
 * Created by KIMSEONHO
 *
 * Image를 구성하는 Model
 * -
 *
 */
define([
	'backbone',
	'BaseObject'
], function (Backbone, BaseObject) {
	'use strict';

	return BaseObject.extend({
		defaults: {
			type: 'image',
			imgSrc: './​img/​dummy/​dummy.png'
		},
		//urlRoot: 'rest/picture',

		initialize: function (attrs, options) {
			BaseObject.prototype.initialize.call(this, options);
			
			myLogger.trace('Image - init');

			if (!_.has(attrs, "_id")) {
				this.set('_id', this.cid);
			}

			/** collection에 별칭을 지어서 model.attributes안에 가지고 있음 */
		}
	});
});

