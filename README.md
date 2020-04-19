# Fastfeet

Esse repositorio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile)
que é avaliada para emissão do Certificado do Bootcamp GoStack.

## Server

create a .env using the .env.example as a template
this server requires postgresql and redis database to work

### Install

Using NPM:
> npm i

Using Yarn:
> yarn

### Migrating/Seed

Using NPM:
> npx sequelize db:migrate:all

> npm sequelize db:seed:all

Using Yarn:
> yarn sequelize db:migrate:all

> yarn sequelize db:seed:all

### Running
open two terminals, one to run the redis listener and another to run the server itself

Using NPM:
> npm run dev
> npm run queue

Using Yarn:
> yarn dev
> yarn queue

## Web

### Install

Using NPM:
> npm i

Using Yarn:
> yarn

### Running

Using NPM:
> npm run dev

Using Yarn:
> yarn dev

### Auth

this admin dashboard requires authentication, use:
email: admin@fastfeet.com
password: 123456

## Mobile

ONLY ANDROID

### Install

Using NPM:
> npm i

Using Yarn:
> yarn

### Running

Using NPM:
> npm run android

Using Yarn:
> yarn android

after installing: 

Using NPM:
> npm run start

Using Yarn:
> yarn start 

### Auth

this admin dashboard requires authentication, create a deliveryman on the admin dashboard and use the id to login
