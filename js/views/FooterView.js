/**
 * editor main화면에서 Filter 관련 기능을 제공함
 * Created by KIMSEONHO on 2015-03-28.
 */
define(['marionette','pb_templates','lightSlider'], function (Marionette ,templates,light){
	"use strict"

	return Marionette.ItemView.extend({
		template : templates.FooterView,
		
	events :{
		
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

		
	var filterimg = pb.current.object.image;
		$('.Filter-Image').attr("src",filterimg);
	
		//캔버스에 잇는 이미지 필터이미지로 가저오기
		
	
	}

	});
});

