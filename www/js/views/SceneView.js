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
	'fabric',
	'pb_templates',
	'js/views/object/ImageView',
	'js/views/object/TextBoxView',
	'js/views/behaviors/SceneView/AddImageBehavior',
	'js/views/behaviors/SceneView/AddTextBoxBehavior',
	'js/common/CustomError'

], function (Marionette, Radio, fabric, templates,
             ImageView, TextBoxView,
             AddImageBehavior, AddTextBoxBehavior,
				 CustomError) {
	'use strict';

	return Marionette.CompositeView.extend({
		tagName: 'section',   // default div
		className: 'scene-wrap',
		template: templates.SceneView,
		count : 1 , 

		ui: {
		
			scene: '.scene',
			canvas: '.picture-board'
		},

		events: {
			'click #img-filter': 'clickButton'
		},

		/** 기존 legacy API method : itemViewContainer*/
		/** http://marionettejs.com/docs/marionette.compositeview.html#modelevents-and-collectionevents 참조*/
		childViewContainer: "@ui.canvas",
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

			this.comply(pb.event.change.currentScene.default, this.setCurrentScene);

			/** 이미지, 텍스트박스 추가 */
			this.comply(pb.event.add.object.image.default + " "
				+ pb.event.add.object.textbox.default, this.setupForInsertObject, this);

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
		 * model - BaseObject
		 * Object 수정,삭제 후 .command('change:thumbnail')을 수행하기 위해서
		 * option으로 sceneViewSet을 전달함.
		 */
		childViewOptions: function (model, index) {
			myLogger.trace("SceneView - childViewOptions");

			return {
				sceneViewSet: this.sceneViewSet,
				canvas: this.canvas
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
			this.setCurrentScene();
		},

		onShow: function () {
			myLogger.trace("SceneView - onShow");
			this.canvas = new fabric.Canvas(this.ui.canvas[0]);
			pb.current.scene = this;		//필터적용을 위해서 캔버스를 가져오기 위해서
			this.setupForInsertObject({
				type: 'image',
				imgSrc: './tests/image/my-image.jpg'
			});      // for test
		},

		/**
		 * 1. droppable, selectable event 삭제
		 * 2. sceneView의 reference 삭제 */
		onDestroy: function() {
			myLogger.trace("SceneCompositeView - onBeforeDestroy");
			this.sceneViewSet.set("sceneView", null, {
				action: pb.value.FLAG.REMOVE
			});
		},
		//
		///** ui.selected - BaseObject.$el */
		//setupForSelectBaseObjectView: function (event, ui) {
		//	myLogger.trace("sceneView - setupForSelectBaseObjectView");
		//},
		//
		///** ui.unselected - BaseObject.$el */
		//setupForUnselectBaseObjectView: function (event, ui) {
		//	$(ui.unselected).find(".ui-resizable-handle")
		//		.addClass("hide")
		//		.trigger("unselected:baseobject");
		//	myLogger.trace("sceneView - setupForUnselectBaseObjectView");
		//},

		setCurrentScene: function (isReset) {
			myLogger.trace("SceneView - renderCurrentScene");

			if (pb.current.scene) {    // 기존 Scene이 존재하는가?
				pb.current.scene.$el.hide();
			} 	// no-if : loading(reset)일 경우 제일 처음 Scene에 focus를 맞춤

			pb.current.scene = this;
		},

		// Custom Methods

		/**
		 * 각 type별로 Click Event로 삽입할 수 있도록 하였지만
		 * - selectable event를 일시적으로 disable해도 해결되지 않음
		 * - 때문에 그냥 스크린 중간에 표시하는걸로 하는것이 모바일 상에서도 좋을 것 같음
		 * ==> 그래서 그냥 1/3 지점에 바로 들어가게 구현함
		 * */
		setupForInsertObject: function (options) {
			var objectOptions = {
				top: 100,
				left: 100
			};

			if (options.type == "image") {
				// dummy를 이용한 naturalSize 측정

				_.extend(objectOptions, {
					width: 100,     // for test
					height: 100,   // for test
					imgSrc: options.imgSrc
				});
				this.triggerMethod("AddImage", objectOptions);
			}
			else if (options.type == "textbox") {
				this.triggerMethod("AddTextBox", objectOptions);
			}
		},
			
		clickButton: function() {
		//	this.imgGet();
			if(this.count ==1 ){
				$('#editor_main_footer').hide();
				this.count = 2 ;
			}
			else if(this.count == 2){
				$('#editor_main_footer').show();
				
				var filter = fabric.Image.filters;
				var filters = [new filter.Sepia(),new filter.Sepia2()
								,new filter.Invert(),new filter.Grayscale()
								,new filter.Convolute({matrix:[1,1,1,1,0.7,-1,-1,-1,-1]})
								,new filter.Convolute({matrix:[0,-1,0,-1,5,-1,0,-1,0]})];
				
				var canvas = $('<canvas id="myCanvas"></canvas>');
				var f_canvas = new fabric.Canvas('myCanvas');
				for(var i=0; i<filters.length; i++){
					var image1 = fabric.util.object.clone(pb.current.object.image);
					
					image1.filters[0] = filters[i];
					
					f_canvas.add(image1);
					image1.applyFilters(f_canvas.renderAll.bind(f_canvas));
					var test = f_canvas.toDataURL({
						format : 'png',
						multiplier : 1,
						quality : 1,
						left : f_canvas.item(0).left,
						top : f_canvas.item(0).top,
						width : f_canvas.item(0).width,
						height : f_canvas.item(0).height
					});
					f_canvas.clear();
					$('#filter'+i).attr('src',test);
				}
				this.count = 1 ;
				}
		},
		
	
	})
});
