# vvu9

If changes are made to frontend, must recombile the production build:

`npm run build`

If changes are made to backend (index.js), all that needs to be done is file needs to be saved.

#h2 To run:
`$ cd OS-Project/Project/src/server`
`$ node index`

Done.

WHEN PULLING GIT

1. `npm install` in same folder as package.json

2. Change sagas.jsx to the URL of either cloud9:3000 or localhost:3000

3. `npm run build` in same same folder as package.json

4. in dist folder, create index.html and paste below html

5. cd into /src/server and run node index

6. go to localhost:3000 or c9:3000

7. Enjoy:)

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <title>Facebewk Messenger</title>
  </head>

  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
