const fs = require('fs'); 
const newDir = __dirname + '/files-copy/';
const oldDir = __dirname + '/files/';

//fs.rm(__dirname + '/files-copy/', { recursive: true }, () => console.log('done'));

fs.rmdir(newDir, { recursive: true }, function(error, files) {
  // console.log('deleted /files-copy/');
  fs.readdir(oldDir, function(error, files) {
    fs.mkdir(newDir, { recursive: true }, function(error) {
    // console.log('created /files-copy/');
    files.forEach(function(error, file) {    
      fs.stat(oldDir + files[file], function(error, stats) {
        // console.log('created ' + files[file]);
        if (!stats.isDirectory()) {
          fs.copyFile(oldDir + files[file], newDir + files[file], callback);
        } else {
          fs.mkdir(newDir + files[file], { recursive: true }, callback);
        }
      });
    });    
  });
 });
});

function callback(error) {
  if (error) throw console.log(error);
}
