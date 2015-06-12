/**
 * 웹sql 에서 긁어온 이미지와 사진이름 사진날짜 불러옴
 * 템플릿으로 불러와서 뿌려줌
 * Create by Sumin on 5월 중
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		
		template : templates.LoadPageItemView,
		
		initialize:function(){

		}
	});
});