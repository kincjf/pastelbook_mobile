/*global define */
/**
 * Created by KIMSEONHO
 *
 * SceneViewSet들을 저장하는 Collection
 * rules
 * 1. Model 삭제시 내부 데이터를 삭제하고 난 후에
 * trigger로 Model 삭제지시를 해야함.
 *
 */
define([
	'backbone',
	'js/models/SceneViewSet'
], function (Backbone, SceneViewSet) {
	'use strict';

	return Backbone.Collection.extend({
		model: SceneViewSet,

		initialize: function(options) {
			myLogger.trace("SceneViewSetList - intialize");

			this.on("change:sceneView change:scenePreviewView", this.checkForRemove, this);
		},

		/** sceneView와 scenePreviewView가 모두 삭제되었을 경우에 해당 model을 삭제함.
		 * @return true : removed model / false - not removed */
		checkForRemove: function(model, value, options) {
			myLogger.trace("SceneViewSetList - intialize");

			var removed;
			if(options.action === pb.event.remove.default) {
				if(_.isNull(model.get("sceneView")) && _.isNull(model.get("scenePreviewView"))) {
					this.remove(model);
					removed = true;
				} else {
					removed = false;
				}
			}  // no-if : not operated remove

			return removed;
		}
//		localStorage: new Backbone.LocalStorage('pb-scene')
	});
});
