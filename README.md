# DogLog

This project is intended to help shelters organize information about their dogs in an effort to increase pet adoption and interest in adopting from shelters.

## Get started locally

### Frontend

```
cd frontend
yarn install

```

### Backend

First, copy the `server/.env.template` file to `server/.env`

```
cp server/.env.template server/.env`
```

Then edit the `server/.env` file so it has the right configuration values for your local environment

```
cd server
npm install
node server.js
```

## Seeding Data

**Warning - this operation can wipe your whole data set**

To seed the dataset with a bunch of fake shelters, volunteers, animals and volunteer reports, you can make an HTTP request to the `/api/seed_data` URL. 

This call will populate data, but can optionally reset the whole set of collections if you pass `?reset=1` to the URL

Populate data (no reset)
```
GET http://localhost:3001/api/seed_data
```

Populate data (empty collections before populating)
```
GET http://localhost:3001/api/seed_data?reset=1
```

The seeder data code is located in `./test_data/seeder.js` 

**Note that when going to production, the route for this should be disabled or password protected**

