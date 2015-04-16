/**
 * My Collection 관련 이미지를 관리하는 View
 * Created by KIMSEONHO on 2015-03-28.
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		
		template : templates.MyImageView,
		
		initialize:function(){
			
			
		}
	});
});