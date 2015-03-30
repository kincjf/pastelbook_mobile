models 설명
============
___

###* /models
- ** BaseObject.js ** : 이미지, 비디오, 오디오, 글상자등의 데이터를 저장함
> Object라고 하는 경우, 기본 Object를 override 할 수 있기 때문에 [Base]를 앞에 붙임.

- ** Project.js ** : 한 프로젝트의 데이터를 담고 있는 structure
- ** Scene.js ** : 개별 Scene에 대한 정보를 가지고 있음
- ** SceneViewSet.js ** : Scene과 Preview 쌍을 지어서 관리하기 위한 pair(SceneView, ScenePreviewView)형태의 Model BaseObject

###* /models/member
- ** Account.js ** : 사용자 계정 정보를 저장함.

###* /models/resources
- ** ResAudio.js ** : 내 컬렉션에 저장된 Audio 개별정보
> (path, thumbPath, name, size, width, height)

- ** ResImage.js ** : 내 컬렉션에 저장된 Image 개별정보
> (path, thumbPath, name, size, width, height, playTime)

- ** ResVideo.js ** : 내 컬렉션에 저장된 Video 개별정보
> (path, thumbPath, name, size, playTime)