/**
 * Created by KIMSEONHO on 2015-04-13.
 */
/**
 * 1. Touch Event 조작을 위한 Callback Function 정의
 * - gesture Event 조작에 따른 callback function의 일관화를 위하여
 *
 * 2. touch Event에 대한 callback function 제작작 */
define(["animationFrame"], function (AnimationFrame) {
    'use strict';

    /**
     * 각 gesture - touch(pan), rotate, pinch, swipe, tab, doubletap에 대한 기본 event handler 제공
     * @return Marionette.Object - GestureHelper
     */
    var GestureHelper = {
        /**
         * setElement(options)
         * @param options.el - 움직임의 대상 el (must be specified)
         * @param options.START_X - 움직임이 시작할 X좌표 (기본값 0)
         * @param options.START_Y - 움직임이 시작할 Y좌표 (기본값 1)
         * @param options.scale - 움직임이 시작할 크기 (없을경우 기본값 1)
         * @param options.angle - 움직임이 시작할 각도 (없을경우 기본값 0)
         */
        setGesture: function (options) {
            this.el = options.el;

            this.ticking = false;
            this.transform = null;

            var initOptions = options;
            if (!options.START_X) {
                initOptions.START_X = 0;
            }
            if (!options.START_Y) {
                initOptions.START_Y = 0;
            }
            if (!options.scale) {
                initOptions.scale = 1;
            }
            if (!options.angle) {
                initOptions.angle = 0;
            }

            // 기준 위치 지정
            this.transform = {
                translate: {
                    original: {
                        x: options.START_X,
                        y: options.START_Y
                    },
                    current: {
                        x: options.START_X,
                        y: options.START_Y
                    }
                },
                scale: options.scale,
                angle: {
                    original: options.angle,
                    current: options.angle
                },
                rx: 0,
                ry: 0,
                rz: 1
            };
        },

        reqAnimationFrame: new AnimationFrame(),

        requestElementUpdate: function () {
            if (!this.ticking) {
                this.reqAnimationFrame.request(_.bind(this.updateElementTransform, this));
                this.ticking = true;
            }
        },

        updateElementTransform: function () {
            var value = [
                'translate3d(' + this.transform.translate.current.x + 'px, ' + this.transform.translate.current.y + 'px, 0)',
                'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
                'rotate3d(' + this.transform.rx + ',' + this.transform.ry + ',' + this.transform.rz + ',' + this.transform.angle.current + 'deg)'
            ];

            value = value.join(" ");
            this.el.style.webkitTransform = value;
            this.el.style.mozTransform = value;
            this.el.style.transform = value;
            this.ticking = false;        // flag for check moving
        },

        onPan: function (event) {
            if (event.type == 'panstart') {
                this.transform.translate.original.x = this.transform.translate.current.x || 0;
                this.transform.translate.original.y = this.transform.translate.current.y || 0;
            }

            this.transform.translate.current.x = this.transform.translate.original.x + event.deltaX;
            this.transform.translate.current.y = this.transform.translate.original.y + event.deltaY;

            this.requestElementUpdate();
        },

        onPinch: function (event) {
            this.transform.scale = event.scale;

            this.requestElementUpdate();
        },

        onRotate: function (event) {
            if (event.type == 'rotatestart') {
                this.transform.angle.original = this.transform.angle.current || 0;
            }

            this.transform.angle.current = this.transform.angle.original + event.rotation;

            this.requestElementUpdate();
        },

        /** should implement handler for swipe event */
        onSwipe: function (event) {
            console.log("GestureHelper - onSwipe");
        },

        /** should implement handler for tap event */
        onTap: function (event) {
            console.log("GestureHelper - onTap");
            //transform.rx = 1;
            //transform.angle = 25;
            //
            //this.requestElementUpdate();
        },

        /** should implement handler for doubletap event */
        onDoubleTap: function (event) {
            console.log("GestureHelper - onDoubleTap");
            //transform.rx = 1;
            //transform.angle = 80;
            //
            //this.requestElementUpdate();
        }
    }

    return GestureHelper;
});