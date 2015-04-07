/*global define */
/**
 * 파일 로드를 위한 custom Module
 * filepicker.io, app내 file storage에 접근방법 제공
 */
define(['jquery', 'marionette'], function ($, Marionette) {
	'use strict';

	return Marionette.Object.extend({
		initialize: function (options) {
			myLogger.trace("FileController - init");
		},


		loadFile: function (file, target, options) {
			var reader = new FileReader();

			if (options.type == "image") {
				if(target.is("img")) {
					reader.onloadend = function () {
						/** 단순 이미지 태그*/
						target[0].src = reader.result;
					}
				} else if (target.is("canvas")) {
					reader.onloadend = function () {
						this.loadImageToCanvas(reader.result, target);
						}
				}

				if (file) {
					reader.readAsDataURL(file);
				} else {
					target[0].src = "";
				}
			}
		},

		/** canvas에 로딩은 되지만, 이미지에 딱 맞게 렌더링이 되지 않기 때문에
		 * css로 수정을 해야함.
		 */
		loadImageToCanvas: function (data, target) {
			var canvas = target[0];
			var context = canvas.getContext('2d');

			// load image from data url
			var imageObj = new Image();
			imageObj.onloadend = function () {
				context.drawImage(this, 0, 0);
			};

			imageObj.src = data;
		}
	});
});
