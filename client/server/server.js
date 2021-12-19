
const express = require("express");
const app = express();
const mysql = require("mysql");
//const cors = require("cors");
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
    console.log("spojeno!");
})


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/profileCards/profile", (req, res) => {
    const sqlSelect = "SELECT ime,  prezime,  grad,  about,  2021 - YEAR(datum_rodenja) AS age, korisnik.favGame as FavGame, korisnik.favGenre as FavGenre FROM korisnik LEFT JOIN inventar ON korisnik.ID = inventar.korisnikID LEFT JOIN igre ON inventar.igraID = igre.ID WHERE korisnik.ID = ? LIMIT 1";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});


app.get("/profileCards/ratings", (req, res) => {
    const sqlSelect = " SELECT poz_ocjena,  neg_ocjena FROM korisnik WHERE korisnik.ID = ?";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/gamesOwned", (req, res) => {
    const sqlSelect = " SELECT igre.naziv FROM igre JOIN inventar on igre.ID = inventar.igraID JOIN korisnik on inventar.korisnikID = korisnik.ID WHERE korisnik.ID = ?";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/giving4trade", (req, res) => {
    const sqlSelect = " SELECT igre.naziv FROM igre JOIN giving4trade on igre.ID = giving4trade.igraHaveID WHERE giving4trade.korisnikID = ?";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.get("/profileCards/looking4", (req, res) => {
    const sqlSelect = "SELECT igre.naziv FROM igre JOIN looking4 on igre.ID = looking4.igraWantID WHERE looking4.korisnikID = ?";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
});

app.listen(3001, () => {
    console.log("radi!");
});