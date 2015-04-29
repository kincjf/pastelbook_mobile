/**
 imagelistview에 들어가는 사진 콜렉션
 db에서 가저온 데이터들
 */

define(["backbone", "js/models/Picture"],
		function(Backbone, picture) {
  var pictures = Backbone.Collection.extend({
    model: picture,
 
  });
  return pictures;
});
