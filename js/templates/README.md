template 설명
============

jspf같은 경우 주석으로 달면 그만이지만

tpl은 js/pb/template.js에서 async로 로딩되기 때문에

주석이 들어갈경우 로딩시 문제가 일어날 수도 있을것으로 판단되므로

정리를 따로 해놓겠음.
___

`대부분의 템플릿은 View(파일)이름과 매칭됨.`

하지만, 혹시나 그렇지 않은 경우 상세히 내용을 아래의 방법과 같이적는것이 좋음.
___

###* BaseObjectView.tpl
> BasebjectView와 매칭됨.

###* BaseObjectCompositeView.tpl
> BaseObjectCompositeView와 매칭됨.

###* menu/project/dlgSaveProject.tpl
> views/menu/project/dlg-save와 매칭됨.

###* menu/project/dlgSaveToText.tpl
> views/menu/project/dlg-saveToText와 매칭됨.
