/* global define */
/**
 * Created by KIMSEONHO
 *
 * 초기 로딩시 데이터 구조화, View 설정등을 담당함.
 * app.start()시 아래에 있는 일련의 작업들이 수행됨.
 *
 * - 구현내용/순서
 * 1. Collection(SceneList, BaseObjectList)과 각각 View를 매칭하여
 * 지정된 Region에 로딩시킴.
 *
 * 2. Save시 File Storage에 저장하고, 공유할 수 있는 링크(SNS, messenger)방법를 제공함.
 */
define([
	'marionette',
	'js/models/Project',
	'js/collections/SceneList',
	'js/collections/SceneViewSetList',
	'js/views/SceneCompositeView',
	'js/views/ScenePreviewCompositeView',
	'js/views/HeaderView',
	'js/views/FooterView',
	'js/views/ImageListView',
	'js/views/EditView',
	'js/views/FirstPageView',
	'js/views/LoginPageView',
	'js/views/JoinPageView',
	'js/views/LoadPageCompositeView',
	'js/routers/MobileRouter'
], function (Marionette,
             Project,
             SceneList, SceneViewSetList,
             SceneCompositeView, ScenePreviewCompositeView,
				 HeaderView, FooterView, ImageListView, EditView,
				 FirstPageView,LoginPageView,JoinPageView,LoadPageCompositeView,
				 MobileRouter) {
	'use strict';

	var app_editor = new Marionette.Application();

	pb.type.model.project = new Project({
		sceneList: new SceneList()
	}, {
		parse: false
	});

	var sceneList = pb.type.model.project.get("sceneList");

	// SceneView와 ScenePreviewView를 엮어줌
	pb.type.view.sceneViewSetList = new SceneViewSetList();

	/** 실행순서 - SceneCompositeview/SceneView -> ScenePreviewCompositeView/ScenePreviewView
	 * 아래의 코드와 같이 먼저 선언된 순서대로 event가 등록되는 것 같음.
	 */
	var sceneCompositeView = new SceneCompositeView({
		collection: sceneList
	});

	var scenePreviewCompositeView = new ScenePreviewCompositeView({
		collection: sceneList
	});
	
	var headerView = new HeaderView();    	// HeaderView
	var footerview = new FooterView();		// FooterView
	var editView = new EditView();			// EditView
	var imagelistView = new ImageListView(); // ImageListView
	var firstpageView = new FirstPageView(); // Main Page
	var loginpageView = new LoginPageView();
	var joinpageView = new JoinPageView();
	var loadpagecompositeView = new LoadPageCompositeView();
	
	/** event driven message passing을 위한 Backbone.Radio
	 * 현재는 global로 관리를 하지만, app이 커질 경우 차후에는 event 종류별로
	 * 분류할 예정임. Backbone.wreqr의 업그레이드 버전이라함.
	 *
	 * {@link https://github.com/marionettejs/backbone.radio}
	 */
//	pb.type.Channels.globalChannel = Backbone.Radio.channel('global');

	/** 관리할 View Area를 설정함.
	 * 간단하게 scope를 설정하는 방법이므로 더 자세하게 설정하는 방법도 있음
	 * marionette API 참조
	 * !# 현재 있는 DOM이 아니면 el이 없다는 error 발생함.
	 */
	app_editor.addRegions({
        FirstPageView:'#first_page',
        LoginPageView:'#login_page',
        JoinPageView:'#Join_page',
        LoadPageCompositeView:'#load_page',

        sceneCompositeView: '#editor_main_content',
        scenePreviewCompositeView: '#scene_preview_panel',

        imageListView: '#image_list_panel',
        headerView: '#editor_main_header',
        footerView: '#editor_main_footer',
        editView: '#edit_detail'
    });

    app_editor.addInitializer(function (options) {
        app_editor.FirstPageView.show(firstpageView);
        app_editor.LoginPageView.show(loginpageView);
        app_editor.JoinPageView.show(joinpageView);
        app_editor.LoadPageCompositeView.show(loadpagecompositeView);

        app_editor.sceneCompositeView.show(sceneCompositeView);
        app_editor.scenePreviewCompositeView.show(scenePreviewCompositeView);

        app_editor.headerView.show(headerView);
        app_editor.footerView.show(footerview);
        app_editor.editView.show(editView);
        app_editor.imageListView.show(imagelistView);

        /** Scene이 처음에 하나는 있어야 되기 때문에 */
        sceneList.push({
            previewScene: true
        });
    });

	app_editor.addInitializer(function (options) {

		/** 주의사항
		 * 1. 전역변수 초기화는 함수 실행 이전에 수행해야 한다.
		 *  - event driven 방식에서는 data 변동에 대한 다수의 callback이 수행되는 것을
		 *  고려해야 한다.
		 */
		//app_editor.commands.setHandler("loading:project", function (data) {
		//	myLogger.trace("Application - loadProject");
		//
		//	var projectInfo = _.omit(data, 'sceneList');
		//	var projectData = data.sceneList;
		//
		//	pb.current.scene = null;
		//	pb.current.scenePreview = null;
		//
		//	pb.type.model.project.set(projectInfo);
		//	pb.type.model.project.get('sceneList').reset(projectData);
		//});

		/*app_editor.commands.setHandler("save:project", function () {
			myLogger.trace("Application - saveProject");

			var imageData = pb.util.captureController.getProjectPreviewImage();
			var previewImagePath = pb.io.ajax.getPreviewImagePath(imageData);

			if (previewImagePath === undefined) {
				previewImagePath = pb.value.DEFAULTS.PREVIEW_IMAGE_PATH;
			}

			*//** 최근 수정일 변경 *//*
			pb.type.model.project.set('modifyDate', Date.now());
			pb.type.model.project.set({
				width: pb.ui.dlg_current_scene.w,
				height: pb.ui.dlg_current_scene.h,
				previewImage: previewImagePath
			});
		});*/

		//app_editor.vent.on("save:thumbnail", function (sceneViewSet) {
		//	myLogger.trace("Application - changeThumbnail");
		//
		//	var sceneView = sceneViewSet.get('sceneView');
		//	pb.util.captureController.capturePreview(sceneView.$el, sceneViewSet);
		//});
	});

	app_editor.addInitializer(function (options) {
		this.router = new MobileRouter();
		Backbone.history.start();
	});

	return app_editor;
});