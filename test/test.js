var url = 'fixtureData';
var apacheInclude = '<!--#';
var assert = require('assert');

var fixtureDirectory = ['fixtureData/fixtureData2/test4.inc',
    'fixtureData/fixtureData3/test6.inc',
    'fixtureData/test2.inc'
];

var fixtureDirectory2 = ['fixtureData/fixtureData2/test3.inc',
    'fixtureData/fixtureData3/test5.inc',
    'fixtureData/test1.inc'
];



var spider = require('../spider')();

var resultsApache = spider.process(url, apacheInclude);
var resultsHello = spider.process(url, 'helloworld');


function assertDir(dir1, dir2) {

    if (dir1.length == dir2.length && dir1.every(function(content, index) {
            return content === dir2[index];
        })) {
        console.log('success');
    } else {
        console.log('fail');
    }

}


assertDir(resultsApache, fixtureDirectory); //expect success
assertDir(resultsApache, fixtureDirectory2); //expect fail
assertDir(resultsHello, fixtureDirectory2); //expect success