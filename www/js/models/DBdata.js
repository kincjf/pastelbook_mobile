/*
 *loadpageview의 모델
 *웹DB에서 불러온 데이터 저장
 *Create by Sumin on 5월 중 
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

