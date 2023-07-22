FROM node:20

# installing api
WORKDIR /app
COPY package*.json /app
RUN npm ci

COPY assets/ /app/assets
RUN npx prisma generate

# copying all required files
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src
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

RUN npm prune --omit=dev
RUN chmod 777 /app
CMD ["npm", "start"]
