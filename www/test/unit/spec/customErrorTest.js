define(['jquery', 'underscore', 'pubsub'],
	function (jQuery, _, PubSub, customError) {
	/** Define the QUnit module and lifecycle. */
	QUnit.module("exampleTest", {
		setup: function () {
			// 테스트 실행전 수행되는 함수
			console.log("exampleTest - setup");
		},
		teardown: function () {
			// 테스트 실행 뒤 수행됨
			console.log("exampleTest - teardown");
		},
		/** Lifecycle properties are shared on respective test context
		 * [@link http://api.qunitjs.com/QUnit.module/]
		 */
		sharedContext: ["a", "b", "c"]
	});

	QUnit.test("custom Error Test", function (assert) {
		var message = _.uniqueId('c');
		var spy = sinon.spy(customError);

		var value = this.sharedContext.pop();
		PubSub.publishSync(message, value);      // 등록된 method를 실행함

		assert.expect(2);
		assert.equal(spy.getCall(0).args[0], value + 1);   // 왜 c가 아니고 c1이지 ㅡㅡ;;
		assert.equal(this.sharedContext.length, 2);
	});
});