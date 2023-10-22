const merge = require('deepmerge')

var files = ["language", "ticket", "ticketch", "prefix", "autorole", "setwelcome"]

var imported = []

files.forEach(function(file) {
    imported.push(require(`./${file}.json`))
})

var first = imported[0];
imported.forEach(function(file, index) {
var second = imported[index+1] || {}
first = merge(first, second)
})

require("fs").writeFileSync("db.json", JSON.stringify(first, null, 4));