# Employee Managemen System
## Description 
    This is a service based app. Multiple company can use the app.
    Features:
    There are 3 types of user System Admin,Admin,Genarel User
     >>System Admin :
            *Can send account opening invitation through mail for role(ex: system admin,admin,general user);
            *Can register company
            *Can view all company info and all the user
            *Can Edit all company info and all the user
     >>Admin :
            *Can send account opening invitation through mail for role(ex: admin,general user);
            *Can view  company info and all the user that he blong to.
            *Can Edit company info that he belong to and all the user info of that company.
     >> General user:
            *Can see company info that he belong to and his profile.
            *Can edit his own profile.    
## Technologies used to build the App
    DataBase : postgresql
    Backend: 
        framework: Nestjs
        Programming Language: Typescript

    Frontend:   
        framework: Reactjs,MUI
        Programming Language: Typescript 

## Implimented Features

    ### Database
    Database implimented as per the requirment

        DB_NAME: employee_mgt
        DB_TABLE: tempuser,user,company


    ### Backend
    All the features and apis are implimented in the backend as per requirment.

    >>List of the apis:

    [Signin, Has access: All user ]: 
    {GET, http://localhost:3001/signin }

    [Account invitation, Has access: System admin{email,companyName,role},Admin{email,role}]
    {POST,http://localhost:3001/invite }

    [Signup from the link and password that you got on your mail, Has access : All User ]
    {POST, http://localhost:3001/signup/:token}

    [View own profile as logged in user, Has Access:ALL user]
    {GET, http://localhost:3001/profile}

    [Eidt own profile as logged in user ,Has access: All user]
    {PATCH, http://localhost:3001/profile/edit}

    [View other user profile, Has Access: system admin,admin(company that he belong)]
    {GET, http://localhost:3001/profile/:id}

    [Eidt other user profile ,Has access: system admin,admin(company that he belong)]
    {PATCH, http://localhost:3001/profile/edit/:id}

    [View all user. Has access : system admin]
    {GET, http://localhost:3001/alluser}

    [Company registration, Has access : system admin]
    {POST,http://localhost:3001/companyreg }

    [All the Company info, Has Access: system admin]
    {GET, http://localhost:3001/allcompany }

    [View Company info by id, Has Access:system admin]
    {GET, http://localhost:3001/company/:id}

    [Edit company info,Has access: System admin]
    {PATCH, http://localhost:3001/company/:id}

    [View company info as logged in user ,Has access: all user]
    {GET, http://localhost:3001/company/view}

    [Eidt company info as logged in user ,Has access: System admin and admin]
    {PATCH, http://localhost:3001/company/edit}

    [Logout, Hass access: All user]
    {POST, http://localhost:3001/alluser}

## unimplimented Features

    ### Frontend

    Reason: Due to lack of time, I could not implement the frontend part as I am currently working in a job.

## How to run the code on your machine

   Setep : 1 
        
        install pgsql on your machine and change the code from src/config/orm.config.ts according to your credential
        
        database:'employee_mgt', //your databse name
        username:'postgres', //database user name
        password:'admin', //password of your database

    Step : 2

    on the terminal run the following command

        Install npm
        ```bash
        $ npm install
        ```
        ```bash
        development
        $ npm run start

        # watch mode
        $ npm run start:dev
        ```

    Step : 3

        As I am not implimented the fronend part please check all the api on postman or other api testing app

        For any queries email at : mustafiz.iub@gmail.com


....................................Happy Coding..........................................        

