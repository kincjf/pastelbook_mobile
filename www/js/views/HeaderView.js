/**
 * Scene 관리, 글추가, 사진추가, 저장/공유 기능에 대한 접근 인터페이스 제공
 * navigator 역할 수행
 * Created by KIMSEONHO on 2015-03-28.
 */
define([
    'marionette',
    'pb_templates', 'camera', 'filepicker'
], function (Marionette, templates, camera, filepicker) {
    'use strict';

    var HeaderView = Marionette.ItemView.extend({
        tagName: "div",
        ui: {
            navbar: "[data-role='navbar']",
            addImagePopupBtn: "[data-behavior='openAddImagePopup']",
            addTextPopupBtn: "[data-behavior='openAddTextPopup']",
            addImagePopup: "#add_image_popup",
            addTextPopup: "#add_text_popup"
        },     // 다른 Object들과 extend됨.
        template: templates.HeaderView,
        events: {
            'click @ui.addImagePopupBtn': 'openAddImagePopup',
            'click @ui.addTextPopupBtn': 'openAddTextPopup',
            'click #share_sns_btn': 'shareSceneOnSNS',
            'click #shareBtn': 'saveAsFile'
        },
        //className: "object",

        // Marionette Override Methods
        initialize: function (options) {
            myLogger.trace("HeaderView - initialize");
            filepicker.setKey("APbOv7MK2TgCmckZiHTs9z");
        },

        // "render" / onRender - after everything has been rendered
        // dom이 생성되지 않은 상태에서 먼저 JQM이 로딩되었기 때문에 수동으로 생성시켜줌
        onRender: function (view) {
            myLogger.trace("HeaderView - onRender");
            this.ui.navbar.navbar({
                defaults: true
            });
            this.ui.addImagePopup.popup();
            this.ui.addTextPopup.popup();

            _.extend(this.ui, {
                getAlbumImageBtn: $('#local_album'),
                getImageFromCameraBtn: $('#camera'),
                getOnlineImageBtn: $('#filepick')
            });

            this.ui.getAlbumImageBtn.click(this.getImageFromGallery);
            this.ui.getImageFromCameraBtn.click(this.getImageFromCamera);
            this.ui.getOnlineImageBtn.click(this.getImageFromOnline);
        },

        onShow: function () {
            myLogger.trace("HeaderView - onShow");
        },

        onDomRefresh: function () {
            myLogger.trace("BaseObjectView - onDomRefresh");
        },

        onBeforeDestroy: function () {
            myLogger.trace("BaseObjectView - onBeforeDestroy");
        },

        onDestroy: function () {
            myLogger.trace("BaseObjectView - onDestroy");
            this.ui.navbar.navbar("destroy");
            this.ui.addImagePopup.popup("destroy");
            this.ui.addTextPopup.popup("destroy");
        },

        // Custom Methods - Event Callback
        getImageFromGallery: function (event) {
            camera_album.getMultiPhoto();
        },

        getImageFromCamera: function (event) {
            camera_album.capturePhoto();
        },

        getImageFromOnline: function (event) {
            filepicker.getFile("image/*", {
                multi: true,
                services: ["DROPBOX", "EVERNOTE", "FACEBOOK", "GMAIL", "IMAGE_SEARCH",
                    "GOOGLE_DRIVE", "SKYDRIVE", "URL", "INSTAGRAM"]
                //debug: true
            }, function(url, metadata){
                alert("You picked: "+url);
                console.log(url);
            });
            /*filepicker.pickMultiple({
                maxFiles: 5,
                mimetype: "image/!*",
                services: ["DROPBOX", "EVERNOTE", "FACEBOOK", "GMAIL", "IMAGE_SEARCH", "FLICKR",
                    "GOOGLE_DRIVE", "SKYDRIVE", "URL", "INSTAGRAM", "VIDEO"],
                container: 'modal',
                mobile: true
            }, function (Blobs) {
                /!**
                 * url	The core Filepicker.io file url on which all other operations are based.
                 * filename	The filename of the uploaded file.
                 * mimetype	The mimetype of the uploaded file.
                 * size	The size of the uploaded file in bytes, if available.
                 * isWriteable	Whether the file can be written to using filepicker.write.
                 *!/
                alert("filepicker - pickMultiple Success");
                console.log(Blobs);
            }, function(FPError) {
                /!**
                 * url	The core Filepicker.io file url on which all other operations are based.
                 * filename	The filename of the uploaded file.
                 * mimetype	The mimetype of the uploaded file.
                 * size	The size of the uploaded file in bytes, if available.
                 * isWriteable	Whether the file can be written to using filepicker.write.
                 *!/
                alert("filepicker - pickMultiple Fail");
                console.log(FPError);
            });*/
            /*
             var ref = window.open('http://apache.org', '_blank', 'location=yes');
             ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
             ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
             ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
             ref.addEventListener('exit', function(event) { alert(event.type); });*/
        },

        shareSceneOnSNS: function () {
            var canvas = pb.current.scene.canvas;
            //	var image = pb.current.object.image;

            this.test = canvas.toDataURL({
                format: 'png',
                multiplier: 1,
                quality: 1,
                left: canvas.item(0).left,
                top: canvas.item(0).top,
                width: canvas.item(0).width,
                height: canvas.item(0).height
            });

            // how tu use it?
            // @link https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#using-the-share-sheet
            // window.plugins.socialsharing.share("message", "[File Name1]", [dataURL, |], "link-addr");	//사진 공유기능
            // Note that a lot of apps support sharing multiple files, but Twitter just doesn't accept more that one file.
            window.plugins.socialsharing.share(null, null, this.test, null);	//사진 공유기능
        },

        saveAsFile: function () {
            // @link https://github.com/apache/cordova-plugin-file-transfer
            var fileTransfer = new FileTransfer();

            var canvas = pb.current.scene.canvas;
            //	var image = pb.current.object.image;

            this.test = canvas.toDataURL({
                format: 'png',
                multiplier: 1,
                quality: 1,
                left: canvas.item(0).left,
                top: canvas.item(0).top,
                width: canvas.item(0).width,
                height: canvas.item(0).height
            });
            var uri = encodeURI(this.test);
            fileTransfer.download(
                uri,
                'file:///sdcard/DCIM/Camera/ㅋㅋ.png',
                function (entry) {
                    console.log("download complete: " + entry.toURL());

                    window.MediaScannerPlugin.scanFile(
                        function (msg) {
                            console.log(msg);
                        },
                        function (err) {
                            console.log(err);
                        },
                        'file:///sdcard/DCIM/Camera/ㅋㅋ.png'
                    );
                },
                function (error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    console.log("upload error code" + error.code);
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
        },

        openAddImagePopup: function () {
            this.ui.addImagePopup.popup("open", {
                transition: "pop",
                positionTo: "window"
            });

            // Bug Code - openAddImagePopup가 실행될때마다 click event handler가 추가되기 때문에
            // 처음에는 1번 실행되었다가 2번째에는 2번, 3번, 중첩으로 추가된다
            // event handler는 추가해주었으면 object가 delete될 때에는 꼭! 삭제해주어야 한다.
            // 그렇지 않으면 marionette event hash를 사용하면 된다.

            //$('#local_album').click(this.onLocalAlbum);
            //$('#camera').click(this.onCamera);
            //$('#filepick').click(this.onFilepicker);
        },

        openAddTextPopup: function () {
            this.ui.addTextPopup.popup("open", {
                transition: "pop",
                positionTo: "window"
            });
        }
    });

    return HeaderView
});
