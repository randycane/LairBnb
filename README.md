# LairBnb
# Welcome to LairBnb!

LairBnb is a clone of the popular AirBnb renting service. With us, you can host a property, rent at other properties, and provide reviews and stars based on your experiences. 

Live Link: https://airbnb-clone-lair.herokuapp.com/

## Technologies Used
### Frameworks, Libraries, Platform utilized

![image](https://user-images.githubusercontent.com/20654267/192156837-122333b5-1337-4630-abcd-e48f538c141d.png)
![image](https://user-images.githubusercontent.com/20654267/192156854-da992c42-d7fc-468a-ad02-65316be0d9c2.png)
![image](https://user-images.githubusercontent.com/20654267/192156876-64b1afdd-e93f-4f6b-a0ff-2d7e9b75258a.png)
![image](https://user-images.githubusercontent.com/20654267/192156881-268b4f35-02b2-4113-861b-c2ea54b6ff87.png)
![image](https://user-images.githubusercontent.com/20654267/192156890-ca8a0612-9350-4d10-88f7-cc09dd740865.png)
![image](https://user-images.githubusercontent.com/20654267/192156892-eddb0af2-29cc-46bf-9d6d-fc0ead32005b.png)
![image](https://user-images.githubusercontent.com/20654267/192156896-44718733-3b28-4f64-934a-78522df3a444.png)

### Database
![image](https://user-images.githubusercontent.com/20654267/192156956-e6ef56f2-5645-406a-8778-83baf75489a1.png)

### Hosting
![image](https://user-images.githubusercontent.com/20654267/192156972-28d4bd6a-7012-4d73-8bbd-105cfba12108.png)

## Site Preview
### Home Page
![Screen Shot 2022-09-25 at 11 52 02 PM](https://user-images.githubusercontent.com/92779080/192211656-db765c54-b034-41e2-bb57-0c2f15088279.png)


### Spot Details Page
![Screen Shot 2022-09-25 at 11 54 48 PM](https://user-images.githubusercontent.com/92779080/192212108-e571eeee-c6b8-43b7-9921-34fa98943aa1.png)


### Login Form Modal
![Screen Shot 2022-09-25 at 11 55 39 PM](https://user-images.githubusercontent.com/92779080/192212262-6726c7ed-ab0a-4e35-a6f7-74754cf80c8d.png)


### Signup Form Modal 
![Screen Shot 2022-09-25 at 11 56 03 PM](https://user-images.githubusercontent.com/92779080/192212337-1eec95bc-9f64-4385-aab2-d3ae6a6a818d.png)


### Create a Spot Page (Need to be logged in)
![Screen Shot 2022-09-25 at 11 57 15 PM](https://user-images.githubusercontent.com/92779080/192212531-dd5e2ef8-0316-4cf8-a575-2fae5aea6675.png)


## How to set up to run on your machine locally
* Clone/download the repo

* Open two terminals, in one <code>cd</code> into the backend and the other <code>cd</code> into the frontend

* In the backend run <code>npm install</code> and run <code>npm start</code>

* In the frontend run <code>npm install</code> and run <code>npm start</code>

### Environment
  ```
  PORT=8000
  DB_FILE=db/dev.db
  JWT_SECRET=«generate_strong_secret_here»
  JWT_EXPIRES_IN=604800
  ```

### Database Setup
Run these commands in the Backend folder to seed data locally.
  ```
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
  ```
## Contact Me
- If you have any questions at all, please email me at <code>randychang886@gmail.com</code>
