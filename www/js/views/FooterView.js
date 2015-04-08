/**
 * editor main화면에서 Filter 관련 기능을 제공함
 * Created by KIMSEONHO on 2015-03-28.
 */
define(['marionette','pb_templates','lightSlider','fabric'], function (Marionette ,templates,light,fabric){
	"use strict"

	return Marionette.ItemView.extend({
		template : templates.FooterView,
	//	count : 1,
		
	events :{
		//'click #img-filter': 'clickButton',
		'click #filter0' : 'imageFiterSepia',
		'click #filter1' : 'imageFilterSepia2',
		'click #filter2' : 'imageFilterInvert',
		'click #filter3' : 'imageFiltergraycasle',
		'click #filter4' : 'imageFilterConvolute',
		'click #filter5' : 'imageFilterNoise',
	},
	ui: {
		slider: "#slider-ul"
	},
	initialize : function(){
	},
	
	onRender : function(){
		this.ui.slider.lightSlider({ //필터이미지 슬라이더
	        item:4,
	        slideMove:2,
			loop:false,
	        keyPress:true,
	        speed:600
	    });
	},
	
	/*clickButton: function() {
	
		if(this.count ==1 ){
			$('#editor_main_footer').hide();
			this.count = 2 ;
		}
		else if(this.count == 2){
			$('#editor_main_footer').show();
			
				var filter = fabric.Image.filters;
				var filters = [new filter.Sepia(),new filter.Sepia2()
								,new filter.Invert(),new filter.Grayscale()
								,new filter.Convolute({matrix:[1,1,1,1,0.7,-1,-1,-1,-1]})
								,new filter.Convolute({matrix:[0,-1,0,-1,5,-1,0,-1,0]})];
				
				var canvas = $('<canvas id="myCanvas"></canvas>');
				var f_canvas = new fabric.Canvas('myCanvas');
				for(var i=0; i<filters.length; i++){
					var image1 = fabric.util.object.clone(pb.current.object.image);
					
					image1.filters[0] = filters[i];
					
					f_canvas.add(image1);
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
					f_canvas.clear();
					$('#sepia'+i).attr('src',test);
				}
			
			this.count = 1 ;
			}
	},*/
	imageFiterSepia : function(){
		var canvas = pb.current.scene.canvas;
		var image = pb.current.object.image;
		
		image.filters[0] = new fabric.Image.filters.Sepia();
		
		image.applyFilters(canvas.renderAll.bind(canvas));
	},
	
	imageFilterSepia2 : function(){
		var canvas = pb.current.scene.canvas;
		var image = pb.current.object.image;
		
		image.filters[0] = new fabric.Image.filters.Sepia2();
		
		image.applyFilters(canvas.renderAll.bind(canvas));
	},
	
	imageFilterInvert : function(){
		var canvas = pb.current.scene.canvas;
		var image = pb.current.object.image;
		
		image.filters[0] = new fabric.Image.filters.Invert();
		
		image.applyFilters(canvas.renderAll.bind(canvas));
	},
	
	
	});
});

