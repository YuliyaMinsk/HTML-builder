const fs = require('fs'); 
const path = require('path');
 
fs.readdir(__dirname + '/secret-folder/', function(error, files) {
  files.forEach(function(error, file) {    
    fs.stat(__dirname + '/secret-folder/' + files[file], (error, stats) => {
      if (!stats.isDirectory()) {
      console.log(path.basename(files[file], path.extname(files[file])), '-', 
                  path.extname(files[file]).slice(1), '-', stats.size);
      }
    });
  });    
});