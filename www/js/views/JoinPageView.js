/**
	회원가입 뷰 
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
		
		JoinButton : function(){
			var emailVal = $('#text_eamil').val();
			var pwdVal = $('#text_pwd').val();
			var sexVal = $("input:checkbox[name='radio-choice-h-2']").is(":checked");

			alert("뜨냐?")
			$.ajax({
				type: "POST",
				url: "http://pastelbook.com/rest/account",
				dataType: "json",
				crossDomain: true,
				data: JSON.stringify({
					email: "test@pastelplus.com",
					password: "testtest",
					sex: 1,
					type: 200
				}),
				contentType: "application/json",
				success: function (response, status, jqXHR) {
					// Put the plain text in the PRE tag.
					alert("성공했냐?");
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
		}
				
	});
});
