/**
 *   requirejs를 쓰기 때문에 설정을 해줌
 */
requirejs.config({
	baseUrl: '.', // 로딩된 웹페이지 기준
	paths: {
		cordova: 'cordova',	// for mobile
		
		backbone: 'lib/backbone',
		jquery: 'lib/jquery-1.11.2.min',
		jquerymobile: 'lib/jquery.mobile-1.4.5/jquery.mobile-1.4.5',
		underscore: 'lib/underscore',

		localStorage: 'lib/backbone.localStorage',
		marionette: 'lib/backbone.marionette',
		radio: 'lib/backbone.radio',

		tpl: 'lib/tpl',

		fabric: 'lib/fabric.require',
		event: 'lib/event',
		filepicker: 'lib/filepicker-0.0.1',
		hammer: 'lib/hammer',
		animationFrame: 'lib/animation-frame/AnimationFrame',
		// external library

		pb_namespace: 'js/pb-namespace',
		pb_templates: 'js/templates',

		pb_app_editor: 'js/app-editor',		//main start point
			
		lightSlider : 'lib/jquery.lightSlider',  //footer slider
		camera : 'lib/cameraTest'
	},

	/** shim은 non-AMD에서는 종속성을 뜻하지만
	 * require, module에서는 종속성이 아니라 단순히 해당 모듈을
	 * 호출하는 순서임.
	 * 또한 require 내부에 require로 호출을 한 경우에는 shim 설정을 따로 잡아줘야 함.
	 * ex) pb_ui에 있는 require 선언중 dlg_add_image에는 io가 필요할 경우
	 * shim: { dlg_add_image = { deps: [pb_io] } }
	 */
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},

		jquerymobile: {
			deps: ['jquery']
		},
		fabric:{
			deps:['event']
		},
		camera:{
			deps:['cordova']
		},
		backbone: {
			deps: ["jquery", 'underscore'],
			exports: 'Backbone'
		},
		marionette: {
			exports: 'Marionette',
			deps: ['backbone']
		},
		radio: {
			exports: 'Radio'
		},

		tpl: {
			extension: '.tpl'	 // default = '.html'
		},

		"animation-frame" :{
			exports: 'AnimationFrame'
		},

		pb_app_editor: {
			deps: ['pb_namespace', 'pb_templates']
		}
	},

	config: {
	}
});

// Includes File Dependencies
require([ "jquery", "backbone"], function( $, Backbone ) {
	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;

			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
		}
	);

	require([ "pb_app_editor", "jquerymobile" ], function (app_editor) {
		/** 초기 데이터 구조 형성과 초기화에 필요한 로딩을 담당함.*/
		pb.app_editor = app_editor;
		pb.app_editor.start(); // Application start

		require(["cordova"]);	// for implementation phonegap plugin

		myLogger.trace("pb_app_editor loading Complete");
	});
	
});