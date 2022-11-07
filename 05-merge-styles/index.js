const path = require('path')
const { stdout } = require('process')
const { readdir, readFile } = require('fs/promises')
const { createWriteStream } = require('fs')

const pathToStyles = path.join(__dirname, 'styles')
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css')

const createBundleStyles = async () => {
  try {
    const filesInfoArray = await readdir(pathToStyles, { withFileTypes: true })
    const filteredFiles = filesInfoArray.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css'
    )
    const stream = createWriteStream(pathToBundle, 'utf-8')

    for (const file of filteredFiles) {
      const textOfFile = await readFile(path.join(pathToStyles, file.name), 'utf-8')
      stream.write(`${textOfFile}\n`)
    }

    stdout.write('Bundle был успешно создан!\n')
  } catch (error) {
    console.error(error.message)
  }
}

createBundleStyles()
