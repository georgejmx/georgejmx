# georgejmx

Playful junior developer

## Personal site

Enter the fractalverse

### How to build and run

#### Build

- Build frontend
  - `cd frontend`. Run `npm install`, followed by `npm run build`. This uses
    _Vite_ to build a bundle that can be served by the backend
  - _This can be edited and rebuilt using `npm run dev` to develop on before
    making further changes, this would not sync with backend however_
- Build server
  - Again; `npm install`. This time followed by `npm run build` to create the
    raw javascript files from our typescript source code. Then `npm run start`
    will spin everything up

#### Containerise locally

```
sudo docker build -t georgejmx-img:0.2.1 .
sudo docker save georgejmx-img:0.2.1 -o build/v0.2.1.tar
```

#### Deploy to server

Use certbot to generate https certificates before proceeding

```
sudo scp -v ./build/v0.2.1.tar root@141.136.42.154:/home/images/v0.2.1.tar
sudo docker load -i images/v0.2.1.tar
sudo docker run -p 80:3000 -p 443:3000 \
  -v /etc/letsencrypt/live/georgejmx.dev:/app/cert/live/georgejmx.dev:ro \
  -v /etc/letsencrypt/archive/georgejmx.dev:/app/cert/archive/georgejmx.dev:ro
  georgejmx-img
```

### Roadmap

- ~v0.1: static site~
- ~deploy to AWS using docker~
- ~v0.2: mutating frontend data stored in json mapped to client using html
  templating, stories page expanded with an isolated view, miscellaneous
  impovements, TS conversion~
- ~v0.2.1: ssl working on hostinger~
- v0.2.2: bugfixes
  - https flag, to be used in `npm start` but not `npm dev` so have both working
  - image fixed for wcne, black background for stories page, new story
- v0.3: using mongo db to store json data, also containerised and integrated
  with backend
