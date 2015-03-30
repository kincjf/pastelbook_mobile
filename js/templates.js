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
		HeaderView: require('tpl!pb/templates/HeaderView.tpl'),
		SceneCompositeView: require('tpl!pb/templates/SceneCompositeView.tpl'),
		SceneView: require('tpl!pb/templates/SceneView.tpl'),
		FooterView: require('tpl!pb/templates/FooterView.tpl'),

		ImageListView: require('tpl!pb/templates/ImageListView.tpl'),
		MyImageView: require('tpl!pb/templates/MyImageView.tpl'),
		SearchImageView: require('tpl!pb/templates/SearchImageView.tpl'),

		ScenePreviewCompositeView: require('tpl!pb/templates/ScenePreviewCompositeView.tpl'),
		ScenePreviewView: require('tpl!pb/templates/ScenePreviewView.tpl'),

		ImageView: require('tpl!pb/templates/ImageView.tpl'),
		TextBoxView: require('tpl!pb/templates/TextBoxView.tpl')
	};
});