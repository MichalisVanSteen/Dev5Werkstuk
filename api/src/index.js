//Database connection

const pg = require('knex')({

  client: 'pg',

  searchPath: ['knex', 'public'],

  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:6900/producenten'

});

//Express setup
const express = require('express');
const app = express();
const port = process.env.PORT || 6900;
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
}

createTable();


//Endpoints

const bodyParser = require('body-parser');
const { request } = require('http');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// exports.up = function(knex) {
//   return knex.schema
//     .createTable('producenten', function(table){
//       table.increments('id');
//       table.string('name', 255).notNullable();
//       table.string('email', 255);
//       table.timestamps();
//     });
// };

app.get('/producenten/:producentenId', (req, res) => {
  res.send(req.params.producentenId)
})

app.route('/speelgoed')
  .get(function (req, res) {
    res.send('Get a random toy')
  })
  .post(function (req, res) {
    res.send('Add a toy')
  })
  .put(function (req, res) {
    res.send('Update the toy')
  })

//Tabel
  // bgRouter.route('/producenten')
  //   .get((req, res) => {
  //       RecieveData(req,res)
  //   });
 
  // bgRouter.route('/categorie')
  //   .get((req, res) => {
  //       RecieveData(req,res)
  // });

  // bgRouter.route('/speelgoed')
  //   .get((req, res) => {
  //       RecieveData(req,res)
  // });    

//Update
// bgRouter.route('/updateProducenten/:id')
//     .patch((req, res) => {
//     UpdateProducenten(req, res);     
// });

// bgRouter.route('/updateCategorie/:id')
//     .patch((req, res) => {
//     UpdateCategorie(req, res);     
// });

// bgRouter.route('/updateSpeelgoed/:id')
//     .patch((req, res) => {
//     UpdateSpeelgoed(req, res);     
// });

//Delete
// bgRouter.route('/deleteProducenten/:id')
//     .delete((req, res) => {
//     deleteProducenten(res,res);
// });

// bgRouter.route('/deleteCategorie/:id')
//     .delete((req, res) => {
//     deleteCategorie(res,res);
// });

// bgRouter.route('/deleteSpeelgoed/:id')
//     .delete((req, res) => {
//     deleteSpeelgoed(res,res);
// });

app.use('/api', bgRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});

module.exports = {
    port
}

//Functions Endpoints

function RecieveData(req, res) {
    client.query(`Select * from producenten`, (err, res) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
    });
    res.send("succesfully read");
}

async function deleteProducenten(req,res) {
    await client.query(
        `DELETE FROM public.producenten WHERE "id" = '${req.params.id}';`,
        (err, res) => {
            console.log(err, res);
        }
    );
    res.send("succefully deleted!")
}

async function UpdateProducenten(req, res) {
    request.post
    await client.query(
        `UPDATE public.producenten
        SET "naam" = '${req.body.naam}'
        WHERE "id" = '${req.params.id}'`,
        (err, res) => {
            console.log(err, res);
        }
    );
    res.send("Succesfully updated!")
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