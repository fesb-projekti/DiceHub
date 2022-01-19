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

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); //parsing url encoded data 


  app.get('/authorize', (req, res) => {      
      console.log(res);
    const username = req.body.username        //username   
    const password = req.body.passw  //password
    const sqlSelect = " SELECT korisnik.username, korisnik.passw FROM korisnik WHERE username = ? AND passw = ? "; 
    db.query(sqlSelect,[username], [password] , (err, result) => {
        if (username==req.body.username && password==req.body.passw )
        {
            res.status(200)
        }
        else{
            console.log(err)
        }
    })
  });

  


const port = 3001
 app.listen(port, () => console.log(`app on port=>: ${port}`));  