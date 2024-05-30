function getPort(username) {
    var os = require("os");
    const HOST = os.hostname();
    let port = null;
    if(HOST != "spider.foi.hr"){
        port = 12222;
    }else{
        const ports = require("/var/www/OWT/2024/portovi.js");
        port = ports[username];
    }
    return port;
}

module.exports = {getPort};