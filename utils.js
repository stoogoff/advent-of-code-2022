
const fs = require('fs')
const path = require('path')

exports.read = name => fs.readFileSync(path.join(__dirname, name), 'utf8')
