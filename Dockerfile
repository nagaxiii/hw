FROM node:8.9-alpine
# ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g webpack webpack-cli
RUN npm install --silent 
# && mv node_modules ../
COPY . .
RUN cp .env.docker .env
EXPOSE 3000
CMD npm start