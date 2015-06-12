/**
 *로그인 페이지 
 *템플릿으로 뿌려줌
 *Create by Sumin on 5월 중
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.LoginPageView,
		
		initialize:function(){
			
		}
	});
});