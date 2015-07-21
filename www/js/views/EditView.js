/**
 * 사진/배경 편집시 이용하는 LayoutView
 * - 사진과 배경에 따라서 제공하는 Layout가 다름
 * Created by KIMSEONHO on 2015-03-30.
 */
/*
 * 사진을 편집시 이용하는 Page
 * flip, crop, 투명화 기능
 * jetty서버를 이용하여 이미지 편집 처리 후 다시 response하는 방식으로 png처리를 한다.
 * 
 * */
define(['marionette','pb_templates'],function (Marionette,templates) {
	return Marionette.ItemView.extend({
		template: templates.EditView,
		ui:{
			
		},
		events:{
			'click #image_select': 'image_select',	// 이미지 이동가능
			'click #edge': 'edge',	//투명화를 위해 라인을 표시하게 하는 기능
			'click #crop': 'crop',  //잘라내기
			'click #flip': 'flip',	//좌우변환
			'click #crop_save': 'crop_save', //좌우변환 
			'click #save' : 'save', //편집완료 & 저장
			'click #close': 'close', // 닫기
			'click #edge_save': 'edge_confirm', //png처리 실시(서버로 이미지 데이터를 보낸다)
			'click #edge_fore' : 'edge_fore' //edge foreground / background 설정
		},
		canvas1 : null,	//fabric canvas객체 (이미지 삽입)
		canvas2 : null, //fabric canvas객체 (edge)
		cavnas3 : null, //fabric canvas객체 (crop)
		rect_up : null, //crop시 잘라지는 부분 사각형
		rect_down : null, //crop시 잘라지는 부분 사각형
		rect_left : null, //crop시 잘라지는 부분 사각형
		rect_right : null, //crop시 잘라지는 부분 사각형
		rect_crop : null, //crop시 잘라지고 남는부분 사각형
		img : null, //이미지 객체
		fore_point: null, //foreground 라인 표시 좌표값
		back_point: null, //background 라인 표시 좌표값
		point_flag: false,	// true:background / false:foreground
		point_length: 0,	//point
		
		onRender:function(){
			var that = this;
			$('#edit_detail').on("pageshow",function(){
				//페이지가 보여질때 화면의 높이를 계산하여 중앙부분의 크기를 화면 크기에 맞게 설정하는 부분.
				//그에 맞춰서 canvas의 크기도 맞춰준다.
				var screen = $.mobile.getScreenHeight(),
			    header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header:eq(1)").outerHeight(),
			    footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer:eq(1)").outerHeight(),
			    contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height(),
			    content = screen - header - footer - contentCurrent;
			    $(".ui-content").css('height',content);
			    $('#canvas1').attr('width',$( window ).width());
			    $('#canvas1').attr('height',content);
			    $('#canvas2').attr('width',$( window ).width());
			    $('#canvas2').attr('height',content);
			    $('#canvas3').attr('width',$( window ).width());
			    $('#canvas3').attr('height',content);
			    
			    that.canvas1 = new fabric.Canvas('canvas1');//이미지
			    that.canvas2 = new fabric.Canvas('canvas2',{ isDrawingMode: true});//edge
			    that.canvas3 = new fabric.Canvas('canvas3');//crop
			    $('.canvas-container').css('position','absolute');
				$('#canvas1').parent().css('z-index',9999);
				
				//crop시 마우스이벤트 리스너
				var started = false;
				that.canvas3.on('mouse:down',function(options){
					started = true;
				});
				that.canvas3.on('mouse:move',function(options){
					if(!started){
						return false;
					}
					that.setRect(that.rect_up,that.rect_down,that.rect_left,that.rect_right,that.rect_crop);
				});
				that.canvas3.on('mouse:up',function(options){
					started=false;
				});
				
				that.init();
			});
			
		},
		save:function(){
			
		},
		close:function(){
			$(":mobile-pagecontainer").pagecontainer( "change", "#first_page", { role: "page" });
		},
		init:function(){
			this.canvas1.clear();
			this.canvas2.clear();
			this.canvas3.clear();
			var that = this;
			//---------아래 주석부분을 적용할 수 없어 임의로 이미지를 불러다 쓰는 부분.
			fabric.Image.fromURL('./test/image/my-image3.jpg', function(imgInstance) {
				that.img = imgInstance;
				that.img.set('transformMatrix',[1,0,0,1,0,0]);
				that.canvas1.add(that.img);
			});
			//--------------------------------------------------
			/* 나중에 main화면에서 이미지 객체를 전역에서 가져와서 fabric객체를 바꿔주는 부분이다.
			if(pb.current.object != null){
				this.img = fabric.util.object.clone(pb.current.object.image);
				this.img.left=0;
				this.img.top=0;
				if(this.img.transformMatrix == null){
					this.img.set('transformMatrix',[1,0,0,1,0,0]);
				}
				this.canvas1.add(this.img);
			}
			*/
			$('#canvas1').parent().css('z-index',9999);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9996);
			var that = this;
			this.canvas2.on("mouse:up",function(){
				//fabric객체에 들어있는 라인의 좌표값을 받아 fore_point/back_point배열에 넣어준다.
				//이걸가지고 서버에서 이미지 처리를 한다.
				if(that.point_flag == false){
					for(var i=0 ; i<that.canvas2.freeDrawingBrush._points.length;i++){
						that.fore_point.push(that.canvas2.freeDrawingBrush._points[i]);
					}
				}else{
					for(var i=0 ; i<that.canvas2.freeDrawingBrush._points.length;i++){
						that.back_point.push(that.canvas2.freeDrawingBrush._points[i]);
					}
				}
			});
			
			this.fore_point = [];
			this.back_point = [];
			this.point_flag = false;
		},
		
		save:function(e){
			this.observeBoolean(true,true);
			pb.current.object.image = this.img;
			this.canvas1.clear();
			this.canvas2.clear();
			this.canvas3.clear();
		},
		
		edge:function(e){
			this.fore_point = [];
			this.back_point = [];
			this.canvas2.clear();
			$('#edge_save').remove();
			$('#edge_fore').remove();
			$('#edge').parent().append($('<a href="javascript:void(0)" id="edge_save">confirm</a>'));
			$('#edge').parent().append($('<a href="javascript:void(0)" id="edge_fore">background</a>'));
			$('#canvas1').parent().css('z-index',500);
			$('#canvas3').parent().css('z-index',400);
			$('#canvas2').parent().css('z-index',9999);
			this.canvas2.freeDrawingBrush = null;
			this.canvas2.freeDrawingBrush = new fabric['PencilBrush'](this.canvas2);
			this.canvas2.freeDrawingBrush.width = parseInt(5, 5) || 1;
			this.canvas2.freeDrawingBrush.color = 'rgb(0, 255, 0)';
		    this.observeBoolean(false,true);
		},
		edge_confirm : function(){
		    console.log(this.fore_point);
			var item_left = this.canvas1.item(0).left;
			var item_top = this.canvas1.item(0).top;
			var item_width = this.canvas1.item(0).width;
			var item_height = this.canvas1.item(0).height;
			console.log(this.canvas2.width);
			var dataURL = this.canvas1.toDataURL({
				format: 'jpg',
				multiplier: 1,
				quality: 1,
				left: this.canvas2.left,
				top: this.canvas2.top,
				width: this.canvas2.width,
				height: this.canvas2.height
			});
			
			var img = {};
			img.x = item_left; img.y = item_top;
			img.w=item_width; img.h=item_height;

			var that = this;
			$.ajax({
				url: 'http://192.168.0.14:8084/hello',	//서버로 데이터를 보내는 부분.
				type: 'POST',
				data: {
					url: dataURL,
					img: JSON.stringify(img),
					fore: JSON.stringify(this.fore_point),
					back: JSON.stringify(this.back_point)
				},
				success: function(data){
					var a = $.parseJSON(data);

					var url = "data:image/png;base64,"+a.url;
					//--------------------------------------------------
					that.canvas1.clear();
					fabric.Image.fromURL(url, function(imgInstance) {
						that.img = imgInstance;
						that.img.set('transformMatrix',[1,0,0,1,0,0]);
						that.canvas1.add(that.img);
						$('#image_select').click();
						$('#edge_save').remove();
					});
				}
				
			});
		},
		edge_fore:function(){
			console.log(this.canvas2.freeDrawingBrush._points);
			if($('#edge_fore').html()=='foreground'){
				$('#edge_fore').html('background');
				this.point_flag = false;
				this.canvas2.freeDrawingBrush.color = 'rgb(0, 255, 0)';
			}else{
				$('#edge_fore').html('foreground');
				this.point_flag = true;
				this.canvas2.freeDrawingBrush.color = 'rgb(255, 0, 0)';
			}
		},
		image_select:function(){
			this.canvas2.clear();
			$('#canvas1').parent().css('z-index',9999);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9998);
			$('#edge_save').remove();
			$('#edge_fore').remove();
			this.observeBoolean(true,true);
			console.log(this.canvas2.freeDrawingBrush);
		},
		crop_save:function(e){  // 이미지에서 선택된 부분을 제외하고 잘라낸다.
			var dataURL = this.canvas1.toDataURL({
				format: 'jpg',
				multiplier: 1,
				quality: 1,
				left: this.rect_crop.getLeft(),
				top: this.rect_crop.getTop(),
				width: this.rect_crop.getWidth(),
				height: this.rect_crop.getHeight()
			});

			var that = this;
			fabric.Image.fromURL(dataURL, function(imgInstance) {
				that.canvas1.clear();
				that.img = imgInstance;
				that.img.set('transformMatrix',[1,0,0,1,0,0]);
				that.canvas1.add(that.img);
			});
			$('#image_select').click();
			$('#crop_save').remove();
		},
		
		crop:function(e){
			this.canvas2.clear();
			$('#edge_save').remove();
			$('#edge_fore').remove();
			$('#crop_save').remove();
			this.removeRect();
			
			$('#crop').parent().append($('<a href="javascript:void(0)" id="crop_save">crop_save </a>'));
			$('#canvas1').parent().css('z-index',9998);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9999);
			this.observeBoolean(false,false);
			this.createRect();
			
		},
		
		flip:function(e){  // fabric에 transformMatrix를 통하여 이미지를 좌우 반전시킨다.
			this.canvas2.clear();
			$('#edge_save').remove();
			$('#edge_fore').remove();
			if(this.img.transformMatrix[0]==1){
				this.img.set('transformMatrix',[-1,0,0,1,0,0]);
			}else{
				this.img.set('transformMatrix',[1,0,0,1,0,0]);
			}
			
			$('#canvas1').parent().css('z-index',9999);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9998);
			this.observeBoolean(true,true);
		},
		
		observeBoolean:function(flag,rect_flag){	
			//flip,crop등 기능 변경시 가지고있던 뷰적인 객체들을 없애거나 생성시키기 위한 객체
			if(this.canvas1.item(0) != undefined){
				this.canvas1.item(0)['hasControls'] = flag;
				this.canvas1.item(0)['hasBorders'] = flag;
			}
			if(rect_flag == true){
				this.removeRect();
				$('#crop_save').remove();
			}
			this.canvas1.renderAll();
		},
		
		createRect:function(){
			var item_left = this.canvas1.item(0).left;
			var item_top = this.canvas1.item(0).top;
			var item_width = this.canvas1.item(0).width;
			var item_height = this.canvas1.item(0).height;
			var c_left = this.canvas1.left;
			var c_top = this.canvas1.top;
			var c_width = this.canvas1.width;
			var c_height = this.canvas1.height;
			
			this.rect_up = new fabric.Rect({
		        left: 0,
		        top: 0,
		        width: c_width,
		        height: item_top,
		        angle: 0,
		        fill: 'rgba(0,0,0,0.6)',
		    });
			this.rect_down = new fabric.Rect({
		        left: 0,
		        top: item_height + item_top,
		        width: c_width,
		        height: c_height - (item_height+ item_top),
		        angle: 0,
		        fill: 'rgba(0,0,0,0.6)',
		    });
			this.rect_left = new fabric.Rect({
		        left: 0,
		        top: item_top,
		        width: item_left,
		        height: item_height,
		        angle: 0,
		        fill: 'rgba(0,0,0,0.6)',
		    });
			this.rect_right = new fabric.Rect({
		        left: item_left + item_width,
		        top: item_top,
		        width: c_width - (item_left+item_width),
		        height: item_height,
		        angle: 0,
		        fill: 'rgba(0,0,0,0.6)',
		    });
			this.rect_crop = new fabric.Rect({
		        left: item_left,
		        top: item_top,
		        width: item_width,
		        height: item_height,
		        angle: 0,
		        fill: 'rgba(0,0,0,0.1)',
		    });
			this.canvas3.add(this.rect_up,this.rect_down,this.rect_left,this.rect_right,this.rect_crop);
			this.canvas3.renderAll();
			this.canvas3.item(0)['selectable'] = false;
			this.canvas3.item(1)['selectable'] = false;
			this.canvas3.item(2)['selectable'] = false;
			this.canvas3.item(3)['selectable'] = false;
			this.canvas3.item(4)['hasRotatingPoint'] = false;
		},
		removeRect:function(){
			this.canvas3.clear();
		},
		setRect:function(up,down,left,right,crop){
			var item_left = crop.getLeft();
			var item_top = crop.getTop();
			var item_width = crop.getWidth();
			var item_height = crop.getHeight();
			var c_left = this.canvas1.left;
			var c_top = this.canvas1.top;
			var c_width = this.canvas1.width;
			var c_height = this.canvas1.height;

			up.set('height',item_top);
			down.set('top',item_height+item_top).set('width',c_width).set('height',c_height - (item_height+ item_top));
			left.set('top',item_top).set('width',item_left).set('height',item_height);
			right.set('left',item_left+item_width).set('top',item_top).set('width',c_width - (item_left+item_width)).set('height',item_height);
			this.canvas3.renderAll();
		}
	});
});