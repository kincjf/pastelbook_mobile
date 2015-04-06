collections 설명
============

###* /collections
- ** BaseObjectList.js ** : 프로젝트 저장하기 기능 담당. Scene내 BaseObject 관리를 위한 컨테이너
- ** SceneList.js ** : 프로젝트 저장하기 기능 담당. Scene내 BaseObject 관리를 위한 컨테이너
- ** SceneViewSetList.js (model: SceneViewSet) ** : 프로젝트 저장하기 기능 담당. Scene내 BaseObject 관리를 위한 컨테이너

###* /collections/resources
`향후 RESTful 형식으로 데이터를 가져올 기회가 많아지므로
url을 세분화하기 위하여 rest/[audio/image/video]보다는
rest/resource/[*]로 하는 것이 좋을 것 같음.`
- ** ResAudioList.js ** : 내 컬렉션에 저장된 Audio 데이터를 관리함
- ** ResImageList.js ** : 내 컬렉션에 저장된 Image 데이터를 관리함
- ** ResVideoList.js ** : 내 컬렉션에 저장된 Video 데이터를 관리함
