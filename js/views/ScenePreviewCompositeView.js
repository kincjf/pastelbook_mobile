/*global define */
/**
 * Scene 미리보기 관리화면
 * 미리보기화면을 관리하는 wrapper 화면
 *
 * - 구현내용/순서
 * 1. 새 미리보기 화면 삽입
 *  a. 맨 뒤에 삽입 => (구현중)
 *  b. 선택한 위치에 삽입
 * 2. Scene 순서변경
 * 3. 구역 설정, 구역 제거 (powerpoint 벤치마킹)
 * 4. 잘라내기, 붙여넣기(선택한 위치에), 복사하기
 *
 * - 관련 template : dlg-scene-preview
 */

define([
	'marionette',
	'pb_templates',
	'ScenePreviewView',
	'../collections/BaseObjectList'
], function (Marionette, templates, ScenePreviewView, BaseObjectList) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: templates.ScenePreviewCompositeView,
		/** legacy API method : itemViewContainer */
		childView: ScenePreviewView,

		childViewContainer: '#scene_previews',

		ui: {
			addScene: "li[data-behavior='addScene']",
			scenePreviews: '#scene_previews'
		},

		events: {
			'click @ui.addScene': 'createScene'
		},

		/** options - instance 선언시 초기화 데이터가 들어가있음. */
		initialize: function (options) {
			this.isReset = false;
			this.listenTo(this.collection, "reset", function () {
				this.isReset = true;
			}, this);
		},

		/** model : Scene */
		childViewOptions: function (model, index) {
			myLogger.trace("ScenePreviewCompositeView - childViewOptions");

			var baseObjectList = model.get('baseObjectList');

			/** 초기 로딩시 로딩데이터는 원시 array이기 때문에 custom collection으로 wrapping을 함*/
			/** 새로운 Scene 생성시에는 별 문제가 없는듯 함.*/
			if (!(baseObjectList instanceof BaseObjectList)) {
				baseObjectList = new BaseObjectList(baseObjectList);
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
		},

		onShow: function () {
			this.ui.addScene.button();

			/** 이건 나중에 하자. */
//	$( ".sortable" ).sortable({
//			revert: true
//		});
//		$( ".newscene" ).draggable({
//			connectToSortable: "#sortable",
//			helper: "clone",
//			revert: "invalid"
//		});
//		$( "ul, li" ).disableSelection();
		},
		onAddChild: function(childView){
			myLogger.trace("ScenePreviewCompositeView - onAddChild");

			// reset일 경우에는 previewScene으로 지정된 부분만 보여주고,
			// 아닐 경우에는 그냥 보여줌
			var sceneView = childView.sceneViewSet.get("sceneView");

			if(this.isReset) {
				if(childView.model.get("previewScene")) {
					sceneView.command('change:currentScene');
				}
			} else {
				sceneView.command('change:currentScene');
			}
		},

		/** this.collection : SceneList */
		/** 약간 코드가 꼬여있는 것 같다.
		 * controller이나 mediator를 이용하여 이런 부분을 풀어줘야 될 것 같다.
		 *
		 * baseObjectList를 만들어서 넣으려고 했지만 이상하게 []로 들어가서
		 * Scene.initialize에서 자동생성함.
		 *
		 * change .create() to .add()
		 */
		createScene: function () {
			this.collection.push({
				previewScene: false
			});
			myLogger.trace("ScenePreviewCompositeView - createScene");
		}
	});
});
