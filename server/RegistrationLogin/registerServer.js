const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser")

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
 
app.get('/api/user-registration', (req, res) => {      
    const username = req.body       
    const sqlSelect = " SELECT korisnik.username FROM korisnik WHERE username = ("+req.body.username+")"; 
    db.query(sqlPut,[username],  (err, result) => {
        if(sqlSelect !=null)
        {
           console.log(err)
        }
        else
        {
            app.post("/api/user-registration", (req, res) => {
                const username = req.body.username
                const passw = req.body.password
                const ime = req.body.ime
                const prezime = req.body.prezime
                const datum_rodenja = req.body.datum_rodenja
                const drzava = req.body.drzava
                const about= req.body.About
                const sqlInsert = " INSERT INTO korisnik (username, passw, ime, prezime, datum_rodenja, drzava, About) VALUES (?,?,?,?,?,?,?)"; 
                db.query(sqlInsert, [username, passw, ime,prezime,datum_rodenja,drzava,about], (err, result) => {
                    res.send(200)
                })
            })
        }
    })
})
    
 const port = 3001
 app.listen(port, () => console.log(`app on port=>: ${port}`));  