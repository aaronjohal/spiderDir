var recursiveReadSync = require('recursive-readdir-sync'),
    files;
    var path = require('path'); //new


module.exports = function(args) {
     var url = args[0];
     var keyword = args[1]; 


    var Spider = function() {
        var fs = require('fs');
        this.process = function() {
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
            var files = fs.readdirSync(url); //already excludes '.'

            var i;   
            var filesLength = files.length;

            for (i = 0; i < filesLength; i++) {
                if (contains(url + '/' + files[i], keyword)) {
                    foundFiles.push(files[i]);
                };
            }

            return foundFiles;
        }


        function recursiveLevelSearch(url, keyword) {

            var foundFiles = [];
            var temp = [];

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

            files.forEach(function(fileName){
                if(fileName.match(/\.(inc|ssi|sssi|shtml|stm)$/)){
                    if (contains(fileName, keyword)) {
                    foundFiles.push(fileName);
                    console.log(fileName);
                }
                     
                }
               

            });
           

        writeContentsToFile(foundFiles);

            return foundFiles;

        }

            function writeContentsToFile(contents){
            var date = new Date();
            file = fs.createWriteStream(new Date() + '.txt');
            file.on('error', function(err) { throw err });
            contents.forEach(function(v) { file.write(v.split(', ') + '\n'); });
            file.end();
            console.log('wrote contents to file');

        }

    }

    return new Spider;
}