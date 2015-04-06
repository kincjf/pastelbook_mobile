/*global define */
/**
 * Created by KIMSEONHO
 *
 * Scene들을 저장하는 Collection
 * rules
 * 1. 시작시 scene
 *
 */
define([
	'backbone',
	'js/models/Scene'
], function (Backbone, Scene) {
	'use strict';

	return Backbone.Collection.extend({
		model: Scene,

		initialize: function() {
			/** reset event는 add event를 포함하지 않음.
			 * model data가 들어가긴 하지만, add event가 일어나지 않고,
			 * 한번에 벌크로 들어간다.
			 */
		},

		/**
		 * 해당되는 model들의 baseObjectList를 reset한 후에 삭제를 실시함.
		 * @param models - model or an array of models(list of Scene)
		 * @param options - object
		 */
		remove: function(models, options) {
			myLogger.trace("SceneList - remove");

			var target = this.filter(function(model) {
				for(var m in models) {
					if(_.isEqual(m, model)) {
						return true;
					}
				}

				return false;
			}, this);

			_.each(target, function(element, index, list) {
				element.get("baseObjectList").reset();
			});

			return Backbone.Collection.prototype.remove.call(this, models, options);
		},

		/** baseObjectList를 삭제한 후 초기화를 실행해야함
		 * @param models - model or an array of models(list of Scene)
		 * @param options - object
		 */
		reset: function(models, options) {
			myLogger.trace("SceneList - reset");

			this.forEach(function(model) {
				model.get("baseObjectList").reset();
			});

			return Backbone.Collection.prototype.reset.call(this, models, options);
		}
	});
});
