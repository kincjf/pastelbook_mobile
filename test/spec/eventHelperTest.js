define(['jquery', 'underscore', 'pubsub', 'js/common/EventHelper'],
	function (jQuery, _, PubSub, EventHelper) {
	/** Define the QUnit module and lifecycle. */
	QUnit.module("EventHelperTest", {
		setup: function () {
			// 테스트 실행전 수행되는 함수
			console.log("EventHelper - setup");
			this.event1 = this.event1 || {
				clear: {
					default: 'clear',
					container: {
						default: 'container',
						one: {
							default: 'one',
							sc: {
								default: 'sc'
							}
						}
					}
				},
				add: {
					default: 'add',
					name: {
						default: 'name'
					}
				}
			};

			this.event2 = {
				save: {
					default: 'save',
					project: {
						default: 'project'
					}
				},
				reset: {
					default: 'reset'
				},
				add: {
					default: 'add',
					object: {
						default: 'object',
						image: {
							default: 'image'
						},
						textbox: {
							default: 'textbox'
						}
					}
				},
				change: {
					default: 'change',
					currentScene: {
						default: 'currentScene'
					},
					preview: {
						default: 'preview'
					},
					sceneView: {
						default: 'sceneView'
					},
					scenePreviewView: {
						default: 'scenePreviewView'
					}
				},
				register: {
					default: 'register',
					sceneView: {
						default: 'sceneView'
					},
					scenePreviewView: {
						default: 'scenePreviewView'
					}
				},
				destroy: {
					default: 'destroy'
				}
			};
		},
		teardown: function () {
			// 테스트 실행 뒤 수행됨
			console.log("EventHelper - teardown");
		},
		/** Lifecycle properties are shared on respective test context
		 * [@link http://api.qunitjs.com/QUnit.module/]
		 */
		sharedContext: ["a", "b", "c"]
	});

	QUnit.test("EventHelper Test", function (assert) {
		var eventHelper1 = EventHelper.makeEvent(this.event1);
		var eventHelper2 = EventHelper.makeEvent(this.event2);

		assert.expect(3);
		assert.equal(eventHelper1.clear.container.default, "clear:container");
		assert.equal(eventHelper1.clear.container.one.sc.default, "clear:container:one:sc");
		assert.equal(eventHelper1.add.name.default, "add:name");
	});
});