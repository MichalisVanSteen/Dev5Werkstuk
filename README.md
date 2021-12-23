# Dev5Werkstuk
Werkstuk van Development 5

How to run this project?

Run docker-compose up --build -d
Advice: Run this while you are in the api folder

Create an .env file in the api folder
Type the following code inside the .env file

PORT=5432
APIPORT=6900
POSTGRES_HOST=pg
POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=producenten

Routes:

1. Create
   1. Create producent
   2. Create speelgoed
      This route allows you to add a new speelgoed element
      The number "2" in the route is the relationship linked to the comapny who made the toy for the new speelgoed data element
      The number "20" in the route is the price for the new speelgoed data element
      The word "testspeelgoed" in the route is the name for the new speelgoed data element
      localhost:6900/backend/createSpeelgoed/testspeelgoed/20/2

2. Read
   1. Read producent
      This route allows you to read all producenten from te database
      localhost:6900/backend/producenten
   2. Read speelgoed
      This route allows you to read all speelgoed from te database
      localhost:6900/backend/speelgoed
   
3. Update
   1. Update producent
      
   2. Update speelgoed
   
4. Delete
   1. Delete producent
   2. Delete speelgoed