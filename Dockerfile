FROM node:18

# building and copying api
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

# building frontend
WORKDIR /app/frontend
ENV NODE_ENV=production
RUN npm run build

# building api
WORKDIR /app
ENV NODE_ENV=production
RUN npm run build
RUN npx prisma generate

CMD ["npm", "start"]
