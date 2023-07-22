# Setup

## Testing

Execute `npm install; npm test`

## Linting

Execute `npm run lint`

## Build from source

_Requires node and npm installed_

-   Setup a database
    -   Create dev postgres continaer; `sudo docker run --name thepostgres -d -e POSTGRES_PASSWORD=somethingsecure -p 5432:5432 postgres`
    -   Load in correct data to it; `cat prisma/backups/1.sql | sudo docker exec -iu postgres thepostgres psql`
    -   A _.env_ file will be generated to properly configure a local server to the above container
-   Build frontend
    -   `cd frontend`. Run `npm install`, followed by `npm run build`. This uses
        _Vite_ to build a bundle that can be served by the backend
    -   _This can be edited and rebuilt using `npm run dev` to develop on before
        making further changes, this would not sync with backend however_
-   Build server
    -   Again; `npm install`. Then `npm run dev` will spin everything up for development. See [Dockerfile](../Dockerfile) for prod setup
    -   A _.env_ file has been generated to properly configure a local server to the above container. The dev password is `example`

## Running from docker

_Requires docker installed_

### Development

-   Again set up a database container
    -   Create dev postgres continaer; `sudo docker run --name thepostgres -d -e POSTGRES_PASSWORD=somethingsecure -p 5432:5432 postgres`
    -   Load in correct data to it; `cat prisma/backups/1.sql | sudo docker exec -iu postgres thepostgres psql`
-   `cd deploy; docker compose -f docker-compose-dev.yaml up` will spin everything up
    -   May need to exec into app container and run `npx prisma db pull` to ingest database schema
    -   _$PROTOCOL_ set to http ensures removes the need for ssl certificates, other _.env_ values are currently insecure only for dev mode

### Production

-   Create a file called _docker.env_ in the format

```
# Passwords should be changed for security reasons
POSTGRES_PASSWORD=somethingsecure
PROTOCOL=https
SSL_PUBLIC_PATH="./cert/live/georgejmx.dev/fullchain.pem"
SSL_PRIVATE_PATH="./cert/live/georgejmx.dev/privkey.pem"
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@thepostgres:5432/postgres?schema=public
ADMIN_HASH=d232dfb7203bfba2b34252186dfa953fbfa0e58487254f53b4fcffc7295a4daf
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
