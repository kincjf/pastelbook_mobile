/**
 메인화면 페이지 컨텐트 뷰
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.FirstPageView,
		
		events :{
			'click #load_page_btn': 'LoadPageBtn',
		},
		
		initialize:function(){
		},
		LoadPageBtn : function(){
			$(":mobile-pagecontainer").pagecontainer( "change", "#load_page", { role: "page" });
			
		}

	});
});