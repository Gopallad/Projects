# Employee Management System

A full-stack Employee Management System built using **React 19, Spring Boot, and MySQL**. The application provides a simple interface to manage employee records with complete CRUD (Create, Read, Update, and Delete) functionality.

## 🚀 Features

- **View Employees:** Display all employee records in a structured table.
- **Search Employees:** Find employee records easily.
- **Add Employee:** Create new employee records.
- **Update Employee:** Edit existing employee details.
- **Delete Employee:** Remove employee records.
- **REST API Integration:** Connect the React frontend with the Spring Boot backend.
- **Database Management:** Store employee information in MySQL.
- **Data Validation:** Enforce unique email addresses at the database level.

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Bootstrap
- Axios
- JavaScript

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

### Database

- MySQL

### Tools

- Git
- GitHub
- Visual Studio Code
- Postman

## 📂 Project Structure

```text
FullStackProject/
├── ems-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── HeaderComponent.jsx
│   │   │   ├── FooterComponent.jsx
│   │   │   ├── ListEmployeeComponent.jsx
│   │   │   └── EmployeeComponent.jsx
│   │   ├── services/
│   │   │   └── EmployeeService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── ems-backend/
    ├── src/
    │   ├── main/
    │   │   ├── java/net/javaguides/ems/
    │   │   │   ├── controller/
    │   │   │   ├── dto/
    │   │   │   ├── entity/
    │   │   │   ├── exception/
    │   │   │   ├── mapper/
    │   │   │   ├── repository/
    │   │   │   └── service/
    │   │   └── resources/
    │   │       └── application.properties
    │   └── test/
    ├── pom.xml
    └── mvnw
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Java JDK (Java 25 for the current backend configuration)
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd FullStackProject
```

### 2. Configure the MySQL Database

Create the database in MySQL:

```sql
CREATE DATABASE ems;
```

Configure your database connection in `ems-backend/src/main/resources/application.properties`.
Update the database URL, username, and password according to your local MySQL configuration. Do not commit database credentials.

### 3. Run the Backend

Open a terminal and execute:

```bash
cd ems-backend
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

On macOS or Linux:

```bash
./mvnw spring-boot:run
```

The backend connects to the database and exposes the employee REST API at:

`http://localhost:8084/api/employees`

### 4. Run the Frontend

Open another terminal and execute:

```bash
cd ems-frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔗 REST API Endpoints

Base URL: `http://localhost:8084/api/employees`

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Retrieve all employees |
| GET | `/api/employees/{id}` | Retrieve an employee by ID |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/{id}` | Update an existing employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

## 🗄️ Employee Data Model

Each employee record contains:

- `id` — Unique employee identifier
- `firstName` — Employee's first name
- `lastName` — Employee's last name
- `email` — Unique email address

## 🏗️ Application Architecture

The application follows a layered backend architecture:

- **Controller Layer:** Handles HTTP requests and REST API responses.
- **Service Layer:** Contains employee management business logic.
- **Repository Layer:** Uses Spring Data JPA to interact with MySQL.
- **Entity Layer:** Represents employee records in the database.
- **DTO and Mapper:** Transfer and map employee data between application layers.
- **React Frontend:** Provides the user interface and communicates with the backend using Axios.

## 🎯 Project Objective

The objective of this project is to develop a full-stack web application that demonstrates practical knowledge of React, Java, Spring Boot, REST API development, database integration, and CRUD operations.

## 👨‍💻 Author

**Gopal Narayan Lad**

- GitHub: [Gopallad](https://github.com/Gopallad)
- LinkedIn: [Gopal Lad](https://linkedin.com/in/gopal-lad-8635342b8)

---

⭐ If you find this project useful, consider giving the repository a star.
