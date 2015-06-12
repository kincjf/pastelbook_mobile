/**
  * 메인화면 페이지 컨텐트 뷰
  * 불러오기, 로그인, 사진수정, 회웝가입 버튼및 페이지 관리
  * Create by SuMin on 2015 4월 중
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.FirstPageView,
		
		events :{
			'click #img_loader_btn': 'LoadPageBtn',
			'click #join_page_btn': 'JoinPageBtn',
			'click .logo-image' : 'testEditView',
			'click #loin_page_btn' : 'LoginPageBtn'
		},
		
		
		initialize:function(){
			if(window.localStorage.getItem("email") == null || window.localStorage.getItem("pwd") == null)
				{
					$('#login-hide').show();
					alert("계정을 만들어 주세요");
				}
			else{
				$.ajax({      //계정이 있는지 확인을하고 로그인 페이지를 보여줌
		                type: "POST",
		                url: "http://pastelbook.com/rest/account/logined",
		                dataType: "json",
		                data: {
		                    sessionId:  window.localStorage.getItem("SessionId")
		                },
		                success: function (response, status, jqXHR) {
		                    // Put the plain text in the PRE tag.
		                	console.log(response);
		                    
		                    if (response.status == 1) {
		                        //회원가입창 삭제
		                        $('#login-hide').hide();
		                    } else if ( response.status == -1){
		                        alert("세션이 만료되었습니다. 재로그인을 해주세요");
		                        $('#login-hide').show();
		                    } 
		                     else{
		                     	alert("아이디가 없습니다. 회원가입을 해주세여");
		                     	$('#login-hide').show();
		                        //처음 회원 가입 
		                    }
		                  
//		                    console.log("logined - rest/account/logined SUCCESS:", response);
//		                    console.log("COOKIES:", jqXHR.getAllResponseHeaders());
//		                    $("body").append("success");
//		                    $("body").append(response);
		                    // ajax를 이용하여 xhr request를 한 후에, 다시 request를 보내는 경우에는
		                    // 이전 request값을 가지고 있기 때문에, response가 종료된 이후에
		                    // jQuery ajax를 다시 호출해주거나
		                    // 새로운 jQuery ajax instance를 가지고 이용해야함
		                    /*if (response.status == 1) {
		                        return defer.resolve(response);
		                    } else {
		                        return defer.fail();
		                    }*/
		                },
		                error: function (error) {

		                    // Log any error.
		                    console.log("ERROR:", error);
		                    return defer.fail();
		                }
		            })
			}
		},
		
		localSave : function(key,value){
			var permanentStorage = window.localStorage;
			
			window.localStorage.setItem(key,value);
		},
		
		LoginPageBtn : function(){ //재로그인 
			var that = this;
			alert($("#login-id").val());
			$.ajax({
		            type: "POST",
		            url: "http://www.pastelbook.com/rest/account/login",
		            dataType: "json",
		            data: {
		                email: $("#login-id").val(),
		                password: $("login-pwd").val()
		            },
		            success: function (response, status, jqXHR) {
		                // Put the plain text in the PRE tag.
		            	console.log(response);
		            	
	            	
//		            	console.log("login - rest/account/login SUCCESS:", response);
//		                console.log("COOKIES:", jqXHR.getAllResponseHeaders());
//		                $("body").append("success");
//		                $("body").append(response);
		                // ajax를 이용하여 xhr request를 한 후에, 다시 request를 보내는 경우에는
		                // 이전 request값을 가지고 있기 때문에, response가 종료된 이후에
		                // jQuery ajax를 다시 호출해주거나
		                // 새로운 jQuery ajax instance를 가지고 이용해야함
		                if (response.status == 1) {
		                	that.localSave("SessionId",response.sessionId);
		                } else {
		                    alert("재로그인을 해주세요");
		                }
		            },
		            error: function (error) {
		                // Log any error.
		                console.log("ERROR:", error);
		                return defer.fail();
		            }
		        });
			},	

		
		LoadPageBtn : function(){ //로드페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#load_page", { role: "page" });
		},
		
		JoinPageBtn : function(){ //회원가입 페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#Join_page", { role: "page" });
		},
		
		testEditView : function(){ //편집하기 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#edit_detail", { role: "page" });
		},
		


	});
});