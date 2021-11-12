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

app.post('/addUser', (req, res) => {
    client.query(
            "INSERT INTO users(id, naam)VALUES(gen_random_uuid(), 'Jeff')",
            (err, res) => {
                console.log(err, res);
                client.end();
            }
        );
        res.send("Succesfully added")
    });

//Helpers

function checkStringLength(str) {
    return str && typeof str == "string" && str.length <= 10 ? str : false; 
}

module.exports = checkStringLength;