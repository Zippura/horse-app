const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE ruokinnat (" +
              "id integer PRIMARY KEY NOT NULL, " +
              "sisaverkko text NOT NULL, " +
			  "ulkoverkko text NOT NULL, " +
			  "muutrehut text NOT NULL )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `ruokinnat` (`id`, `sisaverkko`, `ulkoverkko`, `muutrehut`) "+
	" VALUES (1, '6 kg sisäverkkoon', '6 kg ulkoverkkoon', '1 dl pellavaa')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, sisaverkko, ulkoverkko, muutrehut FROM ruokinnat", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.sisaverkko + ", " + row.ulkoverkko + ", " + row.muutrehut );
	});

	db.close();
});
