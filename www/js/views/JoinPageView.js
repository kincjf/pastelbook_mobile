/**
 *회원가입 페이지 뷰
 *회원가입을 하고 개인정보를 서버에 전송 및 로컬스토리지에 저장
 *Created by Sumin on 4월 중
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.JoinPageView,
		
		events :{
			'click #join_btn' : 'JoinButton'
		}, 
		
		initialize:function(){
			
		},
		
		localSave : function(key,value){
			var permanentStorage = window.localStorage;
			
			window.localStorage.setItem(key,value);
		},

		JoinButton : function(){
			var emailVal = $('#text_email').val();
			var pwdVal = $('#text_pwd').val();
			var sexVal =0;
			if($(':input[name=radio-choice-h-2]:radio:checked').val() == "남자" )
				sexVal = 1;
			else
				sexVal = 2;
			
			var that = this;

			alert("뜨냐?")
			$.ajax({  						//회원가입 서버로 이메일 페스워드 성별보냄
				type: "POST",
				url: "http://pastelbook.com/rest/account",
				dataType: "json",
				crossDomain: true,
				data: JSON.stringify({
					email: emailVal,
					password: pwdVal,
					sex: sexVal,
					type: 200
				}),
				
				contentType: "application/json",
				success: function (response, status, jqXHR) {
					// Put the plain text in the PRE tag.
					alert("성공했냐?");
					
					that.localSave("email",response.email);  		//로컬 스토리지에 저장
					that.localSave("pwd",response.password);
					console.log(response);
					console.log(sexVal);
					
					//console.log("create account - rest/account SUCCESS:", response);
					//console.log("COOKIES:", jqXHR.getAllResponseHeaders());
					
					//$("body").append("success");
					//$("body").append(response);
					
					// ajax를 이용하여 xhr request를 한 후에, 다시 request를 보내는 경우에는
					// 이전 request값을 가지고 있기 때문에, response가 종료된 이후에
					// jQuery ajax를 다시 호출해주거나
					// 새로운 jQuery ajax instance를 가지고 이용해야함
				},
				error: function (error) {
					// Log any error.
					console.log("ERROR:", error);
					return defer.fail();
				}
			})
			.done(function (response){
				
			  $.ajax({
		    	 type: "POST",
		         url: "http://pastelbook.com/rest/account/login",
		         dataType: "json",
		            data: {
		                email: response.email,
		                password: response.password
		            },
		            success: function (response, status, jqXHR) {
		                // Put the plain text in the PRE tag.           
		            	console.log(response);
		            	console.log(response.status);
//		            	console.log("login - rest/account/login SUCCESS:", response);
//		                console.log("COOKIES:", jqXHR.getAllResponseHeaders());
//		                $("body").append("success");
//		                $("body").append(response);
		                // ajax를 이용하여 xhr request를 한 후에, 다시 request를 보내는 경우에는
		                // 이전 request값을 가지고 있기 때문에, response가 종료된 이후에
		                // jQuery ajax를 다시 호출해주거나
		                // 새로운 jQuery ajax instance를 가지고 이용해야함
		                if(response.status == 1){
		                   that.localSave("SessionId",response.sessionId);
		                  
		                   $(":mobile-pagecontainer").pagecontainer( "change", "#first_page", { role: "page" });
		                   $('#login-hide').hide();
		                } else {
		                    alert("로그인을 실패 하였습니다.");
		                }
		            },
		            error: function (error) {
		                // Log any error.
		                console.log("ERROR:", error);
		                return defer.fail();
		            }
		     });
			})  
		},
	});
});
