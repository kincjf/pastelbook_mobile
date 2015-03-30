Test Case
============

App이 거대해지면서 작업을 하고난 후 손으로 테스트를 하면서

console에서 값을 꺼내서 직접 확인하고, 삽질을 한 100번씩 하니까

너무 짜증나서 안 쓸수가 없어서 Test Framework를 쓰게 되었음.

참고서적 : 제대로 배우는 Backbone.js 프로그래밍

사용 Framwork, Lib : QUnit 1.15, sinon 1.11.1


** QUnit 말고도 mocha, jasmine이 있지만, QUnit과 관련 플러그인을 이용한 테스팅 방법이 **

** 책에 잘 설명되있었기 때문에 QUnit과 sinonJS을 이용함. **

mocha는 너무 자유도가 높고, 자료가 많이 없는 듯 함, jasmine은 가장 많이 사용한다고는 하지만

처음에 봤을때는 QUnit은 심플한데 반해 jasmine은 문법이 햇갈림(본인은 그랬음, 아님말고)


** 간단한 케이스는 테스팅을 하지 않겠지만, 복잡한 경우에는 테스팅을 해서 사전에 버그방지를 하는 것이 좋다고 생각함. **

** 또한 Backbone과 Marionette의 구조와 구동방식을 완벽하게 알지 못하고 개발하다가 뭐가 문제인지 모르는 최악의 상황을 **

** (직접 경험을 하기도 했음)방지하기 위해서도 필요하다고 생각함 **


bower와 grunt를 사용해서 설정을 잡아놓으려고 했으나, 사이즈가 그런 복잡한것이 필요한정도도 아니고,

갑자기 도입을 했다가 팀원이 벙 쪄버리는 상황이 있을 수 있기 때문에 간단하게 requirejs를 이용해서

테스트 케이스를 작성하고 돌릴 수 있는 기본만 잡아놓았음.

-- spec-runner.html : 각 Test Case에 대한 실행결과를 HTML상에서 볼 수 있음.

-- spec-runner.js : requireJS 설정파일, Test Case를 등록하여 실행함.

-- /spec/testSuite.js : 작성한 Test Case의 Path를 그룹(Array)별로 등록해놓음. spec-runner.js에서 로딩하여 사용함.

-- /spec/exampleTest/js : Test Case 예시용

-- /lib/* : testing에 필요한 Framework | library를 등록해놓음 (구동에 필요한 lib는 root/js/lib에)




## 관련 자료
___
** QUint, Jasmine, Mocha에 대한 비교 : http://www.techtalkdc.com/which-javascript-test-library-should-you-use-qunit-vs-jasmine-vs-mocha/ **
___
** PubSubJS(spy, stub, mock 사용시 유용함(필요함?)) : https://github.com/mroderick/PubSubJS **
___
** 예제 사이트 - QUnit Backbone.js Koans : https://github.com/addyosmani/backbone-koans-qunit **
___
** sinon-qunit - http://sinonjs.org/qunit/ **