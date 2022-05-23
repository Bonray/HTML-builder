const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, '/project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
  if (err) throw err;
  let html = data.toString();
  const tags = html.match(/{{.*?}}/g);
  tags.forEach(tag => {
    const tagName = tag.slice(2, -2);
    fs.readFile(path.join(__dirname, '/components', `${tagName}.html`), (err, data) => {
      if (err) throw err;
      html = html.replace(tag, data);
      fs.writeFile(path.join(__dirname, '/project-dist', '/index.html'), html, (err) => {
        if (err) throw err;
      });
    });
  });
});

fs.writeFile(path.join(__dirname, '/project-dist', '/style.css'), '', err => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, '/styles'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, '/styles', file.name), 'utf8');
      const writeableStream = fs.createWriteStream(path.join(__dirname, '/project-dist', '/style.css'), { flags: 'a' });
      readableStream.pipe(writeableStream);
    }
  });
});

const copyDir = function(src, dest) {
  fs.access(dest, fs.constants.F_OK, err => {    
    if (err) fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) throw err;
    });
  });
  
  fs.readdir(src, (err, files) => {
    if (!err) {
      files.forEach(file => {
        fs.access(path.join(src, file), fs.constants.F_OK, err => {
          if (err) fs.rm(path.join(dest, file), (err) => {
            if (err) throw err;
          });
        });
      });
    }
  });
  
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    // console.log(files);
    files.forEach(file => {
      if (file.isFile()) {
        fs.copyFile(path.join(src, file.name), path.join(dest, file.name), (err) => {
          if (err) throw err;
        });
      } else if (file.isDirectory()) {
        copyDir(path.join(src, file.name), path.join(dest, file.name));
      }
    });
  });
};

copyDir(path.join(__dirname, '/assets'), path.join(__dirname, '/project-dist', '/assets'));
