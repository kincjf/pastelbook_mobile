/**
 로그인 페이지
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.LoginPageView,
		
		initialize:function(){
			
		}
	});
});