define(['jquery', 'underscore', 'pubsub',
		'../../js/collections/SceneList'],
	function (jQuery, _, PubSub, SceneList) {
		/** Define the QUnit module and lifecycle. */
		QUnit.module("SceneList Test", {
			setup: function () {
				// 테스트 실행전 수행되는 함수
				console.log("SceneList Test - setup");
			},
			teardown: function () {
				// 테스트 실행 뒤 수행됨
				console.log("SceneList Test - teardown");
			}
			/** Lifecycle properties are shared on respective test context
			 * [@link http://api.qunitjs.com/QUnit.module/]
			 */
			//sharedContext: ["a", "b", "c"]
		});

		QUnit.test("SceneList Test", function (assert) {
			var sceneList = new SceneList();

			var message = _.uniqueId('c');
			var spy = sinon.spy(SceneList);

			var value = sceneList.push({});

			PubSub.publishSync(message, value);      // 등록된 method를 실행함

			assert.expect(2);
			assert.equal(spy.getCall(0).args[0], value + 1);   // 왜 c가 아니고 c1이지 ㅡㅡ;;
			assert.equal(this.sharedContext.length, 2);
		});

		QUnit.test("SceneList nestedModel Trigger Event Test", function (assert) {
			var sceneList = new SceneList();

			var message = _.uniqueId('c');
			var spy = sinon.spy(SceneList);

			var value = sceneList.push({});

			PubSub.publishSync(message, value);      // 등록된 method를 실행함

			assert.expect(2);
			assert.equal(spy.getCall(0).args[0], value + 1);   // 왜 c가 아니고 c1이지 ㅡㅡ;;
			assert.equal(this.sharedContext.length, 2);
		});
	});