/**
 * Created by KIMSEONHO on 2015-04-04.
 */
var camera_album = camera_album || {};
camera_album.image = [];

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
//var canvas;
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    console.log(imageData);
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
   // var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    //largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    console.log(imageURI);
    camera_album.image.push(imageURI);
   // largeImage.src = imageURI;
}

// A button will call this function
//
camera_album.capturePhoto = function() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
function clear_arr(a){
	while(a.length > 0) {
	    a.pop();
	}
}

camera_album.capturePhotoEdit = function() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	clear_arr(camera_album.image);
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
camera_album.getPhoto = function() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.SAVEDPHOTOALBUM
    });
}

camera_album.getMultiPhoto = function() {
	clear_arr(camera_album.image);
    window.imagePicker.getPictures(
        function(results) {
            for (var i = 0; i < results.length; i++) {
            	camera_album.image.push(results[i]);
            	/*
                	window.resolveLocalFileSystemURI(results[i], function(fileEntry){
                		console.log(fileEntry);
                        fileEntry.file(function(fileObj) { 
                            alert(fileEntry.name);
                            alert(fileObj.size);
                            alert(fileObj.type);
                        }); 

                    }, function (error) {
                            alert('Error: ' + error);
                    });*/
            }
        }, function (error) {
            console.log('Error: ' + error);
        }, {
            maximumImagesCount: 10,
            width: 800
        }
    );
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}