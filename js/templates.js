/**
 * Created by KIMSEONHO
 *
 * View를 렌더링할때 사용하는 템플릿을 사용하기 쉽게 모듈형태로 구현함
 *
 */

/*global define */
define(function (require) {
	'use strict';

	return {
		HeaderView: require('tpl!js/templates/HeaderView.tpl'),
		SceneCompositeView: require('tpl!js/templates/SceneCompositeView.tpl'),
		SceneView: require('tpl!js/templates/SceneView.tpl'),
		FooterView: require('tpl!js/templates/FooterView.tpl'),

		ImageListView: require('tpl!js/templates/ImageListView.tpl'),
		MyImageView: require('tpl!js/templates/MyImageView.tpl'),
		SearchImageView: require('tpl!js/templates/SearchImageView.tpl'),

		ScenePreviewCompositeView: require('tpl!js/templates/ScenePreviewCompositeView.tpl'),
		ScenePreviewView: require('tpl!js/templates/ScenePreviewView.tpl'),

		ImageView: require('tpl!js/templates/ImageView.tpl'),
		TextBoxView: require('tpl!js/templates/TextBoxView.tpl')
	};
});