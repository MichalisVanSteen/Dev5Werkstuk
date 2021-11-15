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

async function createTable() {
  await pg.schema.hasTable('producenten').then(function(exists) {
      if (!exists) {
        return pg.schema.createTable('producenten', function(t) {
          t.increments('id').primary();
          t.string('naam', 100);
        });
      }
    });
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
    port
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

//Helpers

// function checkStringLength(str) {
//     return str && typeof str == "string" && str.length <= 10 ? str : false; 
// }

// module.exports = checkStringLength;



// const helpers = {
//     /**
//      * checks if string length is smaller than or equal to 10
//      * @param {string} str the user given string 
//      * @returns false if not a string or too long, otherwise string itself
//      */
//     checkStringLength(str) {
//       return str && typeof str == "string" && str.length <= 10 ? str : false;
//     },
  
//     /**
//      * check if body send by endpoint is in order
//      * @param {object} body 
//      * @returns {object} body if all is capitalised and shortened, or false if something missing
//      */
//     bodyCheck(body) {
//       if(body && body.title && body.imageURL && body.excerpt) {
//         const { title, imageURL, excerpt} = body;
//         if(title.length < 10 && this.checkIfURL(imageURL)) {
//           return {
//             ...body,
//             title: this.capitalise(title),
//             excerpt: this.shortenText(excerpt, 20)
//           }
//         }
//       }
//       return false;
//     },
    
//     /**
//      * shorten text to a certain length, add ... at the end
//      * @param {*} text input text
//      * @param {*} length desired length (account for the "...")
//      * @returns string shortened with "..." at end
//      */
//     shortenText(text, length) {
//       if(text) {
//         return text.length > length ? text.substring(0, length)+"..." : text;
//       }
//       return false;
//     },
  
//     /**
//      * capitalise the first letter of a given string
//      * @param {string} string input string
//      * @returns the capitalised string
//      */
//     capitalise(string) {
//       return string ? string.charAt(0).toUpperCase() + string.slice(1) : false;
//     },
  
//     /**
//      * check if a given string is a url
//      * @param {string} url 
//      * @returns true if url, false if not
//      */
//     checkIfURL(url) {
//       if(url) {
//         const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
//         return regex.test(url);
//       }
//       return false;
//     }
//   }
  
//   module.exports = helpers;