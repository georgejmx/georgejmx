from node:16

workdir /app

copy package.json .

run npm install

copy . .

expose 80

cmd ["node", "dist/server.js"]