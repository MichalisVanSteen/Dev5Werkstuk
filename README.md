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

2. Read
   1. Read producent
   2. Read speelgoed
   
3. Update
   1. Update producent
   2. Update speelgoed
   
4. Delete
   1. Delete producent
   2. Delete speelgoed