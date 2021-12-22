//Database connection

const pg = require('knex')({

  client: 'pg',

  searchPath: ['knex', 'public'],

  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:6900/producenten'

});

//Express setup
const express = require('express');
const app = express();
const port = process.env.APIPORT || 6900;
const bgRouter = express.Router();

let alreadyCreatedTable = false;
async function createTable() {
  await pg.schema.hasTable('producenten').then(function(exists) {
      if (!exists) {
        alreadyCreatedTable = true;
        return pg.schema
          .createTable('producenten', function(t) {
            t.increments('producentId').primary();
            t.string('bedrijfsnaam', 100);
          })
          .createTable('speelgoed', function (t) {
            t.increments('speelgoedId').primary();
            t.string('naam', 100);
            t.integer('prijs', 4);
            t.integer('bedrijfsnaam', 100).unsigned().references('producentId').inTable('producenten');
          }).then();
      }
    });
    if (alreadyCreatedTable) {
      await createProducentenPostgressData();
      for (let index = 0; index < 5; index++) {
        producentDataToevoegen();
      }
    }
    producentDataToevoegen();
}

createTable();



//Endpoints

const bodyParser = require('body-parser');
//const { request } = require('http');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Get
bgRouter.route('/producenten')
    .get((req, res) => {
      producentDataOphalen().then((data) => {
        console.log(data);
        res.send("Succes!")
      });
      
});  

//Update
bgRouter.route('/updateProducenten/:producentId')
    .patch((req, res) => {
         producentDataAanpassen(req.params.id);
         res.send("Data aanpassen gelukt!")
});
   

//Delete
bgRouter.route('/deleteProducenten/:producentId')
    .delete((req, res) => {
      producentDataVerwijderen(req.params.id);
      res.send("Data verwijderen gelukt!")
});


app.use('/backend', bgRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});

app.get('/', (req, res) => {
  res.send("use /backend to go further")
});

module.exports = {
    port, 
    app
}

//CRUD table producenten
async function producentDataOphalen() {
  return await pg.select('producentId', 'bedrijfsnaam').from('producenten');
}

async function producentDataToevoegen() {
  return await pg.table('producenten').insert({bedrijfsnaam: "producent"});
}

async function producentDataAanpassen(producentId) {
  return await pg.table('producenten').where('producentId', '=', producentId).update('bedrijfsnaam', "NewProducent");
}

async function producentDataVerwijderen(producentId) {
  return await pg.table('producenten').where('producentId', '=', producentId).del();
}

//CRUD table speelgoed
async function speelgoedDataOphalen() {
  return await pg.select('speelgoedId', 'prijs').from('speelgoed');
}

async function speelgoedDataToevoegen() {
  return await pg.table('speeldgoed').insert({naam: "speelgoed"});
}

async function speelgoedDataAanpassen(speelgoedId) {
  return await pg.table('speelgoed').where('speelgoedId', '=', speelgoedId).update('naam', "NewSpeelgoed" & 'prijs', 50);
}

async function speelgoedDataVerwijderen(speelgoedId) {
  return await pg.table('speelgoed').where('speelgoedId', '=', speelgoedId).del();
}