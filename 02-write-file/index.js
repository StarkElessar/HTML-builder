const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

const outputFileTXT = fs.createWriteStream(path.join(__dirname, 'log.txt'))

stdout.write(
  ' Здарова! \n Внизу после этого сообщения ты можешь ввести своё сообщение и я запишу его в файл логирования "log.txt". \n Ты можешь закончить этот процесс, просто введи в консоли "exit" или нажми "CTRL+C" \n'
)

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    stdout.write(' Файл записан..\n До следующего сеанса!\n')
    process.exit()
  }

  outputFileTXT.write(chunk)
})

process.on('SIGINT', () => {
  stdout.write(' Файл записан..\n До следующего сеанса!\n')
  process.exit()
})
