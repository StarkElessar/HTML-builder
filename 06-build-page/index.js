const nodePath = require('path')
const { createWriteStream } = require('fs')
const {
  rm,
  mkdir,
  readFile,
  writeFile,
  readdir,
  copyFile,
} = require('fs/promises')

const root = nodePath.join(__dirname)
const dist = `${root}/project-dist`

const path = {
  build: {
    index: `${dist}/index.html`,
    css: `${dist}/style.css`,
    assets: `${dist}/assets`,
  },
  root: {
    components: `${root}/components`,
    css: `${root}/styles`,
    assets: `${root}/assets`,
    template: `${root}/template.html`,
  },
}

class CreateBundle {
  async createBuildFolder() {
    try {
      await rm(dist, { force: true, recursive: true })
      await mkdir(dist, { recursive: true })
    } catch (error) {
      console.error(error.message)
    }
  }
  async bundleHTML() {
    try {
      let templateSource = await readFile(path.root.template, 'utf-8')
      const componentsNameArray = templateSource.match(/{{(.*)}}/gi)

      for (const component of componentsNameArray) {
        const componentFileName = `${component.replace(/{|}/g, '')}.html`
        const pathToComponentFile = nodePath.join(
          path.root.components,
          componentFileName
        )
        const componentFileSource = await readFile(pathToComponentFile, 'utf-8')

        templateSource = templateSource.replace(component, componentFileSource)
      }

      await writeFile(path.build.index, templateSource)
    } catch (error) {
      console.error(error)
    }
  }
  async bundleStyles() {
    try {
      const filesNameArray = await readdir(path.root.css, {
        withFileTypes: true,
      })
      const filteredFiles = filesNameArray.filter(
        (file) => file.isFile() && nodePath.extname(file.name) === '.css'
      )
      const stream = createWriteStream(path.build.css, 'utf-8')

      for (const file of filteredFiles) {
        const textCSSOfFile = await readFile(
          nodePath.join(path.root.css, file.name),
          'utf-8'
        )

        stream.write(`${textCSSOfFile}\n`)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  async copyAssets(root, dist) {
    try {
      await mkdir(dist, { recursive: true })

      const files = await readdir(root, { withFileTypes: true })

      console.log(files)

      for (const file of files) {
        if (file.isDirectory()) {
          this.copyAssets(
            nodePath.join(root, file.name),
            nodePath.join(dist, file.name)
          )
        } else {
          copyFile(
            nodePath.join(root, file.name),
            nodePath.join(dist, file.name)
          )
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

(async () => {
  await new CreateBundle().createBuildFolder()
  await new CreateBundle().bundleHTML()
  await new CreateBundle().bundleStyles()
  await new CreateBundle().copyAssets(path.root.assets, path.build.assets)
})()
