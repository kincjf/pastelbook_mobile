/**
 * editor main화면에서 Filter 관련 기능을 제공함 Created by KIMSEONHO on 2015-03-28.
 */
define([ 'marionette', 'pb_templates', 'lightSlider', 'fabric' ], function(
		Marionette, templates, light, fabric) {
	"use strict"

	return Marionette.ItemView.extend({
		template : templates.FooterView,

		events : {
			'click #sepia1' : 'imgGet',
		// 'click #sepia2': 'sepia'
		},
		ui : {
			slider : "#slider-ul"
		},

		initialize : function() {

		},
		onRender : function() {
			this.ui.slider.lightSlider({ // 필터이미지 슬라이더
				item : 4,
				slideMove : 2,
				loop : false,
				keyPress : true,
				speed : 600
			});

		},

		imgGet : function() { // 신뷰에서 이미지 선택 했을때 푸터로 이미지 불러옴

			// var image1 = fabric.util.object.clone(pb.current.object.image);
			var image1 = pb.current.object.image;
			console.log(image1);
			var canvas = $('<canvas id="myCanvas"></canvas>');
			// console.log(canvas);
			var f_canvas = new fabric.Canvas('myCanvas');
			f_canvas.add(image1);

			image1.filters[0] = new fabric.Image.filters.Sepia();

			image1.applyFilters(f_canvas.renderAll.bind(f_canvas));

			var test = f_canvas.toDataURL({
				format : 'png',
				multiplier : 1,
				quality : 1,
				left : f_canvas.item(0).left,
				top : f_canvas.item(0).top,
				width : f_canvas.item(0).width,
				height : f_canvas.item(0).height
			});
			console.log(test);
		}

	});
});
