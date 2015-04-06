/**
 * Created by KIMSEONHO on 2015-02-25.
 *
 * Javascript Object를 편리하게 사용하기 위해서
 * 구현되지 않은 기능을 추가
 */
Array.prototype.remove = function(index) {
	return this.splice(index, 1)[0];
};

Array.prototype.clear = function() {
	while (this.length) {
		this.pop();
	}
};