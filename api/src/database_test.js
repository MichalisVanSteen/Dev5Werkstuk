const supertest = require('supertest');
const app = require('./../server.js')
const pg = require('knex')({  
    client: 'pg',  version: '9.6',
    searchPath: ['knex', 'public'],  
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING :'postgres://example:example@localhost:5432/test'
});

const request = supertest(app);
describe('testing postgres', () => {  
    test('full circle', async (done) =>{    
        try {      
            let uuid = null;      
            await request.post('/test')        
            .send({ title: 'test', summary: 'testing' })        
            .expect(200)        
            .then((resp) => resp.body.res)        
            .then((res) => {          
                uuid = res[0].uuid        
            }).catch((e) => {          
                console.log(e)        
            })      
            await pg.raw('BEGIN');      
            pg.select('*').table("posts").where({uuid}).then((rows) => {        
                console.log(rows)        
                expect(rows).toBeInstanceOf(Array);        
                expect(rows.length).toBe(1);      
            })      
            .then(() => {        
                done();      
            })    
        } catch(err) {      
            throw err;    
        } finally {    

        }  
    })
});