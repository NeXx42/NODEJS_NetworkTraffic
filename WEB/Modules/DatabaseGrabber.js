const sqlite = require("sqlite3").verbose();

const DATABASE_REGIDENTITY = "'registerdDevices'";


const database = new sqlite.Database("../Database/database.db", (err) => {
    if(err)
        console.log(err.message);
    else
        console.log("Connected to database");
});


function CreateEntry(ip, alias)
{
    AttemptTableCreation();

    const sql = `
    
        INSERT INTO ${DATABASE_REGIDENTITY} (ip, alias)
        VALUES(?, ?)
    `

    database.run(sql, [ ip, alias], (res, err) => {
        console.log(res);
    });
}

function AttemptTableCreation()
{
    database.prepare(`CREATE TABLE IF NOT EXISTS ${DATABASE_REGIDENTITY} 
        (
            ip TEXT,
            alias TEXT,
            PRIMARY KEY(ip)
        )
    `).run().finalize();
}


module.exports.GrabAllDevices = new Promise((response, reject) => {

    const sql = `SELECT * FROM ${DATABASE_REGIDENTITY}`;
    AttemptTableCreation();

    database.get(sql, (result, err) => {

        if(err){
            console.log(err.message);
            reject(["wwwww"]);
        }

        console.log("qqqqqqqqqqqqqqqq             " + result);
        response(result)
    });
});

//CreateEntry("192.168.0.10", "Home_PC");
database.close();