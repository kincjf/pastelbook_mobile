/**
 * Created by KIMSEONHO on 2014-10-12.
 */
/**
 * logging을 위한 셋팅
 */
'use strict';

var myLogger = log4javascript.getLogger('main');
var popUpAppender = new log4javascript.PopUpAppender();
var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");

/** Change the desired configuration options*/
	//popUpAppender.setFocusPopUp(false);
	//popUpAppender.setNewestMessageAtTop(false);

popUpAppender.setLayout(popUpLayout);
myLogger.addAppender(popUpAppender);
/**
 *  TRACE < DEBUG < INFO < WARN < ERROR < FATAL
 *
 *  log4javascript.Level.ALL
 *  log4javascript.Level.TRACE
 *  log4javascript.Level.DEBUG
 *  log4javascript.Level.INFO
 *  log4javascript.Level.WARN
 *  log4javascript.Level.ERROR
 *  log4javascript.Level.FATAL
 *  log4javascript.Level.OFF
 *
 */

myLogger.setLevel(log4javascript.Level.TRACE);

/** logging을 하기 싫으면 아래의 주석을 지우면 됨 */
myLogger.setLevel(log4javascript.Level.OFF);

myLogger.info("log4javascript initialize");
