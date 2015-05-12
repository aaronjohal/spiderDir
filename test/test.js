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


function assertDeepEquals(var1, var2) {
    for (var i = 0; i < var1.length; i++) {
        if (var1[i] != var2[i]) {
            throw new Error('something bad happened');
        }


    }
    console.log('success');

}



function assertDir(dir1, dir2) {

    if (dir1.length == dir2.length && dir1.every(function(u, i) {
            return u === dir2[i];
        })) {
        console.log('success');
    } else {
        console.log('fail');
    }

}


assertDir(resultsApache, fixtureDirectory); //expect success
assertDir(resultsApache, fixtureDirectory2); //expect fail
assertDir(resultsHello, fixtureDirectory2); //expect success