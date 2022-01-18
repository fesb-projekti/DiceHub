const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser")
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "usbw",
    database: "dicehub"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database!");
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); //parsing url encoded data 

//get functiong fetches data from database
app.get('/login', (req, res) => {
    const username = req.body.username        //username  
    const password = req.body.passw
    const sqlSelect = "SELECT username, IF(username = 'dane' AND passw = 'meso123', true,false ) as test FROM korisnik";
    db.query(sqlSelect, [username, password], (err, result) => {
        res.send(result)
    })
});


/* app.get("/login", (req, res) => {
    const passw = req.body.passw       //hashed password
    const sqlSelect = " SELECT passw FROM korisnik WHERE passw = ?"; 
    db.query(sqlPut,[passw], (err, result) => {
        res.send(result)
    })
}); */


const port = 3001
app.listen(port, () => console.log(`app on port=>: ${port}`));  