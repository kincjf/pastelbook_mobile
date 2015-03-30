/**
 * Created by KIMSEONHO on 2014-10-13.
 */
/**
 * Created by KIMSEONHO
 *
 * 프로젝트 데이터를 가지고 있는 최상위 Model
 * -
 *
 */
define([
	'backbone',
	'radio',
	'localStorage',
	'../collections/SceneList',
], function (Backbone, Radio, LocalStorage, SceneList) {
	'use strict';

	return Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage('pb-project'),

		defaults: {
			_id: '',
			title: 'Project',
			width: 0,
			height: 0,
			createDate: '',
			modifyDate: '',
			sceneList: null,
			comment: '',
			previewImage: 'insert Project Preview Image Path'
		},

		/** backend(REST DB)와 통신하기 위해서 기본 식별자 지정 */
		idAttribute: "_id",

		/** custom getter/setter 사용을 위한 Backbone.Mutators
		 * see also {@link https://github.com/asciidisco/Backbone.Mutators}
		 */
		/** .set을 할 경우 value가 할당되고 난 후에 change event가 발생한다.
		 * validate도 마찬가지
		 * 값이 할당되기 전에 handling을 하려면 save/set을 override 해야함.
		 */

		initialize: function (attributes, options) {
			myLogger.trace('Project - init');

			_.extend(this, Radio.Commands);
			/** listenTo : 다른 객체에 걸려있는 이벤트를 감지함.
			 * 무슨뜻이냐면 .on으로 이벤트를 걸고 listenTo는 걸려있는 이벤트를 들을 수 있도록
			 * 엮어주는 역할임. View에서 model, collection의 이벤트를 들을 수 있게 하는 경우에
			 * listenTo를 이용함.
			 */
			// this.listenTo(this, "change", "changeSceneList");

			/**
			 * - 초기화 확인사항
			 * 1. _id 값 생성
			 * 2. createDate, modifyDate 생성
			 * 3. sceneList 초기화
			 */
			if (!_.has(attributes, "_id")) {
				this.set('_id', this.cid);
			}

			var initDate = Date.now();
			this.set('createDate', initDate);
			this.set('modifyDate', initDate);

			if (!_.has(attributes, "sceneList")) {
				/** attr에 sceneList가 없을경우 */
				this.set('sceneList', new SceneList());
			} else {
				/** attr에 sceneList가 있는경우 */
				var _sceneList = attributes.sceneList;

				if(_sceneList instanceof SceneList) {
					/** Backbone.Collection(SceneList) type일 경우는 그냥 변경하면 된다. */
					this.set('sceneList', _sceneList);
				} else {
					/** 하지만 그냥 array type일 경우 wrapping을 해주어야한다. */
					this.set('sceneList', new SceneList(_sceneList));
				}
			}

			/** 무한루프에 걸릴 수 있기 때문에 event binding을 아래쪽에 배치해야함
			 * 아니면 reset event를 만들고 로딩을 할 때 trigger를 하는 방법이 있음.
			 */
				this.comply("save:project", this.saveProject, this);
		}   // end initialize

		/** .set('attrName', data, options)
		 * 정보가 바뀌면 change event 발생
		 */

		/** .reset - 데이터를 넣으면 tree structured data를 알아서 binding함.
		 * 음 신기하군.. 로딩은 이게 다임.
		 * {@link http://backbonejs.org/#Collection-reset}
		 *
		 * project.sceneList를 Scene loading을 위한 데이터로 이용함.
		 *
		 * projectInfo와 projectData(sceneList)로 나눈 이유는 raw data는 change하면 그만이지만
		 * Backbone(.extend) Object는 단순 값 변경 뿐만 아니라 이벤트 바인딩등이 필요하고
		 * 변경된 이전 데이터는 [this._previousAttributes]로 이동하는데 View에 걸린 이벤트들이
		 * 현재의 attributes가 아닌 _previousAtributes에 계속 남아있기 때문에
		 *
		 * !sceneList는 변경하지 않고 재사용(reset)하면서 View에 바인딩된 이벤트들을 활용함.
		 *
		 * 차후 지원 format이 아닐경우 error handling을 할 수 있도록 해야 될 것 같음.
		 * 사용자가 임의의 데이터를 넣을 수도 있기 때문에 지원 데이터 structure가 아니면
		 * error/throw를 발생시키고 사용자에게 알릴 수 있도록 해야함.
		 */
	});   // end Backbone.Model.extend
});

