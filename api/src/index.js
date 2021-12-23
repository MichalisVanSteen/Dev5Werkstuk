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
      await producentDataToevoegen("Hasbro");
      await producentDataToevoegen("777");
      await producentDataToevoegen("Jumbo");
      await speelgoedDataToevoegen("testspeemlgoed", 21, 1);
      await speelgoedDataToevoegen("testspeelgoed1", 221, 1);
      await speelgoedDataToevoegen("testspeelgoed2", 11, 3);
      await speelgoedDataToevoegen("testspeelgoed3", 201, 2);
    }
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
bgRouter.route('/speelgoed')
    .get((req, res) => {
      speelgoedDataOphalen().then((data) => {
        console.log(data);
        res.send("Succes!")
      });     
});  

//Update
bgRouter.route('/updateProducenten/:producentId/:newvalue')
    .patch((req, res) => {
         producentDataAanpassen(req.params.producentId, req.params.newvalue);
         res.send("Data aanpassen gelukt!")
});
bgRouter.route('/updateSpeelgoed/:speelgoedId/:newprice')
    .patch((req, res) => {
         speelgoedDataAanpassen(req.params.speelgoedId, req.params.newprice);
         res.send("Data aanpassen gelukt!")
});

//Delete
bgRouter.route('/deleteProducenten/:producentId')
    .delete((req, res) => {
      producentDataVerwijderen(req.params.producentId);
      res.send("Data verwijderen gelukt!")
});
bgRouter.route('/deleteSpeelgoed/:speelgoedId')
    .delete((req, res) => {
      speelgoedDataVerwijderen(req.params.speelgoedId);
      res.send("Data verwijderen gelukt!")
});

//Create
bgRouter.route('/createProducenten/:naam')
    .post((req, res) => {
      producentDataToevoegen(req.params.naam);
      res.send("Data toevoegen gelukt!")
});

bgRouter.route('/createSpeelgoed/:naam/:prijs/:producent')
    .post((req, res) => {
      speelgoedDataToevoegen(req.params.naam, req.params.prijs, req.params.producent);
      res.send("Data toevoegen gelukt!")
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

async function producentDataToevoegen(naam) {
  return await pg.table('producenten').insert({bedrijfsnaam: naam});
}

async function producentDataAanpassen(producentId, newbedrijfsnaam) {
  return await pg.table('producenten').where('producentId', '=', producentId).update('bedrijfsnaam', newbedrijfsnaam);
}

async function producentDataVerwijderen(producentId) {
  return await pg.table('producenten').where('producentId', '=', producentId).del();
}

//CRUD table speelgoed
async function speelgoedDataOphalen() {
  return await pg.select('speelgoedId', 'naam' ,'prijs').from('speelgoed');
}

async function speelgoedDataToevoegen(naam,prijs, producent) {
  return await pg.table('speelgoed').insert({naam: naam, prijs: prijs, bedrijfsnaam: producent});
}

async function speelgoedDataAanpassen(speelgoedId, newprijs) {
  return await pg.table('speelgoed').where('speelgoedId', '=', speelgoedId).update('prijs', newprijs);


}

async function speelgoedDataVerwijderen(speelgoedId) {
  return await pg.table('speelgoed').where('speelgoedId', '=', speelgoedId).del();
}

//7acd9611-3801-4c3d-87fd-a321ba3d7ce9