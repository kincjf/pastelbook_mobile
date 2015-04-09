# pastelbook_mobile
pastelbook mobile version

개발 wiki 
============
개발시 문제사항이나 어려운점을 적어도 좋고, 팁을 적어도 좋고, 방법론적으로 접근해도 좋음.

자신이 겪은 사항을 적고 좋은 쪽으로 가는 것이 필요하고 도움이 될 것 같음.
wiki에 적은 후 추가할 점이나 지울 점, 변경할 점이 있으면 다음 push 사항때 반영하면 될 것 같음.

*** `순서가 빠른 것부터 중요한 사항이라고 생각하면 됨. ㅇㅇ` **
___

## naming
* test를 위한 resource 경로 : [ http://hitit.jbnu.ac.kr/resources/ ]

* pastelbook => pb로 줄일것

* 파일명으로 쓰임새를 구분하기 보다는 폴더구조로 구분하고, 파일명은 모듈이 하는 동작으로만 지을 것

* model 선언시 : Project, Scene와 같이 선언

* collection 선언시 : model명 + List

* View 선언시 : 모델명 + [기능1|기능2|...] + View
( ex> ScenePreviewCompositeView
   : Scene(모델명) + Preview(기능1) + CompositeView(기능2[marionette]) + View )

* template 명은 해당 View와 동일하게 지정함.

* file명에는 -(hyphen)을 사용하기

* 변수명에는 _(underline)은 Private 변수만 사용하기, 나머지는 다 낙타체로 선언

* 클래스(Object) 변수명은 첫 문자는 대문자로, 하지만 instance, 지역변수는 첫 글자는 소문자로
( ex> Project, Scene)

* event 지정은 :(colon)으로 구분하기
( ex> loading:project(O), loadingProject(X) )

* css : class명은 "-"로만 구분하기, id명은 "_"로만 구분하기

---

* commit 사항에 변동사항(소스구조적으로), 추가/삭제/변경(기능적으로)건을 적었으면 좋겠음.

* 각 폴더마다 README.md를 적고, 각 파일이 무엇을 하는지 기재하였음. 업데이트시 작성바람!

* 공식 API 문서를 활용하기 위해서는 lib를 최신화할것 : 다른 lib는 모르겠지만 backbone, require, marionette같은 경우는
자료가 대부분 API에 있기 때문에 공식문서를 활용하기 위해서는 일단 최신버전으로 지정을 했으면 좋겠음.
그리고 `코드상에 레거시버전의 API명을 함께 적어주어서` 레거시코드 예제를 활용할경우 참조할 수 있도록 했으면 좋겠음.
패턴이야 예제소스나 책으로 익히면 그만이지만 바뀐 API명까지는 알 수 없으니 `꼭 지켜야 할 사항`이라고 생각함.

* lib 버전 변경시 meta.txt에도 변동사항을 기록하기

* backbone을 다루면서 debug가 힘들기 때문에 function이나 모듈구현별로 log를 찍어야 편리함(작동이 되는지, 로딩이 되는지 알 수 있음.)

* ** log4javascript를 사용하는 것도 좋을 것 같음. 나중에 사용법을 약간 적겠음**
>#### ex) myLogger.trace(SceneView - addObject);, log4javascript-config.js를 참조하기 바람

* backbone, jQuery(UI) 제공기능을 사용할 때 함수를 오버로딩할 경우에 이용할 수 있는 parameter값에 대하여 한번 검토를 해보고 연구를 하면 어렵게 생각했던 기능을 쉽게 구현할 수 있는 경우가 비일비재함.

* 결국은 API를 잘 이해하면 적어도 기본기능은 다 구현할 수 있다고 생각함. 그러므로 처음에 기본제공함수를 사용할 때 log로 parameter가 뭐가 있는지 알고 가는게 좋을 것 같음. 
>#### ex) console.log(event, ui);

* API 삽질하기는 시간이 약간 걸리므로 UI[jQuery(UI)], backbone(.marionette등)등 각종 라이브러리, 프레임워크의 이론적인 기본제공기능, parameter, 사용법등에 대해서 주석으로 적어놓을 필요가 있음. 뭐 한글로 친절하게 안적어도 되고 API에 있는 설명 cv로 붙이고 한글로 상세설명 살짝 해주고 / parameter 설명 간단하게 적어주고 / 사용방법 적어주면 될 것 같음.
API말고 구글링으로만 찾을 수 있는 내용이 있는데 그런건 자세하게 적어주는게 좋을 것 같음. (일단 코드상에 주석으로 적는걸로)

* 개발 가이드 뿐만 아니라 주석다는법도 Rule 필요하다고 생각됨. ***jsdoc 스타일***로 주석을 달면 괜찮을 것 같은데.. 그렇다고 @param같이 딱 지켜야된다 이런건 아님.
jsdoc로 주석을 달아놓은 코드를 보면 이해가 잘된다고 해야되나.

* 결국은 코드를 짤 수 있는 코드로 된 가이드가 필요함. (가이드 너무 좋아하네..;;)

* 데이터 구조와 사용자가 UI에 입력시 발생가능한 이벤트를 나열하고 순서를 적어놓은 자료가 필요함. (제발 이거는 코드로 하지말자..) 코딩할때 계속 보면서 할 수 있도록 Visual적으로 하나 만들고 각자 잘보이는 곳에 붙여야 함.