/*global define */
/**
 * Scene을 구성하는 개별화면
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 */
define([
	'marionette'
], function (Marionette) {
	'use strict';

	var BaseObjectView = Marionette.ItemView.extend({
		ui: {},     // 다른 Object들과 extend됨.

		/**
		 * - 어미에 Data가 붙은 것은 model Data를 직접 변경하는 것이고,
		 * 붙지 않은 것은 View(DOM)만 변경하는 것임.
		 *
		 * - 양방향 바인딩을 이용하여 Model을 변경한 후 바로 View에 적용되게 할 수 있지만,
		 * 1. 불필요하게 model data 접근하여 많은 연산이 수행되게 할 수 있음.
		 * 2. 향후 model data를 이용한 기능 구현(undo, redo, 자동저장, 공동작업등)시 문제가 생길 우려
		 * 때문에 조작중에는 직접 View에 접근하고 조작이 끝나는 시점에서는 데이터를 변경하게 구현함.
		 *
		 * - interact 이벤트가 eventhash에 먹히지 않음 그래서 수동으로 설정함
		 * - [un]selected:baseobject : 선택된 View의 instance를 pb.current.selectedBaseObject에 삽입/삭제한다.
		 */
		events: {
			'selected:baseobject': 'selectView',
			'unselected:baseobject': 'unselectView',
			'mousedown': 'setupForDrag',
			'drag': 'changeDirection',
			'dragstop': 'changeDirectionData',
			'resize': 'changeSize',
			'resizestop': 'changeSizeData',
			'click .rotateBtn': 'rotateObject'
		},

		className: "object",

		initialize: function () {
			myLogger.trace("BaseObjectView - init");
			/**
			 * @link http://ignitersworld.com/lab/contextMenu.html#intro
			 */
			this.objectContextMenus = [
				{
					name: "내 컨텐츠 추가", /* img: "delete",*/
					title: "create my contents",
					fun: _.bind(this.addMyContents, this)
				},
				{
					name: "삭제",
					fun: _.bind(this.deleteObject, this)
				},
				{
					name: "잘라내기",
					func: this.cutObject
				},
				{
					name: "복사",
					func: this.copyObject
				},
				{
					name: "붙여넣기",
					func: this.pasteObject
				},
				{
					name: "맨 앞으로",
					func: this.moveForegroundObject
				},
				{
					name: "앞으로",
					func: this.moveForwardObject
				},
				{
					name: "맨 뒤로",
					func: this.moveBackgroundObject
				},
				{
					name: "뒤로",
					func: this.moveBackwardObject
				},
				{
					name: "크기, 위치 수정",
					func: this.editSizePositionObject
				},
				{
					name: "도형 서식",
					func: this.editShapeObject
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
			}
		},

		// "render" / onRender - after everything has been rendered
		onRender: function (v) {
			// 좀비뷰가 되지 않기 위해서는 draggable, resizable event를 삭제해야함.
			this.$el.resizable({
				handles: "all",
				create: function () {
					$(this).find(".ui-resizable-handle").addClass("hide");
				}
			})
				// handle을 사용해도 될 것 같음
				.draggable({
					opacity: 0.35
				});

			/** widget에 직접 접근해서 많은 데이터를 가져오는 것 보다는 필요한 데이터를 간단하게
			 * 명시한 후에 작성하는게 좋을 것 같아서 attr에 표기를 하였음.
			 */
			this.$el.attr({
				'data-x': this.model.get("left"),
				'data-y': this.model.get("top"),
				'data-width': this.model.get("width"),
				'data-height': this.model.get("height")
			})
				.css({
					top: this.model.get("top"),
					left: this.model.get("left"),
					width: this.model.get("width"),
					height: this.model.get("height"),
					position: "absolute"
				});

			myLogger.trace("BaseObjectView - onRender");
		},

		// Marionette Override Methods

		onShow: function () {
			myLogger.trace("BaseObjectView - onShow");
		},

		/** modify selectable variable, preview image */
		onDomRefresh: function () {
			var pos = this.$el.offset();
			this.$el.data("selectable-item", {
				element: this.el,
				$element: this.$el,
				left: pos.left,
				top: pos.top,
				right: pos.left + this.$el.outerWidth(),
				bottom: pos.top + this.$el.outerHeight(),
				startselected: false,
				selected: this.$el.hasClass("ui-selected"),
				selecting: this.$el.hasClass("ui-selecting"),
				unselecting: this.$el.hasClass("ui-unselecting")
			})
				.addClass("ui-selectee");

			myLogger.trace("BaseObjectView - onDomRefresh");
		},

		onBeforeDestroy: function () {
			this.$el.contextMenu('destroy');
			this.$el.resizable("destroy").draggable("destroy");

			myLogger.trace("BaseObjectView - onBeforeDestroy");
		},

		onDestroy: function () {
			myLogger.trace("BaseObjectView - onDestroy");
		},


		// Custom Methods - Event Callback
		/** selected:baseobject */
		selectView: function () {
			pb.current.selectedBaseObjectView.push(this);
		},

		/** unselected:baseobject */
		unselectView: function () {
			pb.current.selectedBaseObjectView.remove(this);
		},

		setupForDrag: function (event, ui) {
			var widgetInstance = pb.current.scene.ui.scene.data("ui-selectable");
			widgetInstance.selectees = pb.current.scene.ui.scene.find(widgetInstance.options.filter);

			// 선택이 안되어 있을경우
			if (!this.$el.hasClass("ui-selected")) {
				// - ctrlKey가 안 눌린 경우
				if (!event.metaKey && !event.ctrlKey) {

					// 선택된 object만 selectable되고 나머지는 unselectable
					widgetInstance.selectees.filter(".ui-selected").each(function() {
						var selectee = $.data(this, "selectable-item");
						selectee.$element.removeClass("ui-selected");
						selectee.selected = false;
						selectee.unselecting = false;

						widgetInstance._trigger("unselected", event, {
							unselected: this
						});
					});
				}

				// selectable object로 추가
				this.$el.addClass("ui-selected");
				widgetInstance._trigger("selected", event, {
					selected: this.el
				});
			}
		},

		/** 'drag' */
		changeDirection: function (event, ui) {
			var dx = ui.position.left - this.el.getAttribute('data-x'),
				dy = ui.position.top - this.el.getAttribute('data-y');

			_.each(pb.current.selectedBaseObjectView.container, function (element, index, list) {
				var x = (parseFloat(element.el.getAttribute('data-x')) || 0) + dx,
					y = (parseFloat(element.el.getAttribute('data-y')) || 0) + dy;

				element.$el.css({
					left: x,
					top: y
				});

				element.el.setAttribute('data-x', x);
				element.el.setAttribute('data-y', y);
			});

			myLogger.trace("BaseObjectView - changeDirection");
		},

		/** 'dragstop' */
		changeDirectionData: function (event, ui) {
			// 차후에 translate에 맞게 x, y로 바꿔야될 것 같음
			_.each(pb.current.selectedBaseObjectView.container, function (element, index, list) {
				element.model.setTopLeft(
					parseFloat(element.el.getAttribute('data-y')), parseFloat(element.el.getAttribute('data-x'))
				);
			}, this);

			// selectable을 위한 refresh 수행
			this.triggerMethod("DomRefresh");
			this.changePreview();

			myLogger.trace("BaseObjectView - changeDirectionData");
		},

		/** 'resize' */
		changeSize: function (event, ui) {
			var dwidth = ui.size.width - this.el.getAttribute('data-width'),
				dheight = ui.size.height - this.el.getAttribute('data-height');

			_.each(pb.current.selectedBaseObjectView.container, function (element, index, list) {
				var width = (parseFloat(element.el.getAttribute('data-width')) || 0) + dwidth,
					height = (parseFloat(element.el.getAttribute('data-height')) || 0) + dheight;

				element.$el.css({
					width: width,
					height: height
				});

				element.el.setAttribute('data-width', width);
				element.el.setAttribute('data-height', height);
			});
			myLogger.trace("BaseObjectView - changeDirection");
		},

		/** 'resizestop' */
		changeSizeData: function (event, ui) {
			_.each(pb.current.selectedBaseObjectView.container, function (element, index, list) {
				element.model.setSize(
					parseFloat(element.el.getAttribute('data-width')), parseFloat(element.el.getAttribute('data-height'))
				);
			}, this);

			// selectable을 위한 refresh 수행
			this.triggerMethod("DomRefresh");
			this.changePreview();

			myLogger.trace("BaseObjectView - changeSize");
		},

		/** 썸네일 구동 시기
		 * 1. Scene 추가시, Project 로딩시
		 * - onRender에서 해결
		 * 2. BaseObject 추가/삭제
		 * - messaging OR listenTo(add|remove)로 해결
		 * 3. BaseObject 수정
		 * - messaging call로 해야될 것 같음.
		 */
		changePreview: function() {
			myLogger.trace("BaseObjectView - changePreview");
			pb.app_tool.vent.trigger("save:thumbnail", this.options.sceneViewSet);
		},

		/** 'click .destroyBtn' */
		destroyObject: function (event, ui) {

		},

		/** 'click .rotateBtn' */
		rotateObject: function () {

		},

		// Custom Methods - contextMenu Callback
		addMyContents: function () {
			myLogger.trace("BaseObjectView - addMyContents");
		},

		/** 바인딩된 모든 이벤트를 해제하고 난 후에 데이터를 삭제함. */
		deleteObject: function (key, opt) {
			/** this.model - BaseObject, this.model.collection - BaseObjectList */
			this.model.collection.remove(this.model);

			/** reset시 계속 repaint를 하기 때문에 onDestroy에 선언하지 않음 */
			this.changePreview();
			myLogger.trace("BaseObjectView - deleteObject");
		},

		cutObject: function () {
			myLogger.trace("BaseObjectView - cutObject");
		},

		copyObject: function () {
			myLogger.trace("BaseObjectView - copyObject");
		},

		pasteObject: function () {
			myLogger.trace("BaseObjectView - pasteObject");
		},

		moveForegroundObject: function () {
			myLogger.trace("BaseObjectView - moveForegroundObject");
		},

		moveForwardObject: function () {
			myLogger.trace("BaseObjectView - moveForwardObject");
		},

		moveBackgroundObject: function () {
			myLogger.trace("BaseObjectView - moveBackgroundObject");
		},

		moveBackwardObject: function () {
			myLogger.trace("BaseObjectView - moveBackwardObject");
		},

		editSizePositionObject: function () {
			myLogger.trace("BaseObjectView - editSizePositionObject");
		},

		editShapeObject: function () {
			myLogger.trace("BaseObjectView - editShapeObject");
		}
	});

	return BaseObjectView
});
