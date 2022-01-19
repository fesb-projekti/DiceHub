const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser")
const cors = require('cors');
const { json } = require("body-parser");

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
app.use(bodyParser.urlencoded({ extended: true }));

//BACKEND CODE FOR PROFILE --------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

app.get("/profileCards/profile/:ID", (req, res) => {
    const ID = req.params.ID
    const sqlSelect = "SELECT ime,prezime,grad,About,(2022-YEAR(datum_rodenja)) AS age,hasLocation,img FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID WHERE korisnik.ID = ? LIMIT 1";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/allProfile", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT korisnik.ID,ime, prezime, username, grad, COUNT(inventar.igraID) AS brojigara, kategorija.naziv AS FavKat, img FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID LEFT JOIN kategorija ON korisnik.favGenre = kategorija.ID WHERE korisnik.favGenre = ALL (SELECT DISTINCT kategorija.ID FROM kategorija WHERE kategorija.ID = korisnik.favGenre) GROUP BY korisnik.ID";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/gamesOwned", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = " SELECT igre.naziv FROM igre JOIN inventar on igre.ID = inventar.igraID JOIN korisnik on inventar.korisnikID = korisnik.ID WHERE korisnik.ID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/giving4trade", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = " SELECT igre.naziv FROM igre JOIN giving4trade on igre.ID = giving4trade.igraHaveID WHERE giving4trade.korisnikID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/looking4", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN looking4 on igre.ID = looking4.igraWantID WHERE looking4.korisnikID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/getFavGame", (req, res) => {
    const ID = req.body.ID
    const sqlGet =
        "SELECT igre.naziv FROM igre WHERE igre.ID = (SELECT korisnik.favGame FROM korisnik WHERE korisnik.ID = ?)"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})


app.post("/profileCards/vote", (req, res) => {
    const voterID = req.body.voterID
    const ratedUserID = req.body.ratedUserID
    const vote = req.body.vote
    const sqlInsert = "INSERT INTO ratings (voterID,ratedUserID,vote) VALUES(?,?,?)"
    db.query(sqlInsert, [voterID, ratedUserID, vote], (err, result) => {
        res.send(result)
    })
})

app.get("/getRatings/:ID", (req, res) => {
    const ID = req.params.ID;
	  let data = {};
    const sqlPositive = "SELECT COUNT(vote) AS Broj, vote FROM ratings WHERE vote = 'positive' AND ratedUserID = ?"
    db.query(sqlPositive, [ID], (err, result) => {
        data.positive = result;
    })
	  const sqlNegative = "SELECT COUNT(vote) AS Broj, vote FROM ratings WHERE vote = 'negative' AND ratedUserID = ?"
    db.query(sqlNegative, [ID], (err, result) => {
        data.negative = result;
        res.send(data);
    })
})

app.get("/getRater/:user/:voter", (req, res) => {
    const userID = req.params.user;
    const voterID = req.params.voter;
    const sqlQuery = "SELECT vote FROM ratings WHERE voterID = ? AND ratedUserID = ?"
    db.query(sqlQuery, [voterID,userID], (err, result) => {
        res.send(result)
    })
})

// BACKEND CODE FOR INVENTORY------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

let inventoryObj = {
    about: "",
    gamesOwned: [],
    favGame: "",
    looking4: [],
    giving4trade: []
}



app.get("/inventory/getAbout_FavGame/:ID", (req, res) => {
    const ID = req.params.ID;
    const sqlPut = "SELECT igre.naziv, korisnik.About AS about FROM igre JOIN korisnik ON igre.ID=korisnik.favGame WHERE igre.ID = (SELECT korisnik.favGame FROM korisnik WHERE korisnik.ID = ?) AND korisnik.ID = ?"
    db.query(sqlPut, [ID,ID], (err, result) => {
        res.send(result)
    })
})

app.get("/inventory/getOwnedGames/:ID", (req, res) => {
    const ID = req.params.ID;
    const sqlGet = "SELECT igre.naziv FROM igre JOIN inventar ON igre.ID = inventar.igraID JOIN korisnik ON inventar.korisnikID = korisnik.ID WHERE korisnik.ID = ?"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})


app.get("/inventory/looking4/:ID", (req, res) => {
    const ID = req.params.ID;
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN looking4 on igre.ID = looking4.igraWantID WHERE looking4.korisnikID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/inventory/giving4trade/:ID", (req, res) => {
    const ID = req.params.ID;
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN giving4trade ON igre.ID = giving4trade.igraHaveID WHERE giving4trade.korisnikID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/inventory/getAllGames/:ID", (req, res) => {
    const ID = req.params.ID;
    const getAllGames = "SELECT igre.naziv FROM igre"
    db.query(getAllGames, [ID], (err, result) => {
        res.send(result)
    })
})
////settings


app.put("/update_profile", (req, res) => {
    const keys = Object.keys(req.body)
    let fieldNameArray = []
    let valuesArray = []
    let dataBaseFieldNameArray = []

    keys.forEach((key, index) => {   //pushing values from req to an array
        if (req.body[key] != "") {
            fieldNameArray.push(key),
                valuesArray.push(req.body[key])
        }
    })

    for (let i = 0; i < fieldNameArray.length; i++) { //equalising dataBase field names with req object names
        switch (fieldNameArray[i]) {
            case 'name':
                dataBaseFieldNameArray.push("ime")
                break;
            case 'surname':
                dataBaseFieldNameArray.push("prezime")
                break;
            case 'password':
                dataBaseFieldNameArray.push("passw")
                break;
            case 'repeatPassword':
                dataBaseFieldNameArray.push("repeatPassword")
                break;
            case 'age':
                dataBaseFieldNameArray.push("age")
                break;
            case 'location':
                dataBaseFieldNameArray.push("grad")
                break;
            case 'about':
                dataBaseFieldNameArray.push("about")
                break;
            case 'hasLocation':
                dataBaseFieldNameArray.push("hasLocation")
                break;
            default:
                break;
        }
    }
    for (let i = 0; i < fieldNameArray.length; i++) {
        if (fieldNameArray[i] == "repeatPassword") {                          //removal of repeating password field
            dataBaseFieldNameArray.splice(i, 1)
            valuesArray.splice(i, 1)
        }
    }


    let que = "UPDATE korisnik SET " //setting up the query request
    let arrLen = dataBaseFieldNameArray.length
    let lastEl = dataBaseFieldNameArray.length - 1
    for (let i = 0; i < arrLen; i++) {
        if (i < lastEl) {
            que = que + dataBaseFieldNameArray[i] + " = ?, "
        }
        else if (i == lastEl) {
            que = que + dataBaseFieldNameArray[i] + " = ? "
        }
    }
    console.log(dataBaseFieldNameArray)
    console.log(valuesArray)

    que = que + " WHERE korisnik.ID = 10" //adding user ID that will be updated
    db.query(que, valuesArray, (err, result) => {   //sending the query to the data base
        res.send(result)
        console.log(err)
    })
})

//LOGIN--------------------------------------------------------
//LOGIN--------------------------------------------------------
//LOGIN--------------------------------------------------------

app.post('/login', (req, res) => {
    const username = req.body.username;        //username  
    const password = req.body.passw;
    const sqlSelect = "SELECT id, username FROM korisnik WHERE korisnik.username = ? AND korisnik.passw = ?";
    db.query(sqlSelect, [username, password], (err, result) => {
        res.send(result)
    })
});

app.post('/userRegistration', (req, res) => {
    const username = req.body.userName
    const sqlSelect = "SELECT korisnik.username FROM korisnik WHERE username = ?";
    db.query(sqlSelect, [username], (err, result) => {
        if (result != "") {
            res.send([{"status": 0}]);
        }
        else 
        {
          const username = req.body.userName
          const passw = req.body.password
          const ime = req.body.firstName
          const prezime = req.body.lastName
          const datum_rodenja = req.body.dateOfBirth
          const img = req.body.avatar
          const drzava = req.body.country
          const city = req.body.city
          const sqlInsert = " INSERT INTO korisnik (username, passw, ime, prezime, datum_rodenja, drzava, grad, img) VALUES (?,?,?,?,?,?,?,?)";
          db.query(sqlInsert, [username, passw, ime, prezime, datum_rodenja, drzava, city, img], (err, result) => {
                    res.send([{"status": 1}]);
                })
          }
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001!");
});