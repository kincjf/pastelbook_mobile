/pb 설명
============

___

상세히 내용을 아래의 방법과 같이적는것이 좋음.
___


###* /pb
- ** app_viewer.js ** : 전체 Application의 구동순서와 관련 설정을 하는 파일, View(Dialog포함)를 로딩하고 Region으로 관리함.
- ** templates.js ** : /template/*.tpl 파일을 동적으로 로딩하여 사용 가능하게 구성함.
- ** pb-io.js ** : ajax, db access 관련 작업을 수행함.
- ** pb-ui.js ** : 전체 UI의 좌표 설정, UI 구성을 위한 Dialog 생성에 필요한 기능 제공
  (구)UI 로딩을 담당함.
- ** pb.namespace.js ** : app 구동에 필요한 namespace, 전역변수를 설정함

###* /pb/models, /pb/collections
> Project 구성에 필요한 Data Structure

###* /pb/controllers
> Util성 기능들을 모아놓은 집합

###* /pb/debug
>

###* /pb/deprecated
> 구 버전의 Code들을 모아놓음 (단순 참조용, 실제 구동에 사용하지는 않음)

###* /pb/routers
> Hash(#)에 맞는 기능을 제작함

###* /pb/templates
> View가 배치될 구조(*.jspf), 각각 View 구동시 동적 템플릿 로딩을 위한 정적 HTML(*.tpl)을 포함함.

###* /pb/ui
> 각각의 UI 구성시 필요한 초기화 동작, 기능들을 모아놓음.

###* /pb/views
> 사용자의 입력을 받는 UI, Scene, ScenePreview, Dlalog를 구성(Backbone.Marionette 이용)
