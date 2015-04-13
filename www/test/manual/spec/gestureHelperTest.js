/**
 * Created by KIMSEONHO on 2015-04-13.
 */


require(["jquery", "js/common/GestureHelper", "hammer"], function($, GestureHelper, Hammer) {
    var el = $("#hitarea")[0];
    var START_X = 0;
    var START_Y = 0;

    var gestureHelper = new GestureHelper({
        el: el,
        START_X : START_X,
        START_Y : START_Y
    });
    var mc = new Hammer.Manager(el);

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap());

    mc.on("panstart panmove", onPan);
    mc.on("rotatestart rotatemove", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
    //mc.on("swipe", onSwipe);
    //mc.on("tap", onTap);
    //mc.on("doubletap", onDoubleTap);

    function onPan(ev) {
        gestureHelper.onPan(ev);
        //logEvent(ev);
        //requestElementUpdate();
    }

    function onPinch(ev) {
        gestureHelper.onPinch(ev);
    }

    function onRotate(ev) {
        gestureHelper.onRotate(ev);
    }

    function onSwipe(ev) {
        gestureHelper.onSwipe(ev);
    }

    function onTap(ev) {
        gestureHelper.onTap(ev);
    }

    function onDoubleTap(ev) {
        gestureHelper.onPinch(ev);
    }
});z