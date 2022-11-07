const { stdin, stdout } = process
const fs = require('fs')

const outputFileTXT = fs.createWriteStream('log.txt')

stdout.write(' Здарова! \n Внизу после этого сообщения ты можешь ввести своё сообщение и я запишу его в файл логирования "log.txt". \n Ты можешь закончить этот процесс, просто введи в консоли "exit" или нажми "CTRL+C" \n')

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    stdout.write(' Ввод завершен..\n До следующего сеанса!')
    process.exit();
  }
  output.write(chunk);
})