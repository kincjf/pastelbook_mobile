/**
 
 */

define(['marionette',
		'pb_templates',
		//'js/collections/Pictures',
		'js/views/LoadPageItemView'],function (Marionette, templates, loadPageview) {
			
		'use strict';
	return Marionette.CompositeView.extend({
		  tagName:"div", 
		  template : templates.LoadPageCompositeView,
		  childView: loadPageView,
		
		  childViewContainer : '#grid_image',
		  
		  /*events:{
			  'click #imgSearchBtn' : 'search',
			  //'click .btn btn-default' : 'imgClick'	
		  },*/
		  
		  initialize : function(){
			
		  },
		  
		 /* this.collection.add({
			  title : src
		  });*/
		  
	});
});