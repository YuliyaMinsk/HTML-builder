const fs = require('fs'); 

//fs.rm(__dirname + '/files-copy/', { recursive: true }, () => console.log('done'));

fs.rmdir(__dirname + '/files-copy/', { recursive: true }, function(error, files) {
  console.log('deleted /files-copy/');
  fs.readdir(__dirname + '/files/', function(error, files) {
    fs.mkdir(__dirname + '/files-copy/', { recursive: true }, function(error) {
    console.log('created /files-copy/');
    files.forEach(function(error, file) {    
      fs.stat(__dirname + '/files/' + files[file], function(error, stats) {
        console.log('created ' + files[file]);
        if (!stats.isDirectory()) {
          fs.copyFile(__dirname + '/files/' + files[file], __dirname + '/files-copy/' + files[file], callback);
        } else {
          fs.mkdir(__dirname + '/files-copy/' + files[file], { recursive: true }, callback);
        }
      });
    });    
  });
 });
});

function callback(error) {
  if (error) throw console.log(error);
}
