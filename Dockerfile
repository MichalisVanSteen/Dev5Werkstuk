FROM node

WORKDIR /usr/app 

COPY package*.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "start"]
#CMD ["nodemon"]