const network = require("local-devices");
const {spawn} = require('child_process');

var events = require('events');
var eventEmitter = new events.EventEmitter();

let cachedDevices = [];
let cachedAlias = [];


async function GrabScanData(ip, arg){

    return new Promise((res, rej) => {
        const python = spawn('python', ['../Python/Network/NetworkScrapper.py', ip, arg]);

        // collect data from script
        python.stdout.on('data',  (data) => {
            res(ParseData(data.toString()));
        });
    });
}


function ParseData(rawData){
    return JSON.parse(rawData);
}


function ReloadCachedDevices() { 

    network().then((devices) => {
        devices.forEach(ele => {
            GetDeviceType(ele["ip"]).then(x =>{
                ele["vendor"] = x;
                cachedDevices.push(ele);

                eventEmitter.emit("onDeviceLoad")
            });
        });
    });
}


function RegisterAlias(sourceIP, alias){
    if(alias == "" || alias == undefined)
        return;

    cachedAlias.forEach(element => {
        if(element["ip"] == sourceIP){
            element["alias"] = alias;
            return true;
        }
    });

    cachedAlias.push({"ip":sourceIP, "alias":alias});
}

function GetLocalAlias(sourceIP){
    
    cachedAlias.forEach(element => {
        if(element["ip"] == sourceIP){
            return element["alias"];
        }
    });
    
    return "";
}


const GetDeviceType = (ip) => new Promise((resolve) => {

    GrabScanData(ip, "-O").then((data) => {
        if(data["scan"][ip] && data["scan"][ip]["osmatch"][0]){
            resolve(data["scan"][ip]["osmatch"][0]["name"]);
        }
        else{
            resolve("Error");
        }
    })
   
});

module.exports.RegisterAlias = RegisterAlias;
module.exports.GetLocalAlias = GetLocalAlias;

module.exports.GrabLocalDevices = cachedDevices;
module.exports.getEvents = eventEmitter;

module.exports.GetDeviceType = GetDeviceType;
module.exports.ReloadCachedDevices = ReloadCachedDevices;