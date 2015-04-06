/*global define */
/**
 * Created by KIMSEONHO
 *
 * SceneView, ScenePreviewView를 Pair로 매칭하는 Model
 * - View간의 통로역할과 Controller 역할을 할 예정임
 *
 */
define([
	'backbone'
], function (Backbone) {
	'use strict';

	return Backbone.Model.extend({
		/** sceneView, scenePreView - View instance*/
		defaults: {
			parent: null,
			isRegistered: false,
			sceneView: null,
			scenePreviewView: null
		},

		initialize: function (attrs, options) {
			myLogger.trace('SceneViewSet - initialize');
			this.on(pb.event.register.sceneView.default + " " +
				pb.event.register.scenePreviewView.default, this.isRegisterViewSet, this);
		},

		isRegisterViewSet: function () {
			myLogger.trace('SceneViewSet - isRegisterViewSet');

			var sceneView = this.get("sceneView");
			var scenePreviewView = this.get("scenePreviewView");

			if (sceneView && scenePreviewView) {
				this.set("isRegistered", true);

				/** ViewSet이 등록이 되었기 때문에 각 View들이 bind, listenTo를 할 수 있도록 알림 */
				this.trigger("register:sceneViewSet");
			}
		}
	});
});

