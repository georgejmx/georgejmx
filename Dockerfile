FROM node:18

# installing api
WORKDIR /app
COPY package*.json .
RUN npm ci

RUN npx prisma generate

# copying all required files
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src
COPY assets/ /app/assets
COPY views/ /app/views

# building frontend
COPY frontend/ /app/frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# building api
WORKDIR /app
ENV NODE_ENV=production
RUN npm run compile
RUN npx prisma generate

CMD ["npm", "start"]
