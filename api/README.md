Build the app:

`docker build -t api:dev .`

Run the app: 

`docker run -v ${PWD}:/api -v /api/node_modules -p 3002:3002 --rm api:dev`
