<div data-role="navbar" data-grid="c">
    <ul>
        <li><a href="#scene_preview_panel"class="ui-btn-active">Scene 관리</a></li>
        <li><a data-behavior="openAddTextPopup" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-check ui-btn-icon-left ui-btn-a" data-transition="pop">글 추가</a></li>
        <li><a data-behavior="openAddImagePopup" data-rel="popup"
               class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-bars ui-btn-icon-left ui-btn-b"
               data-transition="pop">사진 추가</a></li>
        <li><a href="#save_share" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" data-transition="slidedown">저장&공유</a></li>
    </ul>
</div><!-- /navbar -->

<div data-role="popup" id="add_image_popup" data-theme="b">
    <ul data-role="listview">
        <li><a href="#" data-rel="dialog">local storage</a></li>
        <li><a href="#" data-rel="dialog">FilePicker.io</a></li>
        <li><a href="#image_list_panel" data-rel="dialog">내 컬랙션</a></li>
        <li><a href="#" data-rel="dialog">찍고 바로 ㄱㄱ</a></li>
    </ul>
</div><!-- /add image popup -->

<div data-role="popup" id="add_text_popup" data-theme="a" class="ui-corner-all">
    <form>
        <div style="padding:10px 20px;">
            <h3>글 입력창</h3>
            <label for="un" class="ui-hidden-accessible">Username:</label>
            <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a">
            <label for="pw" class="ui-hidden-accessible">Password:</label>
            <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="a">
            <button type="submit" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-check">Sign in</button>
        </div>
    </form>
</div><!-- /insert text popup -->