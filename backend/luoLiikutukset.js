const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE liikutukset (" +
              "id integer PRIMARY KEY NOT NULL, " +
              "kuva text, " +
              "paiva date NOT NULL, " +
              "hlo text NOT NULL, " +
              "saatila text NOT NULL, " +
			  "kuvaus text NOT NULL )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `liikutukset` (`id`, `paiva`, `kuva`, `hlo`, `saatila`, `kuvaus`) "+
	" VALUES (1, '2020-03-23', 'typy1.jpg', 'Mira', 'Aurinkoista, +8', 'Peltolenkki, kunnollinen harjaus')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `liikutukset` (`id`, `paiva`, `kuva`, `hlo`, `saatila`, `kuvaus`) "+
	" VALUES (2, '2020-03-27', 'typy2.jpg', 'Suvi', 'Aurinkoista, +11', 'Kentällä maasta käsin tehtyjä harjoituksia')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `liikutukset` (`id`, `paiva`, `kuva`, `hlo`, `saatila`, `kuvaus`) "+
	" VALUES (3, '2020-04-02', 'typy3.jpg', 'Suvi ja Mira', 'Pilvistä, +9', 'Irtohypytystä, typy tykkäsi!')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, paiva, hlo, saatila, kuvaus FROM liikutukset", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.paiva + ", " + row.hlo + ", " + row.saatila + ", " + row.kuvaus );
	});

	db.close();
});
