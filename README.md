# Node Starter Kit

This starter kit contains a basic express server ready for deploying on engineering infrastructure.  It has been prepared with a testing framework and code coverage reports.

***

## Prereqs
- Docker needs to be running wherever you try to run this

## Setup
- [Download a copy of the Repository](https://gitlab-app.eng.qops.net/profserv/node-starter/repository/archive.zip?ref=master)
- Run `make build`
- Update configs in `config` folder to match the project name and path
- Update `package.json` to match the project name. Also, add a `repository` field that links to your project's gitlab repository

## Linting
- Run `npm run lint` to get a linting report of all code in your `src` directory
- Run `npm run lint-fix` to fix all linting errors. Any errors that cannot be fixed will be reported to the console.
- Coding standards and styling for the project is based on [ESLint](http://eslint.org/docs/rules/) rules defined in `.eslintrc.json` file

## Testing
- Run `npm test` to compile and test.
- Check out `coverage/lcov-report/index.html` to view coverage report after running tests.

***

## Developing

### Makefile

> This project is set up with a [Makefile](Makefile). Please review it to become familiar with the commands that are available to you
> Run `make run-dev` to start the dev container
> Run `make run-prod` to start the prod container
> Go to `http://localhost:8080/apps/node-starter/healthcheck` to validate that things are set up and running
> Go to `http://localhost:8080/apps/node-starter/index.html` to validate that the public directory is hooked up

### Shrinkwrapping

> Run `npm shrinkwrap` to before each commit to lock node module versions.
> This ensures the versions of dependencies remain constant for all developers on the project and for the app in production.

### (mongop.js)[https://www.npmjs.com/package/mongop]

> Trever's own mongodb module. This module allows you to sustain a connection to MongoDB so you don't hammer our mongo servers.

***

## Notes

### PM2
[pm2](http://pm2.keymetrics.io/) is used to manage, monitor, and load balance the node instances inside your docker container

#### Monitor
1) Run a container using the corresponding `make` command
2) Run `make enter` to enter the container
3) run `pm2 monit` to see node process monitoring stats
> TODO ^^ more docs

#### Manage
TODO

#### Load Balance
TODO

#### Warm Reload
> if you look in [pm2-dev.json](pm2-dev.json) you will see that pm2 watches the `./src` directory.  
> When it detects a change it will restart the node processes that are running

### Logs

> Access logs are saved to `/var/log/access.log`
> Error logs are saved to `/var/log/error.log`
> pm2 logs are saved to `/var/log/.pm2/`. Read more about [pm2 logging](http://pm2.keymetrics.io/docs/usage/log-management/)

> Use the `server/lib/logger.js` for your logging needs. This is your bunyan singleton and will direct the correct log levels to the correct output spots
> TODO ^^ log rotate
