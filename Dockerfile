FROM node:18

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

RUN npx prisma generate

CMD ["npm", "start"]
