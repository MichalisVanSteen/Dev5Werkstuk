FROM node

WORKDIR /usr/app 

COPY . /usr/app/
COPY package*.json .

RUN npm install .
RUN npm install -g nodemon

EXPOSE 6900

COPY . .

#CMD ["npm", "start"]
CMD ["nodemon"]
