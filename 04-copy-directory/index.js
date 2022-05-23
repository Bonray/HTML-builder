const fs = require('fs');
const path = require('path');

(function copyDir() {
  fs.access(path.join(__dirname, '/files-copy'), fs.constants.F_OK, err => {    
    if (err) fs.mkdir(path.join(__dirname, '/files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
    });
  });
  fs.readdir(path.join(__dirname, '/files-copy'), (err, files) => {
    if (!err) {
      files.forEach(file => {
        fs.access(path.join(__dirname, '/files', file), fs.constants.F_OK, err => {
          if (err) {
            fs.rm(path.join(__dirname, '/files-copy', file), (err) => {
              if (err) throw err;
            });
          }
        });
      });
    }
  });
  fs.readdir(path.join(__dirname, '/files'), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      // console.log(path.join(__dirname, '/files-copy', file));
      fs.copyFile(path.join(__dirname, '/files', file), path.join(__dirname, '/files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  });
})();