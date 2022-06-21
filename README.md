# georgejmx

Playful junior developer

## Personal site

Enter the fractalverse

### How to build and run

#### Build

- Build frontend
    - `cd frontend`. Run `npm install`, followed by `npm run build`. This uses
    *Vite* to build a bundle that can be served by the backend
    - This can be edited and rebuilt using `npm run dev` to develop on before
    making further changes
- Build server
    - Again; `npm install` followed by `node server.js` to spin it all up

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
- v0.2: spotify top artists from api, other mutating frontend data stored
    in json mapped to client using html templating

