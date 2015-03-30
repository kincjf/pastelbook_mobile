define(['jquery', 'underscore', 'backbone', 'pubsub',
		'common/ViewContainer'],
	function (jQuery, _, Backbone, PubSub, ViewContainer) {
		/** Define and Run in each QUnit module and lifecycle.
		 * 모든 testcase마다 setup, teardown이 실행됨 */
		QUnit.module("ViewContainer Test", {
			setup: function () {
				// 테스트 실행전 수행되는 함수

				//this.TestModel = Backbone.Model.extend({
				//	idAttribute: "_id",
				//	initialize: function() {
				//		this.set("_id", this.cid);
				//	}
				//});
				//
				//var testModel = new TestModel();

				this.g_viewTest = new Backbone.View();

				this.g_viewContainer = new ViewContainer();

				console.log("ViewContainer Test - setup");
			},
			teardown: function () {
				// 테스트 실행 뒤 수행됨
				console.log("ViewContainer Test - teardown");
			}
			/** Lifecycle properties are shared on respective test context
			 * [@link http://api.qunitjs.com/QUnit.module/]
			 */
			//sharedContext: ["a", "b", "c"]
		});

		QUnit.test("viewContainer Test - create new instance", function (assert) {
			var viewContainer = new ViewContainer();
			viewContainer.push(this.g_viewTest);
			assert.expect(1);

			assert.notDeepEqual(viewContainer.container, this.g_viewContainer.container);
		});

		QUnit.test("viewContainer Test - push", function (assert) {
			assert.expect(3);

			assert.equal(this.g_viewContainer.push(this.g_viewTest), 1);
			assert.equal(this.g_viewContainer.container.pop(), this.g_viewTest);
			assert.equal(this.g_viewContainer.container.pop(), undefined);
		});

		QUnit.test("viewContainer Test - remove", function (assert) {
			//var message = _.uniqueId('c');
			//var spy = sinon.spy(this.viewContainer, "remove");
			//var token = PubSub.subscribe(message, spy);

			//PubSub.publishSync(message, value);      // 등록된 method를 실행함

			this.g_viewContainer.push(this.g_viewTest);

			assert.expect(3);

			assert.deepEqual(this.g_viewContainer.remove(this.g_viewTest), this.g_viewTest);
			assert.notEqual(this.g_viewContainer.remove(this.g_viewTest), this.g_viewTest);
			assert.equal(this.g_viewContainer.size(), 0);
		});
	});