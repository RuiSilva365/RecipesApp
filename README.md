# RecipesApp

RecipesApp is a web application designed to make cooking easier by allowing users to browse, create, and manage recipes. This project uses Ionic for the frontend and Node.js with Express for the backend.

## Features

- **User authentication** (login and registration)
- **Role-based access control** (admin and user)
- **Create, read, update, and delete (CRUD)** operations for recipes
- **Responsive design**

## Technologies Used

- **Frontend**: [Ionic](https://ionicframework.com/), [Angular](https://angular.io/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/TP_PROJ2.git
   cd TP_PROJ2
    ```
2. Set up the backend:
   ```sh
   cd my-app-server
   npm install
    ```   
3. Set up the frontend:
   ```sh
   cd ../RecipesApp
   npm install
    ```   
4. Create a '.env' file in the my-app-server directory with the following content:
   ```sh
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=recipes_db
   JWT_SECRET=your_jwt_secret
    ```   
5.Initialize the MySQL database:
   Create the database and tables as specified in the server.js file or run the SQL script provided.

### Running
1. Start the backend server:
   ```sh
   cd my-app-server
   node src/backend/server.js
    ```
2. Start the frontend server:
   ```sh
   cd ../RecipesApp
   ionic serve
    ```
3.Open your browser and navigate to http://localhost:8100 to access the application.

## Usage
### Admin Features
Login as an admin to create, update, or delete recipes.
### User Features
Register and login to browse and view recipes.
Users can save their favorite recipes (feature in progress).

## Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Thanks to all the contributors and the open-source community.
Special thanks to Ionic and Angular for providing great tools for building web applications.
