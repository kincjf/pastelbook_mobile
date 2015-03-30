/* global define */
/**
 * Scene
 * Scene들을 관리하는 Wrapper화면, Scene 관리자
 *
 * - 구현내용/순서
 * 1. Scene 삽입 => (구현중)
 * 2. Scene 미리보기 화면에서 선택된 Scene 보여주기
 *
 * - 문제점 / 수정사항
 * 1. 기존 dialog selector에 접근할 수 없다!
 * (id가지고 접근하기에는 좀 더럽다;; View 관리범위 바깥이기 때문에 ui hash를 사용할 수 없음.)
 * => static html을 없애고 초기 구동시 생성하는 방향으로 제작해야될듯
 */
define([
	'marionette',
	'pb_templates',
	'../collections/BaseObjectList',
	'/SceneView'
], function (Marionette, templates, BaseObjectList, SceneView) {
	'use strict';

	return Marionette.CompositeView.extend({
		tagName: 'section',

		/** CompositeView에서는 무조건 template을 써야되는 듯함. */
		/** itemView에서는 잘 모르겠음. */
      template: templates.SceneCompositeView,

		/** 기존 legacy API method : itemView, itemViewContainer */
		childView: SceneView,

		childViewContainer: '#scenes_wrapper',

		className: 'scene-wrap',

		ui: {
			scenes: '#dlg_current_scene'
		},

//		events: {
//      'click #add_slide': 'addSlide'
//		},
		/** options : instance 초기화시 받은 parameter object*/
		initialize: function (options) {
			myLogger.trace("SceneCompositeView - init");
			this.isReset = false;
			this.listenTo(this.collection, "reset", function () {
				this.isReset = true;
			}, this);
      },

		/** it does passing parameter, childView initialize(_options)
		 * ex) _options : {collection, index}
		 */
		/** model - Scene, collection - baseObjectList */
		childViewOptions: function(model, index) {
			myLogger.trace("SceneCompositeView - childViewOptions");

			var baseObjectList = model.get('baseObjectList');

			/** 초기 로딩시 로딩데이터는 원시 array이기 때문에 custom collection으로 wrapping을 함*/
			if( !(baseObjectList instanceof BaseObjectList) ) {
				BaseObjectList = new BaseObjectList(baseObjectList);
			}

			/** childView로 넘겨주는 init parameter의 collection type은
			 * Backbone.Collection의 인스턴이어야함.
			 * 아닐경우 marionette Error 발생
			 */
			return {
				model: model,
				collection: baseObjectList,
				index: index,
				isReset: this.isReset
			}
		},

		onRender: function () {
			myLogger.trace("SceneCompositeView - onRender");
		},

		onShow: function() {
			myLogger.trace("SceneCompositeView - onShow");
		},

		/** 삭제한 후, 표시될 Scene에 대한 설정을 한다
		 * 1. Scene이 1개일때 - 지정안함
		 * 2. 맨 처음 Scene일때 - 다음
		 * 3. Scene이 중간지점일때
		 * 4. 마지막 Scene일때 */
		onBeforeRemoveChild: function(childView){
			// work with the childView instance, here
		},

		createScene: function () {
			myLogger.trace("SceneCompositeView - createScene");
		}
	});
});
