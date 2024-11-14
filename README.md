# beaver-wedding
![Screenshot 2024-11-14 at 1 12 23 AM](https://github.com/user-attachments/assets/16f621fc-5059-40ad-93ff-b7f6937b62b3)


Instructions:
// postgreSQL database is created locally with the following code:
CREATE DATABASE wedding
WITH OWNER = emily

// create guests table:
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);

// create tasks table:
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(100),
    assigned_member INTEGER REFERENCES guests(id)
);


npm install beaver-wedding
nodemon

npm install guest-app
npm start

// must also update .env file with own database credentials 
// must provide own openAI apiKey 
