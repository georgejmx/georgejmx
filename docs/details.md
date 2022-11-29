# Details

Currently a nodejs backend which serves a frontend

- The frontend is built using _Vite_ and includes the _threejs_ package
- Backend uses _prisma_ to transfer data from a postgres container to the frontend, with validation logic

## Backlog

- DEVOPS - Create a github pipeline that automatically builds the public docker image whenever someone pushes to main
- TESTING - Unit testing of backend with a focus on descriptors and prisma
- FEATURE - Change so existing descriptors are loaded from database first, then say 7 more are randomly generated rather than pulling 10 new ones each time
- FEATURE - An admin panel that allows adding new data from a secure section of the client
- FEATURE - Cleanup the look of a blank database so someone can recreate from scratch
