/**
 메인화면 페이지 컨텐트 뷰
 */
define(['marionette','pb_templates'],function (Marionette,templates) {
	"use strict";
	
	return Marionette.ItemView.extend({
		template : templates.FirstPageView,
		
		events :{
			'click #load_page_btn': 'LoadPageBtn',
			'click #join_page_btn': 'JoinPageBtn',
		},
		
		initialize:function(){
				/*$.ajax({
		                type: "POST",
		                url: "http://pastelbook.com/rest/account/logined",
		                dataType: "json",
		                data: {
		                    sessionId: 
		                },
		                success: function (response, status, jqXHR) {
		                    // Put the plain text in the PRE tag.
		                    console.log("logined - rest/account/logined SUCCESS:", response);
		                    console.log("COOKIES:", jqXHR.getAllResponseHeaders());
		                    $("body").append("success");
		                    $("body").append(response);
		                    // ajax를 이용하여 xhr request를 한 후에, 다시 request를 보내는 경우에는
		                    // 이전 request값을 가지고 있기 때문에, response가 종료된 이후에
		                    // jQuery ajax를 다시 호출해주거나
		                    // 새로운 jQuery ajax instance를 가지고 이용해야함
		                    if (response.status == 1) {
		                        return defer.resolve(response);
		                    } else {
		                        return defer.fail();
		                    }
		                },
		                error: function (error) {

		                    // Log any error.
		                    console.log("ERROR:", error);
		                    return defer.fail();
		                }
		            })*/
		},
		
		LoadPageBtn : function(){ //로드페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#load_page", { role: "page" });
		},
		
		JoinPageBtn : function(){ //회원가입 페이지 이동
			$(":mobile-pagecontainer").pagecontainer( "change", "#Join_page", { role: "page" });
		}

	});
});