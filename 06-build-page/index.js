const fs = require('fs'); 
const path = require('path');

const resultDir = __dirname + '/project-dist/';
const assetDir = __dirname + '/assets/';
const styleDir = __dirname + '/styles/';
const componentDir = __dirname + '/components/';

// copy assets dir with all files
fs.rm(resultDir + 'assets/', { recursive: true }, function(error, files) {
  fs.readdir(assetDir, function(error, files) {
    fs.mkdir(resultDir + 'assets/', { recursive: true }, function(error) {
      files.forEach(function(error, file) { 
        copydir(assetDir + files[file], resultDir + 'assets/' + files[file]);
      });
   

// create style.css file
fs.readdir(styleDir, function(error, files) {
  let writer = fs.createWriteStream(resultDir + 'style.css'); 
  files.forEach(function(error, file) { 
    if (path.extname(files[file]) == ".css") {
      const reader = fs.createReadStream(styleDir + files[file], 'utf8');
      reader.on('readable', function() {
        const data = reader.read();
        if (data != null) writer.write(data);
      });
    }
  });
});

// create index.html file
fs.readFile(__dirname + '/template.html', 'utf8', function(error, data){      
  fs.readdir(componentDir, function(error, files) {
    files.forEach(function(error, file) { 
      if (path.extname(files[file]) == ".html") {
        fs.readFile(componentDir + files[file], 'utf8', function (error, dataComponent) {
          let re = new RegExp('{{' + path.basename(files[file], path.extname(files[file])) + '}}', 'gim');              
          data = data.replace(re, dataComponent);
          fs.writeFile(resultDir + '/index.html', data, (error) => {
            if (error) throw error;
          });
      });
      }
    });  
  });
});

});
});
});

function callback(error) {
  if (error) throw console.log(error);
}

function copydir(fromDir, toDir) {
  fs.readdir(fromDir, function(error, files) {
    fs.mkdir(toDir, { recursive: true }, function(error) {
      files.forEach(function(error, file) { 
        fs.stat(fromDir + '/' + files[file], function(error, stats) {
          if (error) console.log(error);
          if (!stats.isDirectory()) {
            fs.copyFile(fromDir + '/' + files[file], toDir + '/' + files[file], callback);
          } else {
            copydir(fromDir + '/' + files[file], toDir + '/' + files[file]);
          }
        });
      });
    });
  });
}