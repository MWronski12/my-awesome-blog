## NodeJS blog application using JWT for authentication

This is a simple project showcasing my ability to create fullstack web apps from scratch. Check it out yourself:

### [my-awesome-blog](https://ashy-mushroom-0e7700e10.2.azurestaticapps.net/)

It is hosted on azure free students plan and the app is put to sleep when not used, so it can take up to **30 seconds** to wake up. Sorry for that!

### How to start the app locally:

#### With docker:

- `git clone https://github.com/MWronski12/my-awesome-blog`
- `git clone cd my-awesome-blog`
- `docker-compose up`

Open http://localhost:5173 in your browser

#### With node:

- `git clone https://github.com/MWronski12/my-awesome-blog`
- `cd backend`
- `npm i`
- `npm run dev`
- Open second terminal in the project root directory
- `cd frontend`
- `npm i`
- `npm run dev`

### Tech stack:

- Express.js
- React
- Sequelize ORM
- JWT Tokens
- Mocha with Chai
- bcrypt.js
- Azure Web Apps
- Github actions

### Application DEMO:

- Login into already created admin account (password admin):

![1_login](https://user-images.githubusercontent.com/66621445/202031169-21821a0f-9184-4e99-a449-c18ead111921.png)

- See JWT detail information:

![2_admin_profile](https://user-images.githubusercontent.com/66621445/202031248-286cddab-f38b-4493-bf19-411a79ba6688.png)

- Create a post:

![3_create_post](https://user-images.githubusercontent.com/66621445/202031263-4b8c61a3-b0a7-4346-9e08-2b7030e78796.png)

- Register as user:

![4_registration](https://user-images.githubusercontent.com/66621445/202031286-fc7f94df-63ca-4782-8edb-894dcf2f1bbe.png)

- View posts list:

![5_post_list](https://user-images.githubusercontent.com/66621445/202031298-c2e8724d-d060-4dfb-bb85-a33ad5a7bea2.png)

- View post details and add comments:

![6_post_list](https://user-images.githubusercontent.com/66621445/202031308-f86e57b5-d368-4205-ba3b-65ef80c8dfb7.png)
