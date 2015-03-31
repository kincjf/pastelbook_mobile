/*global define */
/**
 * Scene을 구성하는 개별화면
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
	'marionette',
	'radio',
	'pb_templates',
	'js/views/object/ImageView',
	'js/views/object/TextBoxView',
	'js/views/behaviors/SceneView/AddImageBehavior',
	'js/views/behaviors/SceneView/AddTextBoxBehavior',
	'js/common/CustomError'

], function (Marionette, Radio, templates,
             ImageView, TextBoxView,
             AddImageBehavior, AddTextBoxBehavior,
				 CustomError) {
	'use strict';

	return Marionette.CompositeView.extend({
		tagName: 'section',   // default div
		className: 'scene-wrap',
		template: templates.SceneView,

		ui: {
			scene: '.scene',
			canvas: 'canvas'
		},

		events: {
		},

		/** 기존 legacy API method : itemViewContainer*/
		/** http://marionettejs.com/docs/marionette.compositeview.html#modelevents-and-collectionevents 참조*/
		childViewContainer: "@ui.scene",
		/** trigger와 event가 동시에 작동하지 않는 것 같음.
		 */
//	  triggers: {
//		  'drop @ui.scene': 'add:object'
//	  },

		/** _options는 childViewOptions에서 받아온 데이터 */
		initialize: function (options) {
			myLogger.trace("SceneView - initialize");

			_.extend(this, Radio.Commands);

			/** < 필독 - 매우 중요함!!!>
			 * SceneView, SceneViewSetList에서 index로 접근하여 instance를 할당할 수 있도록
			 * 빈 Model을 생성함.
			 * 호출 순서는 SceneCompositeView/SceneView -> ScenePreviewCompositeView/ScenePreviewView
			 * 이기 때문에 현재 위치에 ViewSet을 Push함.
			 * 이 순서는 reset때도 마찬가지임. 무슨뜻이냐면...
			 *   [매우 중요함!]
			 * reset event일 때도 만약 모델이 3개일 경우 3개에 해당하는 SceneView가 모두 생성 된 다음
			 * ScenePreviewView가 생성됨.]
			 */

			/** SceneView와 ScenePreviewView를 묶어놓은 Model
			 * this.options.index : CompositeView 내에서 몇번째 View인지 알려줌
			 */
			this.sceneViewSet = pb.type.view.sceneViewSetList.push({
				parent: pb.type.view.sceneViewSetList
			}, {
				at: options.index
			});

			/** click : selectScenePreview */
			this.comply(pb.event.change.currentScene.default, this.renderCurrentScene);

			/** 이미지, 가로 텍스트박스, 비디오 추가 */
			this.comply(pb.event.add.object.image.default + " "
				+ pb.event.add.object.textbox.default, this.setupForInsertObjectByClick, this);

			/** sceneView를 등록하고 viewSet에 알림. */
			this.sceneViewSet.set("sceneView", this, {
				action: pb.event.add.default
			});
			this.sceneViewSet.trigger(pb.event.register.sceneView.default);
		},

		/** item - BaseObject */
		getChildView: function (item) {
			// Choose which view class to render,
			// depending on the properties of the item model
			var modelType = item.get('type');

			if (modelType == 'image') {
				return ImageView;
			} else if (modelType == 'textbox') {
				return TextBoxView;
			} else {
				try {
					throw new CustomError({
						name: 'SceneView - no ChildViewError',
						message: 'Child(model) isn`t exist type!'
					});
				} catch (e) {
					return null;
				}
			}
		},

		/**
		 * Object 수정,삭제 후 .command('change:thumbnail')을 수행하기 위해서
		 * option으로 sceneViewSet을 전달함.
		 */
		childViewOptions: function (model, index) {
			myLogger.trace("SceneView - childViewOptions");

			return {
				sceneViewSet: this.sceneViewSet
			}
		},

		behaviors: {
			AddImageBehavior: {
				behaviorClass: AddImageBehavior,
				type: "image"
			},
			AddTextBoxBehavior: {
				behaviorClass: AddTextBoxBehavior,
				type: "textbox"
			}
		},

		// Marionette Override Methods

		onBeforeRender: function(){

		},

		onRender: function (event, ui) {
			myLogger.trace("SceneView - onRender");
			this.renderCurrentScene();


		},

		onShow: function () {
			myLogger.trace("SceneView - onShow");
		},

		/**
		 * 1. droppable, selectable event 삭제
		 * 2. sceneView의 reference 삭제 */
		onDestroy: function() {
			myLogger.trace("SceneCompositeView - onBeforeDestroy");
			this.ui.scene.droppable("destroy").selectable("destroy");
			this.sceneViewSet.set("sceneView", null, {
				action: pb.value.FLAG.REMOVE
			});
		},

		/** ui.selected - BaseObject.$el */
		setupForSelectBaseObjectView: function (event, ui) {
			$(ui.selected).find(".ui-resizable-handle")
				.removeClass("hide")
				.trigger("selected:baseobject");
			myLogger.trace("sceneView - setupForSelectBaseObjectView");
		},

		/** ui.unselected - BaseObject.$el */
		setupForUnselectBaseObjectView: function (event, ui) {
			$(ui.unselected).find(".ui-resizable-handle")
				.addClass("hide")
				.trigger("unselected:baseobject");
			myLogger.trace("sceneView - setupForUnselectBaseObjectView");
		},


		/////////////////////////////
		renderCurrentScene: function (isReset) {
			myLogger.trace("SceneView - renderCurrentScene");

			if(this.isReset) {      // 초기 로딩중인가?
				if(this.model.get("previewScene")) {
					pb.current.scene = this;
				} 	// no-if : 대표로 지정된 Scene이 아님
			} else {
				if (pb.current.scene) {    // 기존 Scene이 존재하는가?
					pb.current.scene.$el.hide();
				} 	// no-if : loading(reset)일 경우 제일 처음 Scene에 focus를 맞춤

				pb.current.scene = this;
				pb.current.scene.$el.show();
			}

			// selectedBaseObject 초기화
			//pb.current.selectedBaseObjectView.command("clear:container");
			/** initialize에 하려고 했으나, 의미상 현재 선택된 Scene이기 때문에
			 * loading시(reset)과 add시 current.scene 설정을 구분해야함.
			 * - add시에는 삽입된 scene에 focus를 맞추면 되지만, loading은 처음 슬라이드를 기준으로 함.
			 */
		},

		// Custom Methods

		/**
		 * 각 type별로 Click Event로 삽입할 수 있도록 하였지만
		 * - selectable event를 일시적으로 disable해도 해결되지 않음
		 * - 때문에 그냥 스크린 중간에 표시하는걸로 하는것이 모바일 상에서도 좋을 것 같음
		 * ==> 그래서 그냥 1/3 지점에 바로 들어가게 구현함
		 * */
		setupForInsertObjectByClick: function (options) {
			var objectOptions = {
				top: pb.ui.dlg_current_scene.h / 3,
				left: pb.ui.dlg_current_scene.w / 3
			};

			if (options.type == "image") {
				// dummy를 이용한 naturalSize 측정
				pb.dummy.src = options.imgSrc;

				_.extend(objectOptions, {
					width: pb.dummy.width,
					height: pb.dummy.height,
					imgSrc: options.imgSrc
				});
				this.triggerMethod("AddImage", objectOptions);
			}
			else if (options.type == "textbox") {
				this.triggerMethod("AddTextBox", objectOptions);
			}
			else if (options.type == "video") {
				_.extend(objectOptions, {
					videoSrc: options.videoSrc,
					videoPreviewImage: options.videoPreviewImage,
					width: 640,
					height: 480
				});
				this.triggerMethod("AddVideo", objectOptions);
			}
		},

		setupForInsertObjectByDrop: function (event, ui) {
			myLogger.trace("SceneView - addObject");

			var $baseObject = $(ui.draggable.context);
			var type = $baseObject.attr('type');
			var objectOptions = {
				top: ui.position.top,
				left: ui.position.left
			};

			if (type == "image") {
				var imageSrc = $baseObject.attr('src'),
					naturalWidth = $baseObject[0].naturalWidth,
					naturalHeight = $baseObject[0].naturalHeight

				_.extend(objectOptions, {
					width: naturalWidth,
					height: naturalHeight,
					imgSrc: imageSrc
				});

				/* The on{Name} callback methods will still be called
				 * ex) AddImage -> this.triggerMethod("AddImage") -> triggers on{AddImage} */
				this.triggerMethod("AddImage", objectOptions);
			}
		}
	})
});
