/**
 * 사진/배경 편집시 이용하는 LayoutView
 * - 사진과 배경에 따라서 제공하는 Layout가 다름
 * Created by KIMSEONHO on 2015-03-30.
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	return Marionette.ItemView.extend({
		template: templates.EditView,
		ui:{
			
		},
		events:{
			'click #image_select': 'image_select',
			'click #edge': 'edge',
			'click #crop': 'crop',
			'click #flip': 'flip',
			'click #crop_save': 'crop_save',
			'click #save' : 'save',
			'click #close': 'close',
			'click #edge_save': 'edge_confirm'
		},
		initialize:function(){
		},
		canvas1 : null,
		canvas2 : null,
		cavnas3 : null,
		rect_up : null,
		rect_down : null,
		rect_left : null,
		rect_right : null,
		rect_crop : null,
		img : null,
		
		onRender:function(){
			var that = this;
			$('#edit_detail').on("pageshow",function(){
				
				var screen = $.mobile.getScreenHeight(),
			    header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header:eq(1)").outerHeight(),
			    footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer:eq(1)").outerHeight(),
			    contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height(),
			    content = screen - header - footer - contentCurrent;
			    console.log(screen);//615
			    console.log(header);//76
			    console.log(footer);//41
			    console.log(contentCurrent);//2
			    console.log(content);//492
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
			//--------------------------------------------------
			fabric.Image.fromURL('./test/image/my-image.jpg', function(imgInstance) {
				that.img = imgInstance;
				that.img.set('transformMatrix',[1,0,0,1,0,0]);
				that.canvas1.add(that.img);
			});
			//--------------------------------------------------
			/*
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
		},
		save:function(e){
			this.observeBoolean(true,true);
			pb.current.object.image = this.img;
			this.canvas1.clear();
			this.canvas2.clear();
			this.canvas3.clear();
		},
		edge:function(e){
			$('#edge_save').remove();
			this.canvas2.clear();
			$('#edge').parent().append($('<a href="javascript:void(0)" id="edge_save">confirm</a>'));
			$('#canvas1').parent().css('z-index',500);
			$('#canvas3').parent().css('z-index',400);
			$('#canvas2').parent().css('z-index',9999);
			
			this.canvas2.freeDrawingBrush = new fabric['PencilBrush'](this.canvas2);
			this.canvas2.freeDrawingBrush.width = parseInt(10, 10) || 1;
		    this.canvas2.freeDrawingBrush.shadowBlur = 0;
		    
		    this.observeBoolean(false,true);
		},
		edge_confirm : function(){
		    console.log(this.canvas2.freeDrawingBrush._points);
			var item_left = this.canvas1.item(0).left;
			var item_top = this.canvas1.item(0).top;
			var item_width = this.canvas1.item(0).width;
			var item_height = this.canvas1.item(0).height;
			console.log(this.canvas2.width);
			var dataURL = this.canvas1.toDataURL({
				format: 'jpg',
				multiplier: 1,
				quality: 1,
				left: item_left,
				top: item_top,
				width: item_width,
				height: item_height
			});
			var that = this;
			$.ajax({
				url: 'http://192.168.2.8:8084/hello',
				type: 'POST',
				data: {
					url: dataURL
					//rect: {x:item_left,y:item_top,width:item_width,height:item_height}
				},
				success: function(data){
					var a = $.parseJSON(data);
					//alert(a.url);
					//$('#edit_img').attr('src',"data:image/png;base64,"+a.url);
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
		image_select:function(){
			$('#canvas1').parent().css('z-index',9999);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9998);
			$('#edge_save').remove();
			this.observeBoolean(true,true);
		},
		crop_save:function(e){
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
			$('#edge_save').remove();
			$('#crop_save').remove();
			this.removeRect();
			
			$('#crop').parent().append($('<a href="javascript:void(0)" id="crop_save">crop_save</a>'));
			$('#canvas1').parent().css('z-index',9998);
			$('#canvas2').parent().css('z-index',9997);
			$('#canvas3').parent().css('z-index',9999);
			this.observeBoolean(false,false);
			this.createRect();
			
		},
		
		flip:function(e){
			$('#edge_save').remove();
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