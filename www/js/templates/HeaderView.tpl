<div data-role="navbar" >
    <ul>
        <li><a href="#scene_preview_panel" data-theme="d" class="ui-btn ui-btn-d ui-btn-inline">Scene 관리</a></li>
        <li><a data-behavior="openAddTextPopup" data-rel="popup" data-position-to="window" data-theme="g" class="ui-btn ui-btn-g ui-btn-inline" data-transition="pop">글 추가</a></li>
        <li><a data-behavior="openAddImagePopup" data-rel="popup" data-theme="c"
               class="ui-btn ui-btn-c ui-btn-inline"
               data-transition="pop">사진 추가</a></li>
        <li><a href="#edit_detail" data-theme="e" class="ui-btn ui-btn-e ui-btn-inline" data-transition="slidedown">편집</a></li>
        <!--<li><a class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="shareBtn" data-transition="slidedown">저장&공유</a></li>-->
        <!--<li><button id="tlqkf">공유버튼<button>-->
    </ul>
</div><!-- /navbar -->

<div data-role="popup" id="add_image_popup" data-theme="b">
    <ul data-role="listview">
        <li><a data-rel="dialog" id="local_album">local storage</a></li>
        <li><a data-rel="dialog" id="filepick">FilePicker.io</a></li>
        <li><a href="#image_list_panel" data-rel="dialog">내 컬랙션</a></li>
        <li><a data-rel="dialog" id="camera">찍고 바로 ㄱㄱ</a></li>
    </ul>
</div><!-- /add image popup -->

<div data-role="popup" id="add_text_popup" data-theme="a" class="ui-corner-all">
    <form>
        <div style="padding:10px 20px;">
            <h3 class="ui-card ui-card-a">글 입력창</h3>
            <label for="un" class="ui-hidden-accessible">Username:</label>
            <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a">
            <label for="pw" class="ui-hidden-accessible">Password:</label>
            <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="f">
            <button type="submit" class="ui-btn ui-btn-f ui-btn-inline ui-icon-ion-ios7-checkmark-outline ui-btn-icon-left">Sign in</button>
        </div>
    </form>
</div><!-- /insert text popup -->