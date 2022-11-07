const path = require('path')
const fs = require('fs')
const { stdout } = require('process')
const { mkdir, readdir, copyFile, rm } = require('fs/promises')

const pathCurrentDir = path.join(__dirname, 'files')
const pathCopyDir = path.join(__dirname, 'files-copy')

const copyFolder = async () => {
  try {
    // Удаляем папку если она есть
    await rm(pathCopyDir, { force: true, recursive: true })
    if (fs.existsSync(pathCopyDir)) {
    }
    // Создаем новую папку
    await mkdir(pathCopyDir, { recursive: true })

    const filesArray = await readdir(pathCurrentDir, { withFileTypes: true })
    const onlyFiles = filesArray.filter((file) => file.isFile())

    for (const file of onlyFiles) {
      copyFile(
        path.join(pathCurrentDir, file.name),
        path.join(pathCopyDir, file.name)
      )
    }

    stdout.write(
      `
      Файлы из папки:
      ${pathCurrentDir} 
      в папку:
      ${pathCopyDir} 
      успешно скопированны!\n
      `
    )
  } catch (error) {
    console.error(error)
  }
}

copyFolder()
