var recursiveReadSync = require('recursive-readdir-sync'),
    files;


module.exports = function() {

    var Spider = function() {
        var fs = require('fs');
        this.process = function(url, keyword) {
            //return oneLevelSearch(url,keyword);
            return recursiveLevelSearch(url, keyword);
        }




        function contains(file, keyword) {
            var fileContents = fs.readFileSync(file, {
                encoding: 'utf8'
            })
           return (fileContents.indexOf(keyword) > -1) 
        };




        function oneLevelSearch(url, keyword) {
            var foundFiles = [];
            var files = fs.readdirSync(url);

            var i,   var filesLength = files.length;

            for (i = 0; i < filesLength; i++) {
                if (contains(url + '/' + files[i], keyword)) {
                    foundFiles.push(files[i]);
                };
            }

            return foundFiles;
        }


        function recursiveLevelSearch(url, keyword) {

            var foundFiles = [];

            try {
                files = recursiveReadSync(url);
            } catch (err) {
                if (err.errno === 34) {
                    console.log('Path does not exist');
                } else {
                    //something unrelated went wrong, rethrow
                    throw err;
                }
            }         
            files.forEach(function(fileName) {

                if (contains(fileName, keyword)) {
                    foundFiles.push(fileName);

                }

            });

            return foundFiles;

        }

    }
    return new Spider;
}