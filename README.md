# Boilerplate

This is a simple boilerplate designed to serve as robust template for quickly starting development on a [Typescript](https://www.typescriptlang.org) based [MERN](https://www.mongodb.com/mern-stack) web application.

## Features

- Session based authentication with [Passport](https://www.passportjs.org)
- Emailing for account verification and resetting password with [SendGrid](https://sendgrid.com)
- Admin functionality for viewing/deleting/promoting other users
- Clean authentication pages built with [Material UI](https://mui.com)
- In memory database testing with [Jest](https://jestjs.io) and [Supertest](https://www.npmjs.com/package/supertest)
- [AirBnb Typescript styling](https://github.com/airbnb/javascript) with [Prettier](https://prettier.io) and [ESLint](https://eslint.org)
- [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged) for checking linting on commits
- [GitHub Actions](https://docs.github.com/en/actions) for ensuring linting + tests pass on pushes

## Setup

### Required tools

These are neccessary to build and run the project at full functionality

- Install [Yarn Package Manager](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install [NodeJS](https://nodejs.org/en/download/)

### Recommended tools

To take full advantage of the linting/formatting, recommend adding the [Prettier](https://prettier.io) and [ESLint](https://eslint.org) VSCode extensions and configuring them as shown [here](https://levelup.gitconnected.com/setting-up-eslint-with-prettier-typescript-and-visual-studio-code-d113bbec9857#:~:text=Install%20the%20following%20Visual%20Studio%20Code%20extensions) for code highlighting and formatting on save. See [here](https://blog.logrocket.com/using-prettier-eslint-automate-formatting-fixing-javascript/#differences-between-eslint-prettier) for the differences between the two tools and how they work together.

### MongoDB

The boilerplate uses [MongoDB](https://www.mongodb.com) as the database to store information for authentication. To have this available for use, do the following
- Create a [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register)
- Create a [database deployment](https://www.mongodb.com/docs/atlas/create-connect-deployments/)
- Get the database connection URI

Recommend downloading [MongoDB Compass](https://www.mongodb.com/docs/compass/current/) for easy viewing and management of data.

### SendGrid

The boilerplate uses [SendGrid](https://sendgrid.com) to send emails to users in order to verify their account, and also to reset their passwords. To have this available for use, do the following
- Create a SendGrid Account
- Register a [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity) (Single Sender recommended for most)
- Create an [API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key)

### Environment Variables

Create a file named `.env.` in the root of the `server` folder and add the following variables with the appropriate values.

```
ATLAS_URI=mongodb-connection-uri-from-above
COOKIE_SECRET=any-string
SENDGRID_API_KEY=sendgrid-api-key-from-above
SENDGRID_EMAIL_ADDRESSS=sendgrid-sender-identity-email-from-above
```

## Usage

NOTE: Currently, this project is best supported by running CLI commands from a bash/zsh environment. If using Windows, this can be achieved by following what's done [here](https://stackoverflow.com/questions/42606837/how-do-i-use-bash-on-windows-from-the-visual-studio-code-integrated-terminal).

### Installing dependencies 
From the root folder, run the following to configure the project and its dependencies

```
$ yarn setup
```

If there is any need to reset the dependencies, simply run the following series of commands

```
$ yarn clean
$ yarn setup
```

### Running the project 

To run the project, use the following commands from the root folder

```
# run both server and client
$ yarn dev
# run server only
$ yarn server
# run client only
$ yarn client
```

### Running tests

To run all the tests in the project, run the following from the root folder

```
$ yarn test
```

### Running lintint/formatting

To check for linting issues from ESLint and fix what's possible, from the root folder run the following

```
$ yarn lint
```

To format the code appropriately with Prettier (don't need this if format on save was setup in VSCode), from the root folder run the following
```
$ yarn format
```
## Common Problems

Fill in with problem scenario + solution as they arise
