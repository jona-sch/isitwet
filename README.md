# isitwet

Website/app to check if your project is wet.

You can:
- add new locations using exact coordinates or the map.
- see all locations you added (list or map).
- see weather for each location: 2 previous days, current day and next day
  (table overview and detailed view available).

## Deployment

Easily deployable using docker-compose.

First package the backend:

```
cd isitwet-backend
mvn clean package
```

Create some self-signed certificates:

```
cd /etc/certs/isitwet
openssl req -newkey rsa:4096  -x509  -sha512  -days 365 -nodes -out certificate.pem -keyout privatekey.pem
```

Then run docker-compose. This commands also builds the docker images:

```
docker-compose up --build
```

## Authentication

Authentication and autorization is offered through Auth0. 

First thing you need is an Auth0 account and single-page application configured 
with correct callback URL, logout URL and allowed web origins.

### For development
You will need to create a `.env` file in `isitwet-app` with contents:
```
REACT_APP_API_SERVER_URL=http://localhost:8080
REACT_APP_AUTH0_DOMAIN=xxx.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=xxx
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback
```

### For deployment
You will need to fill environment vars in the docker-compose file:
```
- REACT_APP_AUTH0_DOMAIN=xxx.eu.auth0.com
- REACT_APP_AUTH0_CLIENT_ID=xxx
```

## Dev

### Backend

Based on SpringBoot and an H2 database.

To run the backend in dev mode on port 8080:

```bash
cd isitwet-backend
mvn spring-boot:run
```

### Frontend

Based on ReactJS.

To run the app in dev mode on port 3000:

```bash
cd isitwet-app
npm start
```

And simply open `localhost:3000` in your favorite browser (Firefox).