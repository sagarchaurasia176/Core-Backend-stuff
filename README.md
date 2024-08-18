
# Backend-stuff
This is the Backend Project where you can see how the 
- How Login/signup authentication works
- JWT works,
- How Middleware works
- How media files are directly transferred to the cloud 
- How can you send the mail to anyone?



## Tech Stack

**server:** Node Js, Express Js,

**others package** Cloudinary, Nodemailer, 

**DataBase** MongoDB


## Installation

install all the packages
```bash
    npm i express , nodemon , mongoose , cloudinary,cookie-parser,dotenv,bcrypt ,express-fileupload,file-upload , jsonwebtoken,nodemailer
```

change directory first then move to Backend Folder and then type
```bash
    npm run dev
```


## Screenshots

## Cloud media server
![Screenshot 2024-08-14 120148](https://github.com/user-attachments/assets/33bc942b-aac3-4c2b-934e-799afe0c697b)

## Mail 
 ![Screenshot 2024-08-14 112337](https://github.com/user-attachments/assets/5d8e658f-e1b9-4a1a-b85a-29ee63c5eb2e)

## API Reference

- Open this link, and you are good to use make sure your server works well otherwise it gives you the error
- your mongod db IP is activated
- https://documenter.getpostman.com/view/33753637/2sA3s6EpXr
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file



```bash
  # .env.fole
PORT = 4000
DB_URL = 
SECRET_TOKEN = 

#Cloudinary-APi apply here 

Cloudinary_Api = 
Cloudinary_Secret = 
Cloudinary_Name =  


# //Node mailer setup here 

MAIL_HOST = smtp.gmail.com 
MAIL_USER = 
MAIL_PASS = 

#How to generate the mail password -
-----------------------------------------
- open your Google account 
- click to manage the account
- check-in left side there is one menu called security
- open it 
- Click on two-factor authentication once it is done
- Then type the app generated in  the search bar 
- once it is done your password is generated copy it
- paste it into MAIL_PASS


```
