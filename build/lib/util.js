module.exports = {
  getIps(){
    var ips = [];
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && !alias.internal) {
          ips.push(alias.address);
        }
      }
    }
    ips.reverse();
    return ips;
  }
}