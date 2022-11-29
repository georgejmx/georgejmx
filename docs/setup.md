# Setup

## Build from source

_Requires node and npm installed_

- Setup a database
  - Create dev postgres continaer; `sudo docker run --name jmxgres -d -e POSTGRES_PASSWORD=pleasework -p 5432:5432 postgres`
  - Load in correct data to it; `cat prisma/backups/1.sql | sudo docker exec -iu postgres thepostgres psql`
  - The current _.env_ file properly configures a local backend to the above container
- Build frontend
  - `cd frontend`. Run `npm install`, followed by `npm run build`. This uses
    _Vite_ to build a bundle that can be served by the backend
  - _This can be edited and rebuilt using `npm run dev` to develop on before
    making further changes, this would not sync with backend however_
- Build server
  - Again; `npm install`. This time followed by `npm run build` to create the
    raw javascript files from our typescript source code. Then `npm run dev`
    will spin everything up for development

## Running from docker

_Requires docker installed_

- Running `docker compose up` will spin everything up, with only the _docker.env_ file needed. _$PROTOCOL_ determines if https certificates are needed on your machine, clearly _$POSTGRES_PASSWORD_ should be changed also
