const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE toimenpiteet (" +
              "id integer PRIMARY KEY NOT NULL, " +
              "toimenpide text NOT NULL, " +
              "paiva date NOT NULL, " +
              "tekija text NOT NULL, " +
              "hinta text NOT NULL, " +
			  "kuvaus text NOT NULL )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `toimenpiteet` (`id`, `toimenpide`, `paiva`, `tekija`, `hinta`, `kuvaus`) "+
	" VALUES (1, 'Vuolu', '2020-03-23', 'Mira', '0', 'Viilausta reunoista')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `toimenpiteet` (`id`, `toimenpide`, `paiva`, `tekija`, `hinta`, `kuvaus`) "+
	" VALUES (2, 'Raspaus ja rokotus', '2020-03-27', 'Ell Anna', '200', 'Hampaissa piikkejä, saatiin pois')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `toimenpiteet` (`id`, `toimenpide`, `paiva`, `tekija`, `hinta`, `kuvaus`) "+
	" VALUES (3, 'Vuolu', '2020-04-02', 'Mira', '0', 'Etusten varpaiden lyhennys')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, toimenpide, paiva, tekija, hinta, kuvaus FROM toimenpiteet", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.toimenpide + ", " + row.paiva + ", " + row.tekija + ", " + row.hinta + ", " + row.kuvaus );
	});

	db.close();
});
