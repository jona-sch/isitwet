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

### Backend

You will need to update the `application.properties`:

```
auth0.domain=TO_SET
```

### Frontend

#### For development
You will need to create a `.env` file in `isitwet-app` with contents:
```
REACT_APP_API_SERVER_URL=http://localhost:8080
REACT_APP_AUTH0_DOMAIN=xxx.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=xxx
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback
REACT_APP_AUTH0_AUDIENCE=xxx
```

#### For deployment
Same with (before building Dockerfile):
```
REACT_APP_API_SERVER_URL=http://spring-boot-app:8080
REACT_APP_AUTH0_DOMAIN=xxx.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=xxx
REACT_APP_AUTH0_CALLBACK_URL=https://localhost:443/callback
REACT_APP_AUTH0_AUDIENCE=xxx
```

## Database

The database for the backend is a basic mysql Docker container with persistence on host file.
To launch it, simply run `docker-compose -f docker-compose-sql.yaml up`.

The `application.properties` needs to be tuned depending on dev/deploy:
- For dev: uncomment line `spring.datasource.url=jdbc:mysql://localhost:3306/isitwet_db`.
- For deployment: uncomment line `spring.datasource.url=jdbc:mysql://mysql:3306/isitwet_db`.

## Dev

### Backend

Based on SpringBoot and the provided mysql database container (see above).
In `application.properties`, uncomment line `spring.datasource.url=jdbc:mysql://localhost:3306/isitwet_db`.

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