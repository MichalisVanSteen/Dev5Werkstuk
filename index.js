//Express setup
const express = require('express');
const app = express();
const port = process.env.PORT || 5543;
const bgRouter = express.Router();

const {
    Client
} = require('pg')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 6942,
    password: "admin",
    database: "postgres"
})
client.connect();

//Endpoints

const bodyParser = require('body-parser');
const { request } = require('http');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

bgRouter.route('/producenten')
    .get((req, res) => {
        RecieveData(req,res)
    })
 
bgRouter.route('/updateProducenten/:id')
    .patch((req, res) => {
    UpdateUsers(req, res);     
});

bgRouter.route('/deleteProducenten/:id')
    .delete((req, res) => {
    deleteUser(res,res);
});

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

//Testing

// app.post('/addProducenten', (req, res) => {
//     client.query(
//             "INSERT INTO producenten(id, naam)VALUES(gen_random_uuid(), 'Hasbro')",
//             (err, res) => {
//                 console.log(err, res);
//                 client.end();
//             }
//         );
//         res.send("Succesfully added")
//     });

//Helpers

// function checkStringLength(str) {
//     return str && typeof str == "string" && str.length <= 10 ? str : false; 
// }

// module.exports = checkStringLength;



const helpers = {
    /**
     * checks if string length is smaller than or equal to 10
     * @param {string} str the user given string 
     * @returns false if not a string or too long, otherwise string itself
     */
    checkStringLength(str) {
      return str && typeof str == "string" && str.length <= 10 ? str : false;
    },
  
    /**
     * check if body send by endpoint is in order
     * @param {object} body 
     * @returns {object} body if all is capitalised and shortened, or false if something missing
     */
    bodyCheck(body) {
      if(body && body.title && body.imageURL && body.excerpt) {
        const { title, imageURL, excerpt} = body;
        if(title.length < 10 && this.checkIfURL(imageURL)) {
          return {
            ...body,
            title: this.capitalise(title),
            excerpt: this.shortenText(excerpt, 20)
          }
        }
      }
      return false;
    },
    
    /**
     * shorten text to a certain length, add ... at the end
     * @param {*} text input text
     * @param {*} length desired length (account for the "...")
     * @returns string shortened with "..." at end
     */
    shortenText(text, length) {
      if(text) {
        return text.length > length ? text.substring(0, length)+"..." : text;
      }
      return false;
    },
  
    /**
     * capitalise the first letter of a given string
     * @param {string} string input string
     * @returns the capitalised string
     */
    capitalise(string) {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : false;
    },
  
    /**
     * check if a given string is a url
     * @param {string} url 
     * @returns true if url, false if not
     */
    checkIfURL(url) {
      if(url) {
        const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        return regex.test(url);
      }
      return false;
    }
  }
  
  module.exports = helpers;