const fs = require('fs');
const path = require('path');

(function() {
  fs.readdir(path.join(__dirname, '/secret-folder'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExtension = file.name.split('.')[1];
        fs.stat(path.join(__dirname, '/secret-folder', file.name), (err, stats) => {
          if (err) throw err;
          console.log(`${ fileName } - ${ fileExtension } - ${ stats.size }B`);
        });
      }
    });
  });
})();