const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, '/project-dist', '/bundle.css'), '', err => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, '/styles'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, '/styles', file.name), 'utf8');
      const writeableStream = fs.createWriteStream(path.join(__dirname, '/project-dist', '/bundle.css'), { flags: 'a' });
      readableStream.pipe(writeableStream);
      // readableStream.on('data', chunk => writeableStream.write(chunk));
      // readableStream.on('end', () => writeableStream.end());
      // readableStream.on('error', err => console.log(err));
    }
  });
});