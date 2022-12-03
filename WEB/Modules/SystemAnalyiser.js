const info = require("systeminformation");
const os = require("os");

module.exports.GetSystemInfo = new Promise((resolve) => {
    info.cpu().then(dat => {
        resolve([dat])
        //return [os.cpus()[0]];
    });
});