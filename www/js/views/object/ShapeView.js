/*global define */
/**
 * ImageView extends BaseObjectView
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
  'pb_templates',
  'js/views/object/BaseObjectView'
], function (templates, BaseObjectView) {
  'use strict';
//	var ENTER_KEY = 13;
//	var ESCAPE_KEY = 27;

  return BaseObjectView.extend({
    tagName: 'div',

    template: templates.BaseObjectView,

    value: '',

//		ui: {
//			edit: '.edit'
//		},
    events: {
//			'click .toggle': 'toggle',
//			'click .destroy': 'destroy',
//			'dblclick label': 'onEditDblclick',
//			'keydown .edit': 'onEditKeyDown',
//			'blur .edit': 'onEditBlur'
    },

    attributes: {
      // 이미 들어간거이기 떄문에 넣지 말라는 표시임.
      // Scene에 삽입된 개체를 드래그시 계속 삽입되는 버그를 방지하기위한 표시.
      // 삽입되었다는 표시임.
//      'inserted': 'false'
    },

    initialize: function () {
	    myLogger.trace("BaseObjectView - init");
	    this.value = this.model.get('title');

      this.listenTo(this.model, 'change', this.render, this);
    },

    // "show" / onShow - Called on the view instance when the view has been rendered and displayed.
    onShow: function(v) {
      myLogger.trace("BaseObjectView - onShow");
//      myLogger.debug(v);
    },

    // "render" / onRender - after everything has been rendered
    onRender: function (v) {
      myLogger.trace("BaseObjectView - onRender");
//      myLogger.debug(v);

      // 좀비뷰가 되지 않기 위해서는 draggable, resizable event를 삭제해야함.
      this.$el.draggable().resizable();
    }

  });
});
