/**
 불러오기 뷰
 */

define(['marionette',
		'pb_templates',
		'js/collections/DBdatas',
		'js/views/LoadPageItemView'],function (Marionette,templates,datas,LoadPageItemView) {
			
		'use strict';
	return Marionette.CompositeView.extend({
		 // tagName:"div", 
		  template : templates.LoadPageCompositeView,
		  
		  childView : LoadPageItemView,
		  childViewContainer : '#grid-image',
  
		  initialize : function(){
			  
			  var db = openDatabase('myDB','1.0','테스트용DB',1024*1024);
			  
			  db.transaction(function (tx){
				  tx.executeSql("create table if not exists test(imgSrc,imgName,imgDate)");
			  });
			  /*db.transaction(function (tx){
				  tx.executeSql("insert into test values(?,?,?)",['4.jpg','박신혜c','5월11일']);
			  });*/
			   
			  var data = new datas();
			  this.collection = data;
				var that = this;
			  db.transaction(function (tx){
				tx.executeSql("select * FROM test" ,[],
					
						function(tx, result){
							var num = result.rows.length;
							var flag = false;
							if(num%2 != 0){
								num = num+1;
							}
							for(var i =0; i<num; i=i+2){
								var row = result.rows.item(i);
								if(i==num-2 && result.rows.length%2 !=0 )
									flag = true;
								if(flag == false){
									var row1 = result.rows.item(i+1);
								}else{
									var row1 = {imgSrc:"",imgName:"",imgDate:""};
								}
								that.collection.add({
									src1 : row['imgSrc'],
									src2 : row1['imgSrc'],
									imgName1  : row['imgName'],
									imgName2 : row1['imgName'],
									imgDate1  : row['imgDate'],
									imgDate2 : row1['imgDate'],
								});
							}
							console.log(that.collection.size());
					}
				);  
			  })
		  },
		  /*	var data  =  new datas();
		  this.collection = data;
		  
		  this.collection.add({
			  src1 : '1.jpg',
			  src2 : '3.jpg'
		  });
		  this.collection.add({
			  src1 : '2.jpg',
			  src2 : '4.jpg'
		  });
		  this.collection.add({
			  src1 : '5.jpg',
			  src2 : '6.jpg'
		  });*/
		  		
	});
});