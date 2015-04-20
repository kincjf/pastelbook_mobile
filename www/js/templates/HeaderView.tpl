<!--
 jQuery Mobile의 페이지 이동시 tag의 attribute를 이용하여 사용하면 현재 Backbone의 MobileRouter를 거쳐서 이동한다.
그런데, MobileRouter를 거치면 단순히 hash값만 비교해서 페이지를 변경시키기 때문에 data-rel, data-position, data-transition등을 설정할 수 없다.
그래서 가급적 페이지 이동시에는 pagecontainer.changePage(options)를 이용하여 수동으로 변경시켜주는것이 좋을 것 같다.
(Code상에서도 파악이 용이하고, 페이지 변경 관련 옵션을 설정할때도 유용하다.)
-->
<div data-role="navbar">
    <ul>
        <li><a href="#scene_preview_panel" data-theme="d" class="ui-btn ui-btn-d ui-btn-inline">Scene 관리</a></li>
        <li><a data-behavior="openAddTextPopup" data-theme="g" class="ui-btn ui-btn-g ui-btn-inline">글 추가</a></li>
        <li><a data-behavior="openAddImagePopup"data-theme="c" class="ui-btn ui-btn-c ui-btn-inline">사진 추가</a></li>
        <li><a href="#edit_detail" data-theme="e" class="ui-btn ui-btn-e ui-btn-inline" data-transition="slidedown">편집</a></li>
        <li><a class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="shareBtn" data-transition="slidedown">저장&공유</a></li>
        <li><button id="share_sns_btn">공유버튼</button></li>
    </ul>
</div><!-- /navbar -->

<div data-role="popup" id="add_image_popup" data-theme="b">
    <!-- 실제 렌더링시에는 HeaderView가 아닌 jQuery Mobile이 생성하는 임의의 Container에 존재하기 때문에 event hash, this.ui는 적용되지 않는다
     그래서 수동으로 selector를 설정해주어야 한다.-->
    <ul data-role="listview">
        <li><a id="local_album">local storage</a></li>
        <li><a id="filepick">FilePicker.io</a></li>
        <li><a href="#image_list_panel" data-rel="dialog">내 컬랙션</a></li>
        <li><a id="camera">찍고 바로 ㄱㄱ</a></li>
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