define(['jquery', 'underscore', 'pubsub',
'../../js/collections/SceneList', '../../js/models/Scene'], function (jQuery, _, PubSub, SceneList, Scene) {
	/** Define the QUnit module and lifecycle. */
	QUnit.module("nestedModelTest", {
		setup: function () {
			// 테스트 실행전 수행되는 함수

			this.scene = new Scene();
			this.scene.listenTo("")

			this.sceneList = new SceneList();
			console.log("nestedModelTest - setup");
		},
		teardown: function () {
			// 테스트 실행 뒤 수행됨
			console.log("nestedModelTest - teardown");
		},
		/** Lifecycle properties are shared on respective test context
		 * [@link http://api.qunitjs.com/QUnit.module/]
		 */
		sharedContext: ["a", "b", "c"]
	});

	QUnit.test("basic sharedContext test, and spy Test which returns for all calls - is c", function (assert) {
		var message = _.uniqueId('c');
		var spy = sinon.spy();
		var token = [];

		token[0] = PubSub.subscribe(message, spy);
		var value = this.sharedContext.pop();
		PubSub.publishSync(message, value);      // 등록된 method를 실행함

		assert.expect(2);
		assert.equal(spy.getCall(0).args[0], value + 1);   // 왜 c가 아니고 c1이지 ㅡㅡ;;
		assert.equal(this.sharedContext.length, 2);
	});

	QUnit.test("spy Test which returns for provided function", function (assert) {
		var object = {
			func: function (msg) {
				return 'i`m ' + msg + 'custom func~!';
			}
		}

		var spy = sinon.spy(object, 'func');


		//spy.withArgs('good');
		//spy.withArgs(1)


		object.func('good');
		object.func(1)


		assert.expect(6);

		assert.ok(object.func.calledWith('good'));
		assert.ok(object.func.calledTwice);
		assert.ok(object.func.calledWith(1));

		assert.equal(object.func.getCall(0).args[0], 'good');
		assert.equal(object.func.getCall(1).args[0], 1);
		assert.equal(spy.getCall(1).args[0], "1");
	})


	QUnit.test("spy Test which returns for jquery.ajax", function (assert) {
		assert.expect(2)


		var spy = sinon.spy(jQuery, 'ajax')


		jQuery.getJSON('/todos/completed')


		assert.expect(3);
		assert.ok(jQuery.ajax.calledOnce)

		assert.equal(jQuery.ajax.getCall(0).args[0].url, '/todos/completed');
		assert.equal(jQuery.ajax.getCall(0).args[0].dataType, 'json');
	});
});