/**
 * Express JS handlers loader
 * Created by skitsanos on 5/25/17.
 */

var fs = require('fs');
var path = require('path');

module.exports = {
    path: global.appRoot + '/app/request-handlers/',

    list: function ()
    {
        fs.readdir(this.path, function (err, items)
        {
            if (items != undefined) {
                for (var i = 0; i < items.length; i++) {
                    if (path.extname(items[i]).toLowerCase() == '.js') {
                        var filename = path.basename(items[i], '.js');
                        console.log(filename)
                    }
                }
            }
        });
    },

    load: function (container, callback)
    {
        var _root = this.path;
        var _path = this.path + 'map.json';

        fs.readdir(this.path, function (err, items)
        {
            if (items != undefined) {
                //load handlers map
                fs.readFile(_path, {flag: 'r'}, function (err, data)
                {
                    if (err) throw err;

                    //read and content of the handler map
                    var mapContent = JSON.parse(data);
                    if (mapContent.handlers != undefined) {
                        for (var h = 0; h < mapContent.handlers.length; h++) {
                            var endpoint = mapContent.handlers[h];
                            var jsFile = _root + endpoint.handler;

                            if (fs.existsSync(jsFile + '.js')) {
                                console.log('loading handler for ' + endpoint.path + ' ' + (endpoint.method != undefined ? '(' + endpoint.method.toUpperCase() + ')' : ''));
                                if (endpoint.method === 'post') {
                                    container.post(endpoint.path, require(jsFile));
                                }
                                else {
                                    container.get(endpoint.path, require(jsFile));
                                }
                            }
                            else {
                                console.error('Handler not loaded for ' + endpoint.path + ' ' + (endpoint.method != undefined ? '(' + endpoint.method.toUpperCase() + ')' : ''));
                            }
                        }

                        callback();
                    }
                });
            }
        })
    }
};
