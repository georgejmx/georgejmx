# Details

Personal web page

Currently a Typescript backend which serves a frontend and connects to a postgres container for state management

-   The frontend is built using _Vite_ and includes the _threejs_ package

    -   3D background :fireworks:
    -   Retro styles :vhs:
    -   Reading latest personal _(sfw)_ data
    -   Allows public comments on **Stories**
    -   Creating new personal data through a password protected admin panel

-   Backend uses _prisma_ to transfer data from a postgres container to the frontend, with validation logic

    -   HTML rendering to avoid the need of a bloated ui framework
    -   Automatic UI updates of latest personal and public data
    -   UI formatting depending on data
    -   Low code :relieved:
