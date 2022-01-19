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
    const sqlSelect = "SELECT ime,prezime,grad,about,age,hasLocation,img FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID WHERE korisnik.ID = ? LIMIT 1";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/allProfile", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT korisnik.ID ,ime, prezime, username, grad, COUNT(inventar.igraID) AS brojigara, kategorija.naziv AS FavKat, img FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID LEFT JOIN kategorija ON korisnik.favGenre = kategorija.ID WHERE korisnik.favGenre = ALL (SELECT DISTINCT kategorija.ID FROM kategorija WHERE kategorija.ID = korisnik.favGenre) GROUP BY korisnik.ID";
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


// BACKEND CODE FOR INVENTORY------------------------------
//---------------------------------------------------------
//---------------------------------------------------------


app.get("/inventory/getAbout_FavGame", (req, res) => {
    const ID = req.body.ID
    const sqlPut = "SELECT igre.naziv, korisnik.About as favgame FROM igre JOIN korisnik ON igre.ID=korisnik.favGame WHERE igre.ID = (SELECT korisnik.favGame FROM korisnik WHERE korisnik.ID = 11) AND korisnik.ID = 11"
    db.query(sqlPut, [ID], (err, result) => {
        res.send(result)
    })
})

app.get("/inventory/getOwnedGames", (req, res) => {
    const ID = req.body.ID
    const sqlGet = "SELECT igre.naziv FROM igre JOIN inventar ON igre.ID = inventar.igraID JOIN korisnik ON inventar.korisnikID = korisnik.ID WHERE korisnik.ID = ?"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})

app.get("/inventory/looking4", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN inventar ON igre.ID = inventar.looking4 JOIN korisnik ON inventar.korisnikID = korisnik.ID WHERE korisnik.ID = 10";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.get("/inventory/giving4trade", (req, res) => {
    let gamesObj = {}
    let parsedGamesObj = {}
    const ID = req.body.ID
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN inventar ON igre.ID = inventar.giving4trade JOIN korisnik ON inventar.korisnikID = korisnik.ID WHERE korisnik.ID = 10";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
        gamesObj = JSON.stringify(result)
        parsedGamesObj = JSON.parse(gamesObj)
        console.log(parsedGamesObj[0].naziv)
        console.log(parsedGamesObj[1].naziv)
    })
});

app.get("/inventory/getAllGames", (req, res) => {
    let gamesObj = {}
    let parsedGamesObj = {}
    const ID = req.body.ID
    const getAllGames = "SELECT igre.ID ,igre.naziv FROM igre"
    db.query(getAllGames, [ID], (err, result) => {
        //res.send(result)
        gamesObj = JSON.stringify(result)
        parsedGamesObj = JSON.parse(gamesObj)
        console.log(parsedGamesObj[0].ID)
        console.log(parsedGamesObj[1].naziv)
        console.log(parsedGamesObj[3].naziv)
        console.log(parsedGamesObj[4].naziv)
        console.log(parsedGamesObj[5].naziv)
        console.log(parsedGamesObj[6].naziv)
        console.log(parsedGamesObj[7].naziv)
        res.send(parsedGamesObj)
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

app.post("/login", (req, res) => {
    const username = req.body.username;        //username  
    const password = req.body.passw;
    const sqlSelect = "SELECT id, username FROM korisnik WHERE korisnik.username = ? AND korisnik.passw = ?";
    db.query(sqlSelect, [username, password], (err, result) => {
        res.send(result)
    })
});





//registration
app.get('/api/user-registration', (req, res) => {
    const username = req.body
    const sqlSelect = " SELECT korisnik.username FROM korisnik WHERE username = (" + req.body.username + ")";
    db.query(sqlSelect, [username], (err, result) => {
        if (sqlSelect != null) {
            console.log(err)
        }
        else {
            app.post("/user-registration", (req, res) => {
                const username = req.body.username
                const passw = req.body.password
                const ime = req.body.ime
                const prezime = req.body.prezime
                const datum_rodenja = req.body.datum_rodenja
                const drzava = req.body.drzava
                const about = req.body.About
                const sqlInsert = " INSERT INTO korisnik (username, passw, ime, prezime, datum_rodenja, drzava, About) VALUES (?,?,?,?,?,?,?)";
                db.query(sqlInsert, [username, passw, ime, prezime, datum_rodenja, drzava, about], (err, result) => {
                    res.send(200)
                })
            })
        }
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001!");
});

