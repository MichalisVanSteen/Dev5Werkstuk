FROM node

WORKDIR /usr/app 

COPY package*.json ./

RUN npm i

EXPOSE 6900

COPY ./ ./

CMD ["npm", "start"]
#CMD ["nodemon"]
