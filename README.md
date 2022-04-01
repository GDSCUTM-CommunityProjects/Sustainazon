<h1 align="center">
  <p align="center">Sustainazon</p>
  <p align="center" width="100%">
  <a href="https://sustainazon.tk/">
    <img src="/client/public/favicon.ico" width="200px" align="center">
  </a>
  </p>
  <h4 align="center">Sustainable Shopping: All in one place</h4>
  <p align="center" width="100%">
    <a href="https://sustainazon.tk"></a>
  </p>
</h1>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#installation">Installation</a> •
  <a href="#Running-the-app">Running the App</a>
</p>

## Introduction

Buy what you need at the click of a button, while knowing you're supporting small, environmentally-friendly businesses

- **Local means less pollution**

  > Shipping sends around 1 billion metric tons of carbon dioxide into the air each year

- **Purchase responsibly**

  > Learn how to minimize your carbon footprint

- **Support good causes**

  > 5% of every purchase is donated

## Installation

### Github

1. Download the repository

```
git clone https://github.com/GDSCUTM-CommunityProjects/Sustainazon
```

### Installation

1. Install the following requirements

- Yarn >= 2+
- Node >= 14.17.0

2. Install the dependencies for the client

```
cd client
yarn install
```

3. Install the dependencies for the server

```
cd server
yarn install
```

### Running the app

#### Client Setup

1. Setting up the client `.env` file
```
{
    REACT_APP_API_KEY="YOUR FIREBASE API KEY HERE"
    REACT_APP_AUTH_DOMAIN="YOUR FIREBASE AUTH DOMAIN"
}
```
2. Running the client 

```
yarn run start
```

#### Server Setup
1. Setting up the server `.env` file
```
{
    PORT=SERVER_PORT
    FRONTEND_URL=YOUR_FRONTEND_URL
    STORAGE_URL=FIRESTORE_STORAGE_URL
}
```

2. Setting up the server `serverAccountKey.json`

- Log into Firebase > Head to `Project Settings` > `Service Accounts` and click `Generate new private key` 

3. Running the server
 
```
yarn run start
```

The client and server will be listening and serving on port `3000` and `5000` respectively.
