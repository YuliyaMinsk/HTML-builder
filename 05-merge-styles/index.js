const fs = require('fs'); 
const path = require('path');

const workDir = __dirname + '/styles/';
const resultDir = __dirname + '/project-dist/';

fs.readdir(workDir, function(error, files) {
  let writer = fs.createWriteStream(resultDir + 'bundle.css'); 
  files.forEach(function(error, file) { 
    if (path.extname(files[file]) == ".css") {
      const reader = fs.createReadStream(workDir + files[file], 'utf8');
      reader.on('readable', function() {
        const data = reader.read();
        if (data != null) writer.write(data);
      });
    }
  });
});
