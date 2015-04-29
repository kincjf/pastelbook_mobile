/*
 ImagelistView의 모델
 
 */
define(['backbone'],function(Backbone){
  'use strict';

  return Backbone.Model.extend({
 
    defaults: {
      title     : '',
      completed : false,
      
    },
    
  });
});

