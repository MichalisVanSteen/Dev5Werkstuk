const { test, expect } = require("@jest/globals");
const { help } = require("yargs");

const backendVariables = require("./index");
const backendroutes = require("./index.js");
const request = require('supertest');

//Endpoint testing

it('Testing connection to endpoint', async() => {
  const response = await request(backendroutes.app).get('/')
  expect(response.status).toBe(200)
})

it('Testing connection to producent endpoint get', async() => {
  const response = await request(backendroutes.app).get('backend/producenten')
  expect(response.status).toBe(200)
})

it('Testing connection to producent endpoint create', async() => {
  const response = await request(backendroutes.app).post('backend/createProducenten/clubtoy')
  expect(response.status).toBe(200)
})

it('Testing connection to producent endpoint update', async() => {
  const response = await request(backendroutes.app).patch('backend/producentDataAanpassen/1/updatetest')
  expect(response.status).toBe(200)
})

it('Testing connection to producent endpoint delete', async() => {
  const response = await request(backendroutes.app).delete('backend/producentDataVerwijderen/1')
  expect(response.status).toBe(200)
})

it('Testing connection to speelgoed endpoint get', async() => {
  const response = await request(backendroutes.app).get('backend/speelgoed')
  expect(response.status).toBe(200)
})

it('Testing connection to speelgoed endpoint create', async() => {
  const response = await request(backendroutes.app).post('backend/createSpeelgoed/testspeelgoed/20/2')
  expect(response.status).toBe(200)
})

it('Testing connection to speelgoed endpoint update', async() => {
  const response = await request(backendroutes.app).patch('backend/updateSpeelgoed/1/69')
  expect(response.status).toBe(200)
})

it('Testing connection to speelgoed endpoint delete', async() => {
  const response = await request(backendroutes.app).delete('backend/deleteSpeelgoed/3')
  expect(response.status).toBe(200)
})