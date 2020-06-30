const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('heppatiedot.db');

db.serialize( () => {

	let sql = "CREATE TABLE tallivuorot (" +
              "id integer PRIMARY KEY NOT NULL, " +
              "paiva date NOT NULL, " +
              "tekija text NOT NULL, " +
              "aika text NOT NULL, " +
			  "tehtava text NOT NULL )";

	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `tallivuorot` (`id`, `paiva`, `tekija`, `aika`, `tehtava`) "+
	" VALUES (1, '2020-03-20', 'Mira', '2 tuntia', 'Pihaton siivous ja kuivitus')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `tallivuorot` (`id`, `paiva`, `tekija`, `aika`, `tehtava`) "+
	" VALUES (2, '2020-03-27', 'Suvi', '1 tunti', 'Ponitallin siivous')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });
    
    sql = "INSERT INTO `tallivuorot` (`id`, `paiva`, `tekija`, `aika`, `tehtava`) "+
	" VALUES (3, '2020-04-02', 'Mira ja Suvi', '2 tuntia', 'Koko tallin teko')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `tallivuorot` (`id`, `paiva`, `tekija`, `aika`, `tehtava`) "+
	" VALUES (4, '2020-04-8', 'Suvi', '1 tunti', 'Pihaton siivous')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});
	
	sql = "INSERT INTO `tallivuorot` (`id`, `paiva`, `tekija`, `aika`, `tehtava`) "+
	" VALUES (5, '2020-04-10', 'Mira', '2 tuntia', 'Tallin teko')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Rivi lisättiin");
    });

	db.each("SELECT id, paiva, tekija, aika, tehtava FROM tallivuorot", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.paiva + ", " + row.tekija + ", " + row.aika + ", " + row.tehtava );
	});

	db.close();
});
