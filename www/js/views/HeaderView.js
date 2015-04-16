/**
 * Scene 관리, 글추가, 사진추가, 저장/공유 기능에 대한 접근 인터페이스 제공
 * navigator 역할 수행
 * Created by KIMSEONHO on 2015-03-28.
 */
define([
	'marionette',
	'pb_templates','camera','filepicker'
], function (Marionette, templates,camera,filepick) {
	'use strict';
		
	var HeaderView = Marionette.ItemView.extend({
		tagName: "div",
		test : '',
		
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
			'click #shareBtn' : 'clickStoreBtn',
		},
		onLocalAlbum:function(){
			camera_album.getMultiPhoto();
		},
		onCamera:function(){
			camera_album.capturePhoto();
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
			
			$('#local_album').click(this.onLocalAlbum);
			$('#camera').click(this.onCamera);
			$('#filepick').click(this.onFilepicker);
		},
		onFilepicker: function(){
			filepicker.setKey("A9o1vYeamQTyUC8Eb1Z8pz");
			filepicker.getFile("image/*", function(url, metadata){
			    alert("You picked: "+url);
			    console.log(url);
			});
			/*
			var ref = window.open('http://apache.org', '_blank', 'location=yes');
	         ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
	         ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
	         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
	         ref.addEventListener('exit', function(event) { alert(event.type); });*/
		},
		openAddTextPopup: function() {
			this.ui.addTextPopup.popup("open");
		},
		clickShareBtn: function(){
			alert("시부랄");
			
			var canvas = pb.current.scene.canvas;
		//	var image = pb.current.object.image;
			
			this.test = canvas.toDataURL({
				format : 'png',
				multiplier : 1,
				quality : 1,
				left : canvas.item(0).left,
				top : canvas.item(0).top,
				width : canvas.item(0).width,
				height : canvas.item(0).height
			});
			
		window.plugins.socialsharing.share(null, null, this.test ,null);	//사진 공유기능	 https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
		},
		
		clickStoreBtn : function(){
			var fileTransfer = new FileTransfer();
			

			var canvas = pb.current.scene.canvas;
			//	var image = pb.current.object.image;
				
				this.test = canvas.toDataURL({
					format : 'png',
					multiplier : 1,
					quality : 1,
					left : canvas.item(0).left,
					top : canvas.item(0).top,
					width : canvas.item(0).width,
					height : canvas.item(0).height
				});
			var uri = encodeURI(this.test);
			
			
			fileTransfer.download( //https://github.com/apache/cordova-plugin-file-transfer 파일다운 플러그인
			    uri,
			    'file:///sdcard/DCIM/Camera/ㅋㅋ.png',
			    function(entry) {
			        console.log("download complete: " + entry.toURL());
			       
			        window.MediaScannerPlugin.scanFile(
			                function(msg){
			                    console.log(msg);
			                },
			                function(err){
			                    console.log(err);
			                },
			                'file:///sdcard/DCIM/Camera/ㅋㅋ.png'
			            );
			    },
			    function(error) {
			        console.log("download error source " + error.source);
			        console.log("download error target " + error.target);
			        console.log("upload error code" + error.code);
			    },
			    false,
			    {
			        headers: {
			            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			        }
			    }
			    
			);
			
		},
	});

	return HeaderView
});
