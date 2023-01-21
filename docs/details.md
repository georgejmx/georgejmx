# Details

Currently a nodejs backend which serves a frontend

- The frontend is built using _Vite_ and includes the _threejs_ package
- Backend uses _prisma_ to transfer data from a postgres container to the frontend, with validation logic. Built in `nodejs` with Typescript

## Backlog

- FIX - cleanup the story view to make clear they are comments not tags
- TESTING - Unit testing of backend with a focus on descriptors and prisma
- FEATURE - Change so existing descriptors are loaded from database first, then say 7 more are randomly generated rather than pulling 10 new ones each time
- FEATURE - Cleanup the look of a blank database so someone can recreate from scratch

Do a new `git tag` after such changes then stop active development
