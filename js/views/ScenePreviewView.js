/*global define */
/**
 * Scene 미리보기를 구성하는 개별화면
 *
 * - 구현내용/순서
 * 1. 새 미리보기 화면 생성 => (구현중)
 * 2. 선택시 해당 화면 표시
 * 3. Scene삭제(화면, 데이터)
 * 4. 잘라내기, 붙여넣기, 복사하기
 *
 * ! 개발시 주의사항
 * SceneView 생성 후 ScenePreviewView가 생성됨
 */

define([
	'marionette',
	'radio',
	'pb_templates'
], function (Marionette, Radio, templates) {
	'use strict';

	var ScenePreviewView = Marionette.ItemView.extend({

		template: templates.ScenePreviewView,

		ui: {
			preview: 'li',
			previewImage: 'img'
		},

		events: {
			'click @ui.preview': 'selectScenePreview'
		},

		initialize: function (options) {
			_.extend(this, Radio.Commands);

			/** SceneView와 ScenePreviewView를 묶어놓은 Model
			 * push만 하였기 때문에 rear(맨 뒤)가 현재 매칭된 ViewSet임
			 */
			this.sceneViewSet = pb.type.view.sceneViewSetList.at(
				this.options.index
			);

			/** scenePreviewView를 등록하고 viewSet에 알림. */
			this.sceneViewSet.set("scenePreviewView", this, {
				action: pb.value.FLAG.ADD
			});
			this.sceneViewSet.trigger("register:scenePreviewView");

			this.comply("change:preview", this.setPreview, this);

			this.scenePreviewContextMenu = [
				{
					name: "미리보기로 지정",
					title: "Set Preview Scene",
					fun: _.bind(this.markAsDefaultPreview, this)
				},
				{
					name: "잘라내기",
					title: "cut scene"
				},
				{
					name: "복사"
				},
				{
					name: "붙여넣기",
					func: this.cutObject
				},
				{
					name: "새로운 씬",
					func: this.copyObject
				},
				{
					name: "씬 복제",
					func: this.pasteObject
				},
				{
					name: "씬 삭제",
					fun: _.bind(this.deleteScene, this)
				},
				{
					name: "레이아웃",
					func: this.moveForwardObject
				},
				{
					name: "배경 설정",
					func: this.moveBackgroundObject
				},
				{
					name: "씬 숨기기",
					func: this.moveBackwardObject
				}
			];

			this.contextMenuOptions = {
				//containment: "document",     // context menu가 보여지는 범위가 어디까지인가?
				displayAround: "cursor",
				horAdjust: 0,
				left: "auto",
				mouseClick: "right",
				position: "auto",
				sizeStyle: "auto",
				top: "auto",
				triggerOn: "click",
				verAdjust: 0
			};

			myLogger.trace("ScenePreviewView - init");
		},

		serializeData: function() {
			return _.extendOwn(this.model.toJSON(), {sceneNumber: this.options.index + 1});
		},

		// Marionette Callback Method

		onRender: function () {
			this.renderCurrentScenePreview();
			this.$el.contextMenu(this.scenePreviewContextMenu, this.contextMenuOptions);
			myLogger.trace("ScenePreviewView - onRender");
		},

		/** 모든 childView의 render(onRender)가 끝난 이후
		 * [onShow-> onDomRefresh]순으로 실행함
		 * render는 View 실행시 수행되지만, show/domRefresh는 벌크로 한 번에 함.
		 * Trace 로그를 보면 알 수 있음.
		 */
		onShow: function(v, c) {
			myLogger.trace("ScenePreviewView - onShow");
			pb.app_tool.vent.trigger("save:thumbnail", this.sceneViewSet, this.options.isReset);
		},

		/** This event / callback is useful for DOM-dependent UI plugins such as jQueryUI or KendoUI.
		 */
		onDomRefresh: function() {
			myLogger.trace("ScenePreviewView - onDomRefresh");
		},

		onDestroy: function() {
			this.$el.contextMenu("destroy");
			this.sceneViewSet.set("scenePreviewView", null, {
				action: pb.value.FLAG.REMOVE
			});
			myLogger.trace("ScenePreviewView - onBeforeDestroy");
		},

		// Custom Event Callback Method

		/** scenePreview를 선택할 때 */
		selectScenePreview: function (event, ui) {
			myLogger.trace("ScenePreviewView - selectScenePreview");

			if(pb.current.scenePreview.cid === this.cid) {
				// 이미 선택된 Scene을 선택한 경우(비교연산의 효율을 위하여 고유값 cid를 비교함
				return;
			} else {
				/** 기존에 선택된 scenePreview의 선택 표시 테두리를 없앰 */
				pb.current.scenePreview.$el.removeClass("ui-selected");

				/** 현재 선택함 scenePreview의 선택 표시 테두리를 표시함
				 * toggleClass를 쓸 수도 있지만, 의미가 명확하지 않기 때문에 나눠서 사용함
				 */
				pb.current.scenePreview = this;
				pb.current.scenePreview.$el.addClass("ui-selected");

				var sceneView = this.sceneViewSet.get("sceneView");
				/** 의미상 명확하게 하기 위하여 trigger보다는 command를 사용함 */
				sceneView.command('change:currentScene');
			}

			pb.current.selectedBaseObjectView.clear();
		},

		/** collection에 등록이 되어 Render가 되는 과정시 실행
		 * loading시(reset)과 add시 current.scene 설정을 구분해야함.
		 * - add시에는 삽입된 scene에 focus를 맞추면 되지만, loading은 previewScene으로 설정된
		 *   슬라이드를 기준으로 함.
		 *  */
		renderCurrentScenePreview: function () {
			if(this.options.isReset) {    // 로딩시
				if(this.options.index === (this.collection.length - 1)) {
					// 마지막 부분시 reset 이벤트로 인한 chindView Insert과정이 끝났다는 것을 알리기 위하여
					this.options.isReset = false;
				}
				if(this.model.get("previewScene") === true) {
					// 미리보기로 지정된 Scene만 보여줌
					pb.current.scenePreview = this;
					pb.current.scenePreview.$el.addClass("ui-selected");
				}
			} else {    // 로딩이 아닐경우
				if (pb.current.scenePreview) {
					// 기존 ScenePreview이 존재하는 경우
					pb.current.scenePreview.$el.removeClass("ui-selected");
				}

				pb.current.scenePreview = this;
				pb.current.scenePreview.$el.addClass("ui-selected");
			}

			myLogger.trace("ScenePreviewView - renderCurrentScenePreview");
		},

		setPreview: function (options) {
			myLogger.trace("scenePreviewView - setThumbnail");
			this.ui.previewImage[0].src = options.imageData;
		},

		markAsDefaultPreview: function() {
			myLogger.trace("scenePreviewView - markAsDefaultPreview");
			this.model.setAsPreviewScene(true);
		},

		/** this.model - Scene */
		deleteScene: function() {
			this.model.collection.remove(this.model);
			myLogger.trace("scenePreviewView - deleteScene");
		}
	});

	return ScenePreviewView;
});
