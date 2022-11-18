from node:16

workdir /app

copy package.json .

run npm install

copy . .

expose 80
expose 443

cmd ["npm", "start"]
