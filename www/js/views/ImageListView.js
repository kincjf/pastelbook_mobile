/**
 * Image List를 관리하는 LayoutView
 * Created by KIMSEONHO on 2015-03-28.
 */
define(['marionette',
		'pb_templates',
		'js/collections/Pictures',
		'js/views/MyImageView'],function (Marionette, templates, pictures, Myimageview) {
			
		'use strict';
	return Marionette.CompositeView.extend({
		  tagName:"div", 
		  template : templates.ImageListView,
		  childView: Myimageview  ,
		
		  childViewContainer : '#imagelist',
		  
		  /*events:{
			  'click #imgSearchBtn' : 'search',
			  //'click .btn btn-default' : 'imgClick'	
		  },*/
		  
		  initialize : function(){
			  var picture  =  new pictures();
			  this.collection = picture;
			  
			  this.collection.add({
				  title : '1.jpg'
			  });
		  },
		  
		 /* this.collection.add({
			  title : src
		  });*/
		  
	});
});