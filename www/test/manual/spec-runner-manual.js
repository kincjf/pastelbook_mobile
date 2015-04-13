/** configure modules path
 * 현재 뭐가 뭔지 모르는 관계로 일단 붙여넣기해서 썼음
 * 차후에 정리할 예정임
 */
'use strict';
(function () {
    var testPath = 'test/manual/';
    var testLibPath = 'test/';
    var basePath = '../lib';

    require.config({
        baseUrl: '../../',
        paths: {
            backbone: 'lib/backbone',
            jquery: 'lib/jquery-1.11.2.min',
            underscore: 'lib/underscore',


            localStorage: 'lib/backbone.localStorage',
            marionette: 'lib/backbone.marionette',

            pb_namespace: 'js/pb_namespace',

            pb_templates: 'js/templates',

            hammer: 'lib/hammer',
            animationFrame: 'lib/animation-frame/AnimationFrame',

            touchEmulator: testLibPath + 'lib/touch-emulator'


            //qunit: 'lib/qunit/qunit-1.15.0',
            //pubsub: testPath + 'lib/pubsub-1.5.0'
            //
            //sinon: 'lib/sinon/sinon-1.11.1',
            //'sinon-qunit': 'lib/sinon/sinon-qunit-1.0.0',
            //'sinon-server': 'lib/sinon/sinon-server-1.11.1',
            //'sinon-timers': 'lib/sinon/sinon-timers-1.11.1',
            //'sinon-ie': 'lib/sinon/sinon-ie-1.11.1',
            // testing library | framework

            //testSuite: 'spec/testSuite'
        },

        shim: {
            jquery: {
                exports: '$'
            },
            underscore: {
                exports: '_'
            },

            backbone: {
                deps: ["jquery", 'underscore'],
                exports: 'Backbone'
            },
            marionette: {
                exports: 'Backbone.Marionette',
                deps: ['backbone']
            },

            "animation-frame": {
                exports: 'AnimationFrame'
            },

            // 여기까진 공용 라이브러리

            pb_namespace: {
                deps: ["jquery"]
            },
            pb_app: {
                deps: ['pb_namespace']
            }

            //qunit: {
            //	exports: 'QUnit',
            //	init: function () {
            //		/** 비동기 실행(requireJS)을 위한 QUnit 설정 */
            //		QUnit.config.autoload = false;
            //		QUnit.config.autostart = false;
            //	}
            //},
            //sinon: {
            //	exports: 'sinon'
            //}
        }
    });

    var testSuite = {
        eventHelperTest: ['spec/gestureHelperTest']
    };

    require(['touchEmulator', 'underscore', 'jquery', 'backbone'], function (TouchEmulator, _) {
        /* require test suite */
        var path = _.mapObject(testSuite, function (testCase) {
            return testPath + testCase;
        });

        var testCase = _.values(path);

        require(testCase, function (Test) {
                TouchEmulator();
            }
        );
    });
})();
  