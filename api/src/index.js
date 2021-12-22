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
            t.increments('id').primary();
            t.string('naam', 100);
            t.integer('prijs', 4);
            t.integer('bedrijfsnaam', 1).unsigned().references('producentId').inTable('producenten');
          }).then();
      }
    });
    if (alreadyCreatedTable) {
      await createProducentenPostgressData();
      for (let index = 0; index < 5; index++) {
        createPostgressData();
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
bgRouter.route('/updateProducenten/:id')
    .patch((req, res) => {
         producentDataAanpassen(req.params.id);
         res.send("Data aanpassen gelukt!")
});
   

//Delete
bgRouter.route('/deleteProducenten/:id')
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

async function producentDataOphalen() {
  return await pg.select('id', 'naam').from('producenten');
}

async function producentDataToevoegen() {
  return await pg.table('producenten').insert({naam: "producent"});
}

async function producentDataAanpassen(id) {
  return await pg.table('producenten').where('id', '=', id).update('naam', "NewProducent");
}

async function producentDataVerwijderen(id) {
  return await pg.table('producenten').where('id', '=', id).del();
}

