ОНИТ: Лабораторная работа 1
- 

### Порядок выполнения лабораторной работы: 

1. Установка node.js с сайта https://nodejs.org/en/
2. Установка пакетов с помощью NPM:
    * Открыть консоль и выполнить команду `npm install` в директориях **client** и в **server**
    * Установить менеджер процессов pm2 командой `npm install pm2 -g`
3. В папке server создать файла с названием `.env` с следующим содержимым:
    ```dotenv
    DB_HOST="<Хост сервера mongodb>"
    DB_USER="<Логин для доступа к базе данных>"
    DB_PASSWORD="<Пароль для доступа к базе данных>"
    DB_NAME="<Название вашей базы данных в виде Фамилия-НомерВСписке>"
    JWT_TOKEN_SECRET="VERYSECRET"
    SECRET_KEY="VERYSECRET"
    ```
    Доступы к базе данных необходимо спросить у преподавателя.
 4. Запуск backend-сервера с помощью команды `pm2 start ecosystem.config.js` в директории **server**
 5. Просмотр логов успешного запуска сервера с помощью команды `pm2 logs 0`, при успешном подключении вы получите лог:
     ```
     Example app listening on port  1377
     ```
 6. Запуск клиентского сервера с помощью команды `npm start` внутри директории ***client***
 7. Для получения оценки за лабораторную работу необходимо выполнить следующие задачи
    * Запрограммировать регистрацию (данные о пароле должны хранится в виде хэша)
    * Запрограммировать вход в приложение
    * Оба экрана после запроса на сервер должны вести на экран с информацией о пользователе
    * Стилизовать экраны хоть немного, неважно насколько красиво, главное чтобы студент разобрался в процессе стилизации