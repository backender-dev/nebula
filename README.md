<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Prerequisites

- Node.js >= 20.0.0
- Yarn package manager
- Docker

## Project setup for local use

1. Clone the repository:

```bash
$ git clone <repository-url>
```

2. Install depencies. Temporal is used to upload files. Each file has a separate workflow in the queue. Temporal ensures reliable execution of tasks in the background, which is especially useful for tasks with long execution times, such as uploading large files. When errors or failures occur, Temporal automatically manages the recovery of the process, which minimizes data loss and ensures system reliability. The Temporal system is easily scalable, which allows you to handle large volumes of data and requests, including multiple parallel file uploads.

```bash
$ yarn install
```

3. Create `.env` file. Example:

```bash
PORT=3001

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SSL=false

TEMPORAL_QUEUE=default
TEMPORAL_HOST=localhost:7233
```

Or run the command and set your own values:

```bash
$ cp .env.example .env
```

In the main module there is a validation of env parameters

4. Start the infrastructure using the command:

```bash
$ docker-compose up -d
```

5. In the root directory of project, set up your own `credentials.json` file with the credentials of your Google Drive API service account. Example:

```json
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----",
  "client_email": "nebula@iam.gserviceaccount.com",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": "googleapis.com"
```

## Compile and run the project

1. Dev mode

```bash
$ yarn start:dev
```

2. Prod mode

```bash
$ yarn start:prod
```

3. Ping endpoint

```
GET http://localhost:3001/api
```

Response:

```
✅ Server is up and running!!!
```

## API

1. The server runs on port `http://localhost:3001` by default.
2. Global prefix set to `/api`
3. Swagger documentation for endpoints is available at:

   - http://localhost:3001/swagger
   - http://localhost:3001/api/swagger

4. Temporal UI is available at:

   - http://localhost:8781/

5. Creating migrations:

```bash
$ NAME=first-migration yarn migration:create
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
