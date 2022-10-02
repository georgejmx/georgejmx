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
sudo docker build -t georgejmx-img .
sudo docker save georgejmx-img:latest -o build/v0.1.tar
```

#### Deploy to server

```
scp -v .build/v0.1.tar home-vm:/home/ubuntu/images/v0.1.tar
sudo docker load -i images/v0.1.tar
sudo docker run -p 80:3000 -d georgejmx-img
```

#### Containerise locally

```
sudo docker build -t georgejmx-img .
sudo docker save georgejmx-img:latest -o build/v0.1.tar
```

#### Deploy to server

```
scp -v .build/v0.1.tar home-vm:/home/ubuntu/images/v0.1.tar
sudo docker load -i images/v0.1.tar
sudo docker run -p 80:3000 -d georgejmx-img
```

### Roadmap

- ~v0.1: static site~
- ~deploy to AWS using docker~
- ~v0.2: mutating frontend data stored in json mapped to client using html
  templating, stories page expanded with an isolated view, miscellaneous
  impovements, TS conversion~
- v0.3: using mongo db to store json data, also containerised and integrated
  with backend
