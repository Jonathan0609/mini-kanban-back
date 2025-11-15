## Setup do projeto

```bash
# Comando para rodar ao clonar o projeto
$ yarn
```

## Compilar e rodar o projeto

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```


## Env
```bash
PORT="3333"
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco?schema=public"
```

## Docker
```bash
# Rodar e criar o banco de dados no docker
$ docker-compose up -d

```

## Prisma
```bash

# Schema das tabelas
> prisma/schema.prisma

# Subir as tabelas
$ yarn prisma migrate dev

# Visualizar o banco
$ yarn prisma studio
```

## Swagger
```bash
# Visualizar o swagger
# Rodar no navegador o localhost:PORT/docs

```