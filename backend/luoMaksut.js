const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE maksut (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "paiva date NOT NULL, " +
			  "kuvaus text NOT NULL, " +
			  "maksaja text NOT NULL, " +
			  "tapa text NOT NULL, " +
			  "summa text )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `maksut` (`id`, `paiva`, `kuvaus`, `maksaja`, `tapa`, `summa`) "+
	" VALUES (1, '2020-03-23', 'Tallivuokra maaliskuu', 'Suvi', 'Tilisiirto', '20')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `maksut` (`id`, `paiva`, `kuvaus`,`maksaja`, `tapa`, `summa`) "+
	" VALUES (2, '2020-03-28', 'Heinäverkot', 'Suvi', 'Korttimaksu', '110')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `maksut` (`id`, `paiva`, `kuvaus`,`maksaja`, `tapa`, `summa`) "+
	" VALUES (3, '2020-03-30', 'Hiekka', 'Suvi', 'Tilisiirto', '82.5')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `maksut` (`id`, `paiva`, `kuvaus`,`maksaja`, `tapa`, `summa`) "+
	" VALUES (4, '2020-04-01', 'Varusteita', 'Mira', 'Käteinen', '40')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, kuvaus, paiva, maksaja, tapa, summa FROM maksut", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.paiva + ", " + row.kuvaus + ", " + row.maksaja + ", " + row.tapa + ", " + row.summa );
	});

	db.close();
});
