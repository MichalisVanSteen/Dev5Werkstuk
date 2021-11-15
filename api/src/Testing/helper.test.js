const { test, expect } = require("@jest/globals");
const { help } = require("yargs");
const helpers = require("./../database_test");



// const { response } = require('express');
// const app = require('../index');

const backendVariables = require("../index");
const backendroutes = require("../index.js");
const request = require('supertest');


// const {
//     string
// } = require("yargs");
// const helpers = require("../index")

// test("Helper function to check a string length", () => {
//     expect(helpers.checkStringLength()).toBeFalsy();
//     expect(helpers.checkStringLength(120)).toBeFalsy();
//     expect(helpers.checkStringLength("fkgndskngf")).toBeFalsy();
//     expect(helpers.checkStringLength("hello")).toMatch("hello");
//     expect(helpers.checkStringLength("Hello")).not.toMatch("hello");
//     expect(typeof helpers.checkStringLength("hello")).toMatch("string");
// })

test("testing port length", () => {
  expect(helpers.checkPortLength(backendVariables.port.toString())).toBeFalsy();
})



//Endpoint testing

it('Testing connection to endpoint', async() => {
  const response = await request(backendroutes.app).get('/')
  expect(response.status).toBe(200)
  done()
})

it('Testing connection to endpoint get', async() => {
  const response = await request(backendroutes.app).get('backend/producenten')
  expect(response.status).toBe(200)
  done()
})

it('Testing connection to endpoint update', async() => {
  const response = await request(backendroutes.app).patch('backend/producentDataAanpassen/1')
  expect(response.status).toBe(200)
  done()
})

it('Testing connection to endpoint delete', async() => {
  const response = await request(backendroutes.app).delete('backend/producentDataVerwijderen/1')
  expect(response.status).toBe(200)
  done()
})


