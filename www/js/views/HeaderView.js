/**
 * Scene 관리, 글추가, 사진추가, 저장/공유 기능에 대한 접근 인터페이스 제공
 * navigator 역할 수행
 * Created by KIMSEONHO on 2015-03-28.
 */
define([
	'marionette',
	'pb_templates','jquery'
], function (Marionette, templates,jqeury) {
	'use strict';

	var HeaderView = Marionette.ItemView.extend({
		tagName: "div",
		ui: {
			navbar: "[data-role='navbar']",
			addImagePopupBtn: "[data-behavior='openAddImagePopup']",
			addTextPopupBtn: "[data-behavior='openAddTextPopup']",
			addImagePopup: "#add_image_popup",
			addTextPopup: "#add_text_popup"
		},     // 다른 Object들과 extend됨.
		template: templates.HeaderView,
		events: {
			'tap @ui.addImagePopupBtn': 'openAddImagePopup',
			'tap @ui.addTextPopupBtn': 'openAddTextPopup',
			'click #tlqkf' : 'clickShareBtn',
		},

		//className: "object",

		initialize: function (options) {
			myLogger.trace("HeaderView - initialize");
		},

		// "render" / onRender - after everything has been rendered
		// dom이 생성되지 않은 상태에서 먼저 JQM이 로딩되었기 때문에 수동으로 생성시켜줌
		onRender: function (view) {
			myLogger.trace("HeaderView - onRender");
			this.ui.navbar.navbar({
				defaults: true
			});
			this.ui.addImagePopup.popup();
			this.ui.addTextPopup.popup();
		},

		// Marionette Override Methods

		onShow: function () {
			myLogger.trace("HeaderView - onShow");
		},

		onDomRefresh: function () {
			myLogger.trace("BaseObjectView - onDomRefresh");
		},

		onBeforeDestroy: function () {
			myLogger.trace("BaseObjectView - onBeforeDestroy");
		},

		onDestroy: function () {
			myLogger.trace("BaseObjectView - onDestroy");
			this.ui.navbar.navbar("destroy");
			this.ui.addImagePopup.popup("destroy");
			this.ui.addTextPopup.popup("destroy");
		},

		// Custom Methods - Event Callback
		openAddImagePopup: function() {
			this.ui.addImagePopup.popup("open");
		},
		openAddTextPopup: function() {
			this.ui.addTextPopup.popup("open");
		},
		clickShareBtn: function(){
			alert("시부랄");
		window.plugins.socialsharing.share(null, null, 'https://www.google.nl/images/srpr/logo4w.png' ,null);
		
		},
		
	});

	return HeaderView
});
