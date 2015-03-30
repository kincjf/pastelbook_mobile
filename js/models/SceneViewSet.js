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
			_id: '',
			parent: null,
			isRegistered: false,
			sceneView: null,
			scenePreviewView: null
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		initialize: function (modelData, options) {
			myLogger.trace('SceneViewSet - init');

			if (!_.has(modelData, "_id")) {
				this.set('_id', this.cid);
			}

			this.on("register:sceneView register:scenePreviewView", this.isRegisterViewSet, this);
		},

		isRegisterViewSet: function() {
			myLogger.trace('SceneViewSet - isRegisterViewSet');

			var sceneView = this.get("sceneView");
			var scenePreviewView = this.get("scenePreviewView");

			if( sceneView && scenePreviewView ) {
				this.set("isRegistered", true);

				/** ViewSet이 등록이 되었기 때문에 각 View들이 bind, listenTo를 할 수 있도록 알림 */
				this.trigger("register:sceneViewSet");
			}
		}
	});
});

