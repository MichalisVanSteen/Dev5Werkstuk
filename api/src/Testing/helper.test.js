const backendVariables = require("./../index");
const { test, expect } = require("@jest/globals");
const helpers = require("./../herlpers");
const { help } = require("yargs");

const {
    string
} = require("yargs");
const helpers = require("../index")

test("Helper function to check a string length", () => {
    expect(helpers.checkStringLength()).toBeFalsy();
    expect(helpers.checkStringLength(120)).toBeFalsy();
    expect(helpers.checkStringLength("fkgndskngf")).toBeFalsy();
    expect(helpers.checkStringLength("hello")).toMatch("hello");
    expect(helpers.checkStringLength("Hello")).not.toMatch("hello");
    expect(typeof helpers.checkStringLength("hello")).toMatch("string");
})


//Endpoint testing

const supertest = require('supertest');
const { response } = require('express');
const request = supertest(app)
const backendroutes = require("../index.js");

it('Testing connection to endpoint', async() => {
  const response = await request(apiroutes.app).get(('backend/producenten'))
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done()
})

