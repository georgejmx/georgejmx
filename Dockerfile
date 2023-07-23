FROM node:20

WORKDIR /app
COPY package*.json /app
COPY tsconfig.json /app/tsconfig.json
COPY *.config.ts /app

ENV NODE_ENV=development
RUN npm install

COPY assets/ /app/assets
COPY src/ /app/src
COPY views/ /app/views

RUN npx prisma generate
RUN npm run compile

ENV NODE_ENV=production
RUN npm prune --omit=dev
CMD ["npm", "start"]
