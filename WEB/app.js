const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const server = require("http").createServer(app);

const bodyParser = require('body-parser')
const io = require("socket.io")(server, { cors: { origin:"*"}});

// imports

const systemInfo = require("./Modules/SystemAnalyiser");
const database = require("./Modules/DatabaseGrabber");
const network = require("./Modules/NetworkAnalyser");

// ejs
app.use(express.static("public"));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true })); 


app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

app.use(expressLayouts); 
app.set("view engine", "ejs")

// pages

app.get("/", async (req, res) => {
    res.render("partials/Page_Home", {tabIndex:0});
});

app.get("/devices", async (req, res) => {
    //res.render("partials/Page_Devices", {tabIndex:2, data: database.GrabAllDevices});
});



app.get("/network", async (req, res) => {
    res.render("partials/Page_Network", {tabIndex:1, data: network.GrabLocalDevices});
});

app.get("/network/:id", (req, res) => {
    
    const at = req.params.id.toString();
    let name = network.GetLocalAlias(at);
    console.log("q" +    network.GetLocalAlias(at) );
    
    let sendData = { "ip":at, "alias":name };

    res.render("partials/Page_Network_Specfic", {tabIndex:1, localData:sendData  });
});

app.post("/network/:id", (req, res) => {
    console.log("post req")
    network.RegisterAlias(req.params.id.toString(), req.body.alias);
});


//server.listen(8080, "192.168.0.10", () => console.log("server running at 8080"));
server.listen(8080, () => console.log("server running at 8080"));



// socket

io.on("connection", (socket) =>{
    socket.emit("onLoad", );
})

network.getEvents.on("onDeviceLoad", () => { 
    io.emit("onDeviceLoad");
});

database.GrabAllDevices.then((result) => {
    console.log(result);
}).catch((e) =>{
    console.log(e);
});
network.ReloadCachedDevices();

