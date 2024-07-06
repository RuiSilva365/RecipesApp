RecipesApp
RecipesApp is a web application designed to make cooking easier by allowing users to browse, create, and manage recipes. This project uses Ionic for the frontend and Node.js with Express for the backend.

Features
User authentication (login and registration)
Role-based access control (admin and user)
Create, read, update, and delete (CRUD) operations for recipes
Responsive design
Technologies Used
Frontend: Ionic, Angular
Backend: Node.js, Express, MySQL
Authentication: JSON Web Tokens (JWT)
Getting Started
Prerequisites
Node.js
npm
MySQL
Installation
Clone the repository:

sh
Copiar código
git clone https://github.com/your-username/TP_PROJ2.git
cd TP_PROJ2
Set up the backend:

sh
Copiar código
cd my-app-server
npm install
Set up the frontend:

sh
Copiar código
cd ../RecipesApp
npm install
Create a .env file in the my-app-server directory with the following content:

sh
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=recipes_db
JWT_SECRET=your_jwt_secret
Initialize the MySQL database:

Create the database and tables as specified in the server.js file or run the SQL script provided.
Running the Application
Start the backend server:

sh
Copiar código
cd my-app-server
node src/backend/server.js
Start the frontend application:

sh
Copiar código
cd ../RecipesApp
ionic serve
Open your browser and navigate to http://localhost:8100 to access the application.

Usage
Admin Features
Login as an admin to create, update, or delete recipes.
User Features
Register and login to browse and view recipes.
Users can save their favorite recipes (feature in progress).
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Thanks to all the contributors and the open-source community.
Special thanks to Ionic and Angular for providing great tools for building web applications