define(['jquery', 'underscore', 'backbone', 'pubsub'],
	function (jQuery, _, Backbone, PubSub) {
	/** Define the QUnit module and lifecycle. */
	QUnit.module("fetch Test", {
		setup: function () {
			// 테스트 실행전 수행되는 함수

			var Object = Backbone.Model.extend({
				intialize: function (attrs, options) {
					console.log("Object - Initialize");

					this.on("change", this.changeObject, this)
				},

				defaults: {
					_id: '',
					path: '',
					thumbPath: '',
					name: '',
					size: -1,
					width: -1,
					height: -1,
					type: 'object'
				},

				idAttribute: "_id",

				changeObject: function(model, options) {
					console.log("Object - changeObject");
				}
			});

			var ObjCollection = Backbone.Collection.extend({
				model: Object,

				initialize: function (models, options) {
					this.on("add", this.addEvent, this);
				},

				//parse: function(response) {
				//	return response.results;
				//},
				//
				//sync: function(method, model, options){
				//	options.timeout = 10000;
				//	options.dataType = "jsonp";
				//	return Backbone.sync(method, model, options);
				//},

				url: 'rest/resource/resimage',

				addEvent: function (model, collection, options) {
					console.log("objCollection - addEvent");
					console.log(model);
				}
			});

			this.objCollection = new ObjCollection();

			console.log("fetch Test - setup");
		},
		teardown: function () {
			// 테스트 실행 뒤 수행됨
			console.log("fetch Test - teardown");
		}
		/** Lifecycle properties are shared on respective test context
		 * [@link http://api.qunitjs.com/QUnit.module/]
		 */
		//sharedContext: ["a", "b", "c"]
	});

	QUnit.test("fetch Test", function (assert) {
		this.objCollection.fetch();// 등록된 method를 실행함

		assert.expect(1);
		assert.equal(this.objCollection.length, 74);   // 왜 c가 아니고 c1이지 ㅡㅡ;;
	});
});