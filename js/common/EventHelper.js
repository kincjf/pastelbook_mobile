/**
 * Event Namespace를 이용하여 String형 Event Object를 제작하고 관리
 * - 초기 실행시 output은 null 입력
 * - Event Delimiter는 ":" 사용
 * Created by KIMSEONHO on 2015-03-18.
 */
define(["underscore"], function (_) {
	/**
	 * event object의 key값를 이용하여 String 형태의 object에 값을 기록함
	 * @param event를 선언해놓은 object - pb.event
	 * @param output - String형 Event가 저장되는 공간
	 * @param defaultEvent - outer object의 default event를 활용하여 inner Object의 event를 만듬.
	 * @return object - String형 Event
	 * */
	var EventHelper = {
		makeEvent: function (object, output, defaultEvent) {
			var copy = output;

			if (_.isUndefined(copy)) {     // 초기 실행시 undefined
				copy = {};
			}
			var keys = _.keys(object);

			for (var index = 0; index < keys.length; ++index) {
				if (_.isObject(object[keys[index]])) {
					copy[keys[index]] = this.makeEvent(object[keys[index]], {},
						(_.isUndefined(defaultEvent) ? object["default"] : (defaultEvent + ":"+ object["default"])));
				} else {
					// 초기 실행시 default에 해당 key값만 입력, 전역 이벤트시 namespace없음
					copy[keys[index]] = (_.isUndefined(defaultEvent) ? object[keys[index]] : (defaultEvent + ":" + object[keys[index]]));
				}
			}

			return copy;
		}
	};

	return EventHelper;
});