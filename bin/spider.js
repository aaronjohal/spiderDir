#!/usr/bin/env node
var args   = process.argv.slice(2);
var spider = require('../lib/spider')(args);
var results = spider.process();


//node bin/spider test/fixtureData '<!--#'
//node bin/spider test/fixtureData 'helloworld'
// /private/tmp/mounts/live/wwwlive/news/special

//<!--#if
// <!--#set
// <!--#echo