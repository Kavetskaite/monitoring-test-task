# monitoring-test-task
## Run instructions
### Backend Project

I use **Node v21.7.3**

Run

```
cd server
npm install
```

Set up database:

1. Set up MySQL 
    - Manually:
        - [Install MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/).
        - Log in to the MySQL server using a user account

        ```
        mysql -u root -p
        ```
        - Create new Database
        
        ```
        CREATE DATABASE [YOUR_DATABASE_NAME];
        ```
    - Or if you have a customized **Docker**
        - Run 
        ```
        docker run --name=[YOUR_DOCKER_CONTAINER_NAME] --restart unless-stopped -p [YOUR_HOST]:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_USER=[YOUR_USER_NAME] -e MYSQL_PASSWORD=[YOUR_PASSWORD] -e MYSQL_DATABASE=[YOUR_DATABASE_NAME] -d mysql/mysql-server:8.0 mysqld --default-authentication-plugin=mysql_native_password
        ```

Copy **.env.example** in **.env** and set:

* **PORT** - By default it is **4000**, but you can change it
* **BASE_API_URL** - Base API Url for taking screenshots, now it depends on your port, so if you change your port, change this variable as well
* **SCREENSHOTS_DIRECTORY** - The name of the directory where we will store our screenshots. By default, it is **"screenshots "**, but you can change it if you wish.
* **APP_URL** - Link to the application we want to monitor. You can change it.
    Set enviroment variable to connect to the database:
* **DB_HOST**
* **DB_PORT**
* **DB_USERNAME**
* **DB_PASSWORD**
* **DB_DATABASE**
* **DB_SYNCHRONIZE** - Set this variable to **true** if you want to update the table automatically (Recommend to set true, at least for the first startup)
* **INTERVAL_IN_MINUTES** - Interval in minutes for cronjob to take screenshots. Default is **1** to speed up functionality testing.

Run
```npm start```

### Client Project

Run

```
cd client
npm install
```

Copy **.env.example** in **.env** and set 
* **REACT_APP_API_HOST** - equal to **BASE_API_URL** from server .env file

Run

```npm run start```

# Improvements

## 1. Deploy on server and use real cronjobs.
In the future, I would deploy this project to a server (for example, AWS EC2) and set up regular cronjobs that would run regardless of whether the server is running. 
For now, I'm using the **node-cron** library in the project, which only runs cronjobs if the server is running. I chose this solution to make it easier to set up and run the project.

## 2. Using Storage Service for screenshots.
I currently store all screenshots in the file system.
But later I would use **AWS S3** to save screenshots. Since we will have a large number of screenshots, it will be better and safer to store them using cloud services.

## 3. Using Docker to containerize an application. 
In order to avoid conflicts on different devices with different environments, it is better to create a docker container that will work the same on all devices regardless of the environment.

## 4. Testing.
In the future, I would add e2e test (for example, **Cypress**) or unit tests (for example, **Jest**) for testing basic functionality.