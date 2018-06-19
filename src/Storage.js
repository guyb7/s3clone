const fs = require('fs')
const path = require('path')
const util = require('util')
const stat = util.promisify(fs.stat)
const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const STORAGE_DIR = path.join(__dirname, '..', process.env.STORAGE_PATH || 'storage')

init = async () => {
  try {
    await stat(STORAGE_DIR)
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(STORAGE_DIR)
    } else {
      throw e
    }
  }
}

read = async id => {
  return await readFile(path.join(STORAGE_DIR, id))
}

write = async (id, data) => {
  await writeFile(path.join(STORAGE_DIR, id), data)
}

module.exports = {
  init,
  read,
  write
}
