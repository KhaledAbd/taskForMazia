# Asara

<p align="center">
  Mazayia Application
</p>  

&nbsp;

<p align="center">
  <img width="320" height="300" src="https://media-exp1.licdn.com/dms/image/C4D0BAQH-Gtjg9u_EDA/company-logo_200_200/0/1641869122106?e=1651708800&v=beta&t=9shi_K0hAO1NcFa-SJldWxRX2rpIN4B3kqM8M7PfAF0">
</p>

&nbsp;
> Before you use this app, it must go to AsaraV2 branch.
&nbsp;

# Developers

-[ Khaled Mohammed Elshoky -Full-Stack-](https://github.com/KhaledAbd/) Full-Stack Developer- Angular & Dot Net Core FrameWork.

&nbsp;
&nbsp;

> What problem does it solve?
We sought to solve much of problems, likes:
- Inventory of month and day.
- Organizing the movement of withdrawals and deposits in warehouses.
- Organizing the buying and selling movement of the shop.
- Facilitate easy access to information for each category.
- AND MORE AND MORE!

&nbsp;

> What did we learn from this project?
- We are learning a lot of things through this great app, such as:
&nbsp;
1. How to design precisely.
&nbsp;
2. How to significantly speed up the operations of the program.
&nbsp;
3. How the design is responsive to the user's ability, whether he or she uses a computer or not.
&nbsp;
4. Strive to make an application that is easy for anyone to use.
&nbsp;
5. We also learned some technologies such as:
    - Dealing with github.
    - Dealing with the global platform [Angular](https://angular.io/) in a powerful and effective way.
    - Dealing with databases and the basics of special protocols.

&nbsp;

> What is the language of the app?
- This app was built in arabic language.

&nbsp;

## Description
Asara is a shop management web application: 
- This application is cross-platform. So, you can run it in windows or linux or mac.. etc.

&nbsp;

## Features Of App
- ✨ Use for selling and buying and record all opertion of a shop.
- ✨ Has a poweful Authorization & Authentication.
- ✨ Has inventory & record expenses and extra expenses and installments.

&nbsp;

> Recording data from the purchase and sale invoice and the invoices can be retrieved, and you can use the installment system and record warehouse outputs and their movement.

&nbsp;

## Tech

Asara uses a number of open source projects and frameworks to work properly:

- [AngularJS](https://angularjs.org/) - HTML & CSS enhanced for web apps!
- [VS Code Editor](https://code.visualstudio.com/) - awesome web-based text editor.
- [Twitter Bootstrap](https://getbootstrap.com/) - great UI boilerplate for modern web apps.
- [Npm](https://www.npmjs.com/) - install modules.
- [Dot Net core FrameWork](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0) - In Back-End.
- [MSSQL](https://www.mssql.com/) - DataBase Management System.
- [WorkBanch](https://www.mysql.com/products/workbench/) - Data Base Management tool.
- [Post Man](https://www.postman.com/) - For testing APIs in app.
- [Git](https://git-scm.com/).

&nbsp;

## Installation

Asara requires [npm](https://www.npmjs.com) 6+ to run.

Install the dependencies and devDependencies and start the Angular.


```sh
cd Asara-App
npm install #for install angular module
ng serve ## http:localhost:4200\item
##### run Asara.API web Restful Sevice
cd ../Asara.Api
dotnet restore   ####  for restore library files
dotnet ef database drop ### if you want remove data 
dotnet ef database migrations add m12m
dotnet watch run ## the data will seed automaticaly

### http:localhost:5000/item
```

For production environments:

```sh
ng build --prod ----optimization=fasle  
####for build default path ../Asara.Api/wwwroot you can change from angular.js
cd ../Asara.Api
dotnet deploy ### you can deploy it in IIs for windows & Apache for Linux
```
```

#### Link for assum you run correctly
```sh
127.0.0.1:5001
```

&nbsp;
