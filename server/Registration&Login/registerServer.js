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
 
app.get('/register', (req, res) => {      
    const username = req.body      //username   
    const sqlSelect = " SELECT korisnik.username FROM korisnik WHERE username = ("+req.body.username+")"; 
    db.query(sqlPut,[username],  (err, result) => {
        if(sqlSelect !=null)
        {
            console.log(result);
        }
        else
        {
            const sqlSelect = " INSERT INTO korisnik (username, passw, ime, prezime, datum_rodenja, drzava, About) VALUES ("+req.body.username +","+req.body.passw+","+req.body.ime+","+req.body.prezime +","+req.body.datum_rodenja +","+req.body.drzava +","+req.body.About +")"; 
            res.send(result)
        }
    });
});
        


    
    
const port = 3001
 app.listen(port, () => console.log(`app on port=>: ${port}`));  