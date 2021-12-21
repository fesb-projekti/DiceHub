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
app.use(bodyParser.urlencoded({ extended: true }));

//BACKEND CODE FOR PROFILE --------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

app.get("/profileCards/profile", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT ime,  prezime,  grad,  about,  2021 - YEAR(datum_rodenja) AS age FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID WHERE korisnik.ID = ? LIMIT 1";
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

app.get("/profileCards/getFavGame", (req, res) => {
    const ID = req.body.ID

    const sqlGet =
        "SELECT igre.naziv FROM igre WHERE igre.ID = (SELECT korisnik.favGame FROM korisnik WHERE korisnik.ID = ?)"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})

app.get("/profileCards/getFavGenre", (req, res) => {
    const ID = req.body.ID

    const sqlGet =
        "SELECT kategorija.naziv FROM kategorija WHERE kategorija.ID = (SELECT korisnik.favGenre FROM korisnik WHERE korisnik.ID = ?)"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})



app.get("/profileCards/looking4", (req, res) => {
    const ID = req.body.ID
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN looking4 on igre.ID = looking4.igraWantID WHERE looking4.korisnikID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        res.send(result)
    })
});

app.post("/profileCards/vote", (req, res) => {
    const voterID = req.body.voterID
    const ratedUserID = req.body.voterID
    const vote = req.body.vote

    const sqlInsert = "INSERT INTO ratings (voterID,ratedUserID,vote) VALUES(?,?,?)"
    db.query(sqlInsert, [voterID, ratedUserID, vote], (err, result) => {
        res.send(result)
    })
})

app.get("/profileCards/getPositiveRating", (req, res) => {
    const ID = req.body.ID

    const sqlPut = "SELECT COUNT(vote) AS Broj FROM ratings WHERE vote = 'positive' AND ratedUserID = ?"
    db.query(sqlPut, [ID], (err, result) => {
        res.send(result)
    })
})

app.get("/profileCards/getNegativeRating", (req, res) => {
    const ID = req.body.ID

    const sqlPut = "SELECT COUNT(vote) AS Broj FROM ratings WHERE vote = 'negative' AND ratedUserID = ?"
    db.query(sqlPut, [ID], (err, result) => {
        res.send(result)
    })
})

// BACKEND CODE FOR INVENTORY------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

app.get("/inventory/getAbout", (req, res) => {
    const ID = req.body.ID

    const sqlPut = "SELECT korisnik.about FROM korisnik WHERE korisnik.ID = ?"
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

app.get("/inventory/getFavGame", (req, res) => {
    const ID = req.body.ID

    const sqlGet =
        "SELECT igre.naziv as favgame FROM igre WHERE igre.ID = (SELECT korisnik.favGame FROM korisnik WHERE korisnik.ID = 10)"
    db.query(sqlGet, [ID], (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001!");
});