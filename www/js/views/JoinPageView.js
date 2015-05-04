/**
	회원가입 뷰 
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.JoinPageView,
		
		initialize:function(){
			
		}
	});
});