var fs = require('fs');

var log;

function init(logg) {
    log = logg;

    exports.init = init;


}

exports.init = init;

exports.save = function (name, data) {
    console.log(data)
    fs.writeFileSync(name, data);
}