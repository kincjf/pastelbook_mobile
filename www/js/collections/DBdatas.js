/**
 loadpageview에 들어가는 사진 콜렉션
 db에서 가저온 데이터들
 */

define(["backbone", "js/models/DBdata.js"],
		function(Backbone, data) {
  var datas = Backbone.Collection.extend({
    model: data,
 
  });
  return datas;
});
