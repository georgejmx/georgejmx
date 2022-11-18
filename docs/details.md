# Details

Currently a nodejs backend which serves a frontend. The frontend is built using _Vite_ and includes the _threejs_ package

## Roadmap

- ~v0.1: static site~
- ~deploy to AWS using docker~
- ~v0.2: mutating frontend data stored in json mapped to client using html
  templating, stories page expanded with an isolated view, miscellaneous
  impovements, TS conversion~
- ~v0.2.1:
  - ssl working on hostinger
  - bugfixes
    - https flag, to be used in `npm start` but not `npm dev` so have both working
    - image fixed for wcne, black background for stories page, new story~
- v0.3: using mongo db to store json data, also containerised and integrated
  with backend
