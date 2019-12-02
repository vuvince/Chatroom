# vvu9

If changes are made to frontend, must recombile the production build:

`npm run build`

If changes are made to backend (index.js), all that needs to be done is file needs to be saved.

#h2 To run:
`$ cd OS-Project/Project/src/server`
`$ node index`

Done.

WHEN PULLING:
`npm install` in same folder as package.json

`npm run build` in same folder

`in dist folder, create index.html and paste following:`
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

