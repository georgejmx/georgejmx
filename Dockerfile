FROM node:18

# installing api and copying files
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . ./

# building frontend
WORKDIR /app/frontend
RUN npm in
RUN npm run build

# # building api
WORKDIR /app
ENV NODE_ENV=production
RUN npm run build
RUN npx prisma generate

CMD ["npm", "start"]
