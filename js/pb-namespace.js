/**
 *  14. 9. 18.   v 0.0.1      Moved by HONG WON GI
 *  - 네임스페이스를 다루는 pb 스크립트를 따로 분리함 ( 관리상의 이유로 )
 *  - 네임스페이스에 타입을 넣음 ( 추후 pb.type.MoveAniParam ) 과 같은 형태로 바꾸기로
 */

var pb = pb || {};

require(['require', 'common/EventHelper'],
	function (require, EventHelper) {
		/** 다이얼로그, current 정보등 단순 data instance는 낙타체로 하고,
		 * Model, Collection, View, Channel, Scene등 Backbone instance는
		 * 클래스 타입으로 명시할 것
		 *
		 * 네임스페이스는 소문자로 할 것
		 */

		/** component instance 저장 */
		pb.app_editor = pb.app_editor || {};
		pb.type = pb.type || {};

		/** Views */
		pb.type.view = pb.type.view || {};

		/** SceneViewSetList */
		pb.type.view.sceneViewSetList = pb.type.view.sceneViewSetList || {};

		/** Menu */
		pb.type.view.menu = pb.type.view.menu || {};
		pb.type.view.menu.project = pb.type.view.menu.project || {};
		pb.type.view.menu.addBaseObject = pb.type.view.menu.addBaseObject || {};

		/** Models */
		pb.type.model = pb.type.model || {};
		pb.type.model.project = pb.type.model.project || {};

		/** Collection */
		pb.type.collection = pb.type.collection || {};
		pb.type.collection.sceneList = pb.type.collection.sceneList || {};

		/** Router */
		pb.type.router = pb.type.router || {
			mobileRouter : this.mobileRouter || {}
		};


		/** Channels */
		pb.type.channel = pb.type.channel || {};

		// 여기서부터는 원기추가
		pb.current = pb.current || {}; // 현재 선택된도구, 현재 슬라이드, 현재 클립보드 등 다수 -> 여기서는 접근가능하게 오브젝트만 만들어놓고 backbone model상속받은 것으로 바꿈
		pb.current.project = pb.current.project || null; // 현재 로딩된 프로젝트 ( 포토샾처럼 다중 불러놓고 작업하기가 된다면, 로딩된 프로젝트중 선택된 프로젝트 )

		/** 현재 선택된 정보 (View instance) */
		pb.current.scene = pb.current.scene || null;
		pb.current.scenePreview = pb.current.scenePreview || null;

		pb.util = pb.util || { };

		pb.dummy = pb.dummy || {
			img: new Image()
		};

		/** global 변수 설정
		 * value 내의 하위 변수들은 모두 대문자를 사용함
		 */
		pb.value = pb.value || {
			VERSION: 0.1,
			PREVIEW_IDX: 0,
			PROJECT_WIDTH: this.PROJECT_WIDTH || 0,
			PROJECT_HEIGHT: this.PROJECT_HEIGHT || 0,
			RESOLUTION: this.RESOLUTION || {
				WIDTH: this.WIDTH || 0,
				HEIGHT: this.HEIGHT || 0,
				FACTOR: this.FACTOR || 1,
				PADDING: this.PADDING || {}
			},
			SCREEN_TYPE: {
				PORTRAIT: 0,      // 세로모드
				LANDSCAPE: 1      // 가로모드
			},
			DEFAULTS: {
				PREVIEW_IMAGE_PATH: "./img/dummy/dummy.png"
			},
			FLAG: {
				ADD: "add",
				REMOVE: "remove"
			}
		};

		// event 호출방법을 관리하고 정형화하기 위해서 EventObject를 String형 Object로 변환해서 이용함
		// 작성방법 - event name 계층에 맞춰서 작성하고 제일 하위에 default : [eventName]을 String형태로 적는다
		// example - add.default = "add", add.name.default = "add:name",
		//           clear.container.one.sc.default = "clear:container:one:sc"
		pb.event = pb.event || EventHelper.makeEvent({
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
		});
	}); // require