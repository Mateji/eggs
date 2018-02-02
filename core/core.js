util = require('util');

module.exports = class Core {

    static log(prefix, data, args) {
        if (args === undefined) {
            if (data instanceof Object) {
                console.log(prefix + ': ' + util.inspect(data, { showHidden: false, depth: null }));
            } else {
                console.log(prefix + ': ' + data);
            }
        } else {
            console.log(prefix + ': ' + data, args);
        }
    }
};