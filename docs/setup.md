# Setup

## Build from source

_Requires nodejs and npm installed_

- Build frontend
  - `cd frontend`. Run `npm install`, followed by `npm run build`. This uses
    _Vite_ to build a bundle that can be served by the backend
  - _This can be edited and rebuilt using `npm run dev` to develop on before
    making further changes, this would not sync with backend however_
- Build server
  - Again; `npm install`. This time followed by `npm run build` to create the
    raw javascript files from our typescript source code. Then `npm run dev`
    will spin everything up for development

<!-- TODO: Make it so not all containers need the correct ssl certs in place -->
<!-- ## Build an run container locally

_Requires docker installed_

- Build: `docker build -t georgejmx:0.2.1 .`
- Run: `docker run -p 8000:3000 -d georgejmx:0.2.1`

then look at for example _localhost:8000_ -->
