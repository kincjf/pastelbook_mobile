/*
 loadpageview의 모델
 
 */
define(['backbone'],function(Backbone){
  'use strict';

  return Backbone.Model.extend({
 
    defaults: {
      src1     : '',
      src2  : '',
      imgName1 : '',
      imgName2 : '',
      imgDate1 : '',
      imgDate2 : '',
      completed : false,
    },
    
  });
});

