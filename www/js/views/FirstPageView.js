/**
 메인화면 페이지 컨텐트 뷰
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.FirstPageView,
		
		events :{
			'click #load_page_btn': 'LoadPageBtn',
			'click #join_page_btn': 'JoinPageBtn',
			'click .logo-image' : 'testEditView'
		},
		
		initialize:function(){
		},
		
		LoadPageBtn : function(){ //로드페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#load_page", { role: "page" });
		},
		
		JoinPageBtn : function(){ //회원가입 페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#Join_page", { role: "page" });
		},
		
		testEditView : function(){
			$(":mobile-pagecontainer").pagecontainer( "change", "#edit_detail", { role: "page" });
		},
		


	});
});