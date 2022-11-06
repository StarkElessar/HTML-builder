const path = require('path')
const fs = require('fs')
// Абсолютный путь к моему читаемому файлу:
const pathToTXTFile = path.join(__dirname, 'text.txt')

fs.createReadStream(pathToTXTFile, { encoding: 'utf-8' })
  .on('data', (text) => console.log(text))