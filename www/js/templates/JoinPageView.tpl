<div data-role="content"> <!-- 페이지 컨텐트 -->
	<div class="ui-card ui-card-d">
		<h1 align= "center">회원 가입</h1>
	</div>
 	<div>	
		<form>
			<input type="text" name="text-1" id="text_email" placeholder="E-mail" value="">
			<input type="text" name="text-2" id="text_pwd" placeholder="PassWord" value="">
			<input type="text" name="text-3" id="text_pwdcheck" placeholder="PassWord 확인" value="">
		</form>
		<label><h3>성별</h3></label>
		<fieldset data-role="controlgroup" data-type="horizontal">
			<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2a" value="남자" checked="checked">
      		<label for="radio-choice-h-2a">남자</label>
			<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2b" value="여자">
			<label for="radio-choice-h-2b">여자</label>
		</fieldset>
	</div>
	<div align ="center">
		<button id="join_btn" class="ui-btn ui-btn-inline ui-btn-d ui-outline">회원가입</button>	
	</div>
</div>