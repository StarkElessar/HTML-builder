const path = require('path')
const {readdir, stat} = require('fs/promises');
const { formatBytes } = require('./formatBytes')
const { stdout } = process

const pathToSecretFolder = path.join(__dirname, 'secret-folder')

const findFiles = async (pathToFolder) => {
  try {
    const files = await readdir(pathToFolder, { withFileTypes: true })
    const onlyFiles = files.filter((file) => file.isFile())

    for (const file of onlyFiles) {
      const pathFile = path.join(pathToFolder, file.name)
      const fileStat = await stat(pathFile)
      const fileInfo = file.name.split('.')
      
      fileInfo.push(formatBytes(fileStat.size))
      stdout.write(fileInfo.join(' - ') + '\n')
    }
  } catch (error) {
    console.error(error)
  }
}


findFiles(pathToSecretFolder)
