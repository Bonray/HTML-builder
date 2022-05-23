const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const writeableStream = fs.createWriteStream(path.join(__dirname, '/text.txt'));

stdout.write('Введите произвольный текст:\n');
stdin.on('data', data => {
  const dataStringified = data.toString().trim();
  if (dataStringified === 'exit') process.emit('SIGINT');
  writeableStream.write(dataStringified + '\n');
});

process.on('SIGINT', () => {
  stdout.write('До скорой встречи!\n');
  exit();
});