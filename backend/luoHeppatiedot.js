const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE heppa (" +
              "id integer PRIMARY KEY NOT NULL, " +
              "nimi text NOT NULL, " +
			  "saika text NOT NULL, " +
			  "rotu text NOT NULL, " +
			  "isa text NOT NULL, " +
              "ema text NOT NULL, " +
              "emanisa text NOT NULL, " +
			  "om text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `heppa` (`id`, `nimi`, `saika`, `rotu`, `isa`, `ema`, `emanisa`, `om`) "+
	" VALUES (1, 'Tallulah', '8.6.2012', 'Suomenhevonen', 'Apassi', 'Remman Ryminä', 'Teme', 'Mira ja Suvi')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, nimi, saika, rotu, isa, ema, emanisa, om FROM heppa", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.nimi + ", " + row.saika + ", " + row.rotu + ", " + row.isa + ", " + row.ema + ", " + row.emanisa + ", " + row.om );
	});

	db.close();
});
