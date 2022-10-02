from node:16

workdir /app

copy package.json .

run npm install

copy . .

expose 80

<<<<<<< HEAD
cmd ["node", "server.js"]
=======
cmd ["npm", "run start"]
>>>>>>> dev
