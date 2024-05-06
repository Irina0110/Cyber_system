# Cyber system: BACKEND

URL: https://github.com/Irina0110/Cyber_system/tree/main/backend

---

## About

Бэкенд проекта "Система учета тренировок и статистики для команды по киберспорту"

Backend of the project "Training and statistics recording system for an eSports team"

---

## Built With

[![Nest][Nest]][Nest-url]
[![PostgreSQL][Postgres]][Postgres-url]
[![TypeScript][Typescript.js]][Typescript-url]
[![Prisma][Prisma]][Prisma-url]

---

## Installation

1. Выполните `git clone` репозитория
   ```sh
   git clone https://github.com/Irina0110/Cyber_system/tree/main/backend
   ```
2. Установите зависимости
    ```sh
   npm install
    ```

3. Создайте файл .env в корне `<project>/backend/.env` и добавьте параметры
   ```js
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"

   GENERATE_OUTPUT=generated
   PORT=

   EMAIL='' //Email для рассылки
   EMAIL_PASS='' //Пароль от почты для внешнего приложение
   EMAIL_NAME='' //Имя отправителя

   TOKEN_EXPIRES_IN=3600000 // Срок действия токена
   JWT_SECRET='' 
   ```
   
4. Инициалируйте Prisma 
    ```sh
   npx prisma migrate dev  
   npx prisma generate  
    ```

5. Запустите проект
    ```sh
   npm run start
    ```

---

1. Clone the repo
   ```sh
   git clone https://github.com/Irina0110/Cyber_system/tree/main/backend
   ```

2. Install NPM packages
    ```sh
   npm install
    ```

3. Create file .env in `<project>/backend/.env` and add parameters
   ```js
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"

   GENERATE_OUTPUT=generated
   PORT=

   EMAIL='' //Email
   EMAIL_PASS='' //Password
   EMAIL_NAME='' //Name

   TOKEN_EXPIRES_IN=3600000
   JWT_SECRET='' 
   ```

4. Initialize Prisma
    ```sh
   npx prisma migrate dev  
   npx prisma generate  
    ```

5. Run the project
    ```sh
   npm run start
    ```

---

[Nest]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white

[Nest-url]: https://docs.nestjs.com/

[Postgres]:   https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white

[Postgres-url]: https://www.postgresql.org/

[Typescript.js]:    https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white

[Typescript-url]:https://www.typescriptlang.org/

[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white

[Prisma-url]: https://www.prisma.io/
