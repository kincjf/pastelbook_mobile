/*global define */
/**
 * ImageView extends BaseObjectView
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
	'pb_templates',
	'js/views/object/BaseObjectView'
], function (templates, BaseObjectView) {
	'use strict';
//	var ENTER_KEY = 13;
//	var ESCAPE_KEY = 27;

	return BaseObjectView.extend({
		tagName: 'div',

		template: templates.TextBoxView,

		ui: {
			content: "section"
		},

		events: {
			//'focusin @ui.content': 'enableEditing',
			//'focusout @ui.content': 'saveContent'
//			'dblclick label': 'onEditDblclick',
//			'keydown .edit': 'onEditKeyDown',
//			'blur .edit': 'onEditBlur'
		},

		attributes: {
			// 이미 들어간거이기 떄문에 넣지 말라는 표시임.
			// Scene에 삽입된 개체를 드래그시 계속 삽입되는 버그를 방지하기위한 표시.
			// 삽입되었다는 표시임.
	      'type': 'textbox'
		},

		className: BaseObjectView.prototype.className,

		initialize: function (options) {
			BaseObjectView.prototype.initialize.call(this, options);

			_.extend(this.events, BaseObjectView.prototype.events);
			_.extend(this.ui, BaseObjectView.prototype.ui);

			this.textBoxContextMenus = [
				{
					name: "텍스트 편집",
					fun: this.changeText
				},
				{
					name: "링크 만들기",
					fun: this.makeLinkText
				},
				{
					name: "텍스트 효과 편집",
					fun: this.editTextEffect
				}
			];

			//this.listenTo(this.model, 'change', this.render, this);
			myLogger.trace("TextBoxView - init");

		},

		// "show" / onShow - Called on the view instance when the view has been rendered and displayed.
		onShow: function (v) {
			BaseObjectView.prototype.onShow.call(this);

			//this.ui.content.contextMenu(
			//	_.union(this.objectContextMenus, this.textBoxContextMenus),
			//	this.contextMenuOptions);

			myLogger.trace("TextBoxView - onShow");
		},

		// "render" / onRender - after everything has been rendered
		onRender: function (v) {
			BaseObjectView.prototype.onRender.call(this);

			myLogger.trace("TextBoxView - onRender");
		},

		onDomRefresh: function() {
			//this.ui.content.ckeditor();
		},

		changeText: function () {
			myLogger.trace("TextBoxView - changeText");
		},

		makeLinkText: function () {
			myLogger.trace("TextBoxView - makeLinkText");
		},

		editTextEffect: function () {
			myLogger.trace("TextBoxView - editTextEffect");
		},

		enableEditing: function() {
			myLogger.trace("TextBoxView - enableEditing");
		},

		/** this.model : TextBox (Marionette default member variable) */
		saveContent: function() {
			this.model.set('htmlString', this.ui.content.html());
			myLogger.trace("TextBoxView - saveContent");
		}
	});
});
