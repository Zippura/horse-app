const express = require('express');
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

var helmet = require('helmet')
app.use(helmet())

app.use(express.json());
//express.urlencoded({limit: '5mb', extended: true});

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('heppatiedot.db');

app.listen(3000, () => {
    console.log('Node toimii localhost:3000');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Toimii' })
});

app.get('/heppa/all', (req, res, next) => {
	db.all('select * from heppa', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/liikutukset/all', (req, res, next) => {
	db.all('select * from heppa', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/maksut/all', (req, res, next) => {
	db.all('select * from maksut', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/ruokinnat/all', (req, res, next) => {
	db.all('select * from ruokinnat', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/tallivuorot/all', (req, res, next) => {
	db.all('select * from tallivuorot', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/toimenpiteet/all', (req, res, next) => {
	db.all('select * from toimenpiteet', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/heppa/one/:id', (req, res, next) => {
	let id = req.params.id;

    db.get('select * from heppa where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/heppa/add', (req, res, next) => {
	let tap = req.body;
	db.run('INSERT INTO heppa (nimi, saika, rotu, isa, ema, emanisa, om) VALUES (?, ?, ?)',
	[tap.nimi, tap.saika, tap.rotu, tap.isa, tap.ema, tap.emanisa, tap.om], (error, result) => {
	if (error) throw error;
	return res.status(200).json( {count: 1} );
	})
})

app.post('/maksut/add', (req, res, next) => {
	let tap = req.body;
	db.run('INSERT INTO heppa (paiva, kuvaus, maksaja, tapa, summa) VALUES (?, ?, ?)',
	[tap.paiva, tap.kuvaus, tap.maksaja, tap.tapa, tap.summa], (error, result) => {
	if (error) throw error;
	return res.status(200).json( {count: 1} );
	})
})

app.post('/ruokinnat/add', (req, res, next) => {
	let tap = req.body;
	db.run('INSERT INTO ruokinnat (sisaverkko, ulkoverkko, muutrehut) VALUES (?, ?, ?)',
	[tap.sisaverkko, tap.ulkoverkko, tap.muutrehut], (error, result) => {
	if (error) throw error;
	return res.status(200).json( {count: 1} );
	})
})

app.post('/tallivuorot/add', (req, res, next) => {
	let tap = req.body;
	db.run('INSERT INTO tallivuorot (paiva, tekija, aika, tehtava) VALUES (?, ?, ?)',
	[tap.paiva, tap.tekija, tap.aika, tap.tehtava], (error, result) => {
	if (error) throw error;
	return res.status(200).json( {count: 1} );
	})
})

app.post('/toimenpiteet/add', (req, res, next) => {
	let tap = req.body;
	db.run('INSERT INTO heppa (toimenpide, paiva, tekija, hinta, kuvaus) VALUES (?, ?, ?)',
	[tap.toimenpide, tap.paiva, tap.tekija, tap.hinta, tap.kuvaus], (error, result) => {
	if (error) throw error;
	return res.status(200).json( {count: 1} );
	})
})

app.post('/liikutukset/add',  upload.single('kuva'), (req, res, next) => {
	let liikutukset = req.body;

  let kuva = null;
  if (req.file) {
    kuva = req.file.originalname;
  }
 
  db.run('insert into liikutukset (paiva,kuva,hlo,saatila,kuvaus) values (?, ?, ?, ?, ?)',
	      [liikutukset.paiva, kuva, liikutukset.hlo, liikutukset.saatila, liikutukset.kuvaus], (error, result) => {
		if (error) throw error;

		return res.status(200).json( {count: 1} );
	});
})
app.get('/download/:nimi', (req, res, next) => {
    var file = './images/' + req.params.nimi;
    res.download(file);
});

app.get('/heppa/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from heppa where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('/liikutukset/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from liikutukset where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('/maksut/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from maksut where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('/ruokinnat/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from ruokinnat where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('/tallivuorot/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from tallivuorot where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('/toimenpiteet/delete/:id', (req, res, next) => {
	let id = req.params.id;

  db.run('delete from toimenpiteet where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Ei pyydettyä palvelua' })
})
