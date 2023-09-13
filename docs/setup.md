# Setup

## Testing

Execute `bun install; bun jest-test`

## Linting

Execute `bun lint`

## Build from source

_Requires node and npm installed at versions listed in the package.json_

-   Setup a database

    -   Create dev postgres container; `docker run --name thepostgres -d -e POSTGRES_PASSWORD=somethingsecure -p 5432:5432 postgres`
    -   Load in correct data to it; `cat your/data.sql | docker exec -iu postgres thepostgres psql` or alternatively run `npx prisma db push` to add a schema to a blank database

-   Launch dev server

    ```bash
    bun install
    bun bundle
    bun dev
    ```

    -   See [Dockerfile](../Dockerfile) for prod setup
    -   A _.env_ file has been generated to properly configure a local server to the above container. The dev password is **example**

## Running from docker

_Requires docker installed_

### Development

-   Spin up a clean docker network but with a database schema;

```bash
cd deploy
docker compose -f docker-compose-dev.yml up
docker exec georgejmx bun prisma db push
```

-   \[OPTIONAL\] Load in custom data to it ontop of the existing schema;

```bash
cat your/data.sql | sudo docker exec -iu postgres thepostgres psql
```

### Production

-   Create a file called _deploy/docker.env_ in the format

```
# Passwords should be changed for security reasons
POSTGRES_PASSWORD=somethingsecure
PROTOCOL=https
SSL_PUBLIC_PATH="./cert/live/georgejmx.dev/fullchain.pem"
SSL_PRIVATE_PATH="./cert/live/georgejmx.dev/privkey.pem"
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@thepostgres:5432/postgres?schema=public
ADMIN_PASSWORD=example
```

-   `cd deploy; docker compose up -d`

#### Steps that may need to be taken

-   Rebuild from latest app image `docker compose pull app; docker compose down; docker compose up --build --force-recreate -d`
-   Ensure the database has correct data inside from the previous docker volume
    -   `docker exec -itu postgres thepostgres psql`
    -   `select * from artist`
    -   If not load correct data into it from outside; `cat prisma/backups/1.sql | docker exec -iu postgres thepostgres psql`
        -   Now update the app with this new db schema by execing in then execute `npx prisma db pull`
        -   Now stop and start the app again in Docker
