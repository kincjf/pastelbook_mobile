/**
 메인화면 페이지 컨텐트 뷰
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.FirstPageView,
		
		initialize:function(){
			
		}
	});
});