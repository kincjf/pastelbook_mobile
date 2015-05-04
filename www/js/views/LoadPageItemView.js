/**
 * 웹sql 에서 긁어온 이미지와 사진이름 사진날짜 불러옴
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		
		template : templates.LoadPageItemView,
		
		initialize:function(){

		}
	});
});