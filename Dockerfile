FROM oven/bun

WORKDIR /app
COPY package*.json /app
COPY tsconfig.json /app/tsconfig.json
COPY *.config.ts /app

RUN bun install

COPY assets/ /app/assets
COPY src/ /app/src
COPY views/ /app/views

RUN bun prisma generate
RUN bun bundle

CMD ["bun", "src/index.ts"]
