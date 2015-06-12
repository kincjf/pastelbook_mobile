/**
 * Created by KIMSEONHO on 2015-04-13.
 */


require(["marionette", "jquery", "js/common/GestureHelper", "hammer"], function (Marionette, $, GestureHelper, Hammer) {
    var el = $("#hitarea")[0];
    var START_X = 0;
    var START_Y = 0;

    var MyItemView = Marionette.ItemView.extend({
        el: el,

        events: {
          //"panstart": "panItem"       // event hash는 작동하지 않는다.
        },

        initialize: function () {
            var options = {
                el: this.el
            };

            _.extend(this, GestureHelper);

            this.setGesture(options);

            this.mc = new Hammer.Manager(this.el);

            this.mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));
            this.mc.add(new Hammer.Rotate({threshold: 0})).recognizeWith(this.mc.get('pan'));
            this.mc.add(new Hammer.Pinch({threshold: 0})).recognizeWith([this.mc.get('pan'), this.mc.get('rotate')]);
            this.mc.add(new Hammer.Tap());

            this.mc.on("panstart panmove", _.bind(this.panItem, this));
            this.mc.on("rotatestart rotatemove", _.bind(this.onRotate, this));
            this.mc.on("pinchstart pinchmove", _.bind(this.onPinch, this));

            //this.name = "aaa";
            //MyItemView.getA();
        },

        panItem: function(ev) {
            this.onPan(ev);
            //logEvent(ev);
            //requestElementUpdate();
        },
        pinchItem: function(ev) {
            this.onPinch(ev);

        },
        rotateItem: function(ev) {
            this.onRotate(ev);
        },
        swipeItem: function(ev) {
            this.onSwipe(ev);
        },
        tapItem: function(ev) {
            this.onTap(ev);
        },
        doubleTapItem: function(ev) {
            this.onDoubleTap(ev);
        }
    }, {
        getA: function () {
            console.log(this.name);
        }
    });

    var itemView1 = new MyItemView();

    console.log(itemView1.reqAnimationFrame === GestureHelper.reqAnimationFrame);
    console.log(itemView1.onPinch === GestureHelper.onPinch);
    console.log(_.isEqual(itemView1.reqAnimationFrame,GestureHelper.reqAnimationFrame));

    //var gestureHelper = new GestureHelper({
    //    el: el,
    //    START_X: START_X,
    //    START_Y: START_Y
    //});

    //mc.on("swipe", onSwipe);
    //mc.on("tap", onTap);
    //mc.on("doubletap", onDoubleTap);
});