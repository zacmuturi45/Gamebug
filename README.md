# 🐞 GameBug

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../GameGo/LICENSE.txt)
[![Python Version](https://img.shields.io/badge/python-3.9.7-blue.svg)](https://www.python.org/)
[![Flask Version](https://img.shields.io/badge/flask-3.0.3-lightgrey.svg)](https://flask.palletsprojects.com/)
[![Next.js Version](https://img.shields.io/badge/next.js-14.2.3-black.svg)](https://nextjs.org/)


Gamebug is a sleek, minimalist web application inspired by rawg.io, designed to provide users with a streamlined way to explore and discover video games. With a focus on clean UI and intuitive navigation, Gamebug brings together essential features for gaming enthusiasts, offering an easy-to-use interface to search, filter, and track games across various platforms.

## 📚 Table of Contents

- [Website](#website)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## 🚀 Website

[Live Site](https://game-go-xi.vercel.app/)

**Screenshots**

![Home Page](frontend/public/images/gb1.png)

*Home page.*

![Feature Page](frontend/public/images/gb11.png)

*Search for games.*

![Single Game Page](frontend/public/images/gb2.png)

*Get game details*

![Reviews Game Page](frontend/public/images/gb4.png)

*Game Reviews*

![User Page](frontend/public/images/gb10.png)

*Check user details*

![Single Game Page](frontend/public/images/gb2.png)

*Secure login and signup*


## ✨ Features

- **User Authentication:** Secure login and registration using JWT.
- **Real-time Updates:** Live data updates using WebSockets.
- **Responsive Design:** Fully responsive and optimized for all devices.
- **Interactive UI:** Smooth and intuitive user interactions.
- **Robust GraphQL backend:** Seamless integration with custom Flask, GraphQL backend.

## 🛠 Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [SCSS](https://sass-lang.com/) 
  - [Gulp](https://gulpjs.com/)

- **Backend:**
  - [Flask](https://flask.palletsprojects.com/)
  - [GraphQL](https://graphql.org/)
  - [PostgreSQL](https://www.postgresql.org/) 
  - [Alembic](https://alembic.sqlalchemy.org/) 

- **Deployment:**
  - [Vercel](https://vercel.com/) for frontend deployment
  - [ngrok](https://ngrok.com/) for self-hosting

## 📦 Installation

**Prerequisites:**

- [Python](https://www.python.org/) (v3.10 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
  - [PostgreSQL](https://www.postgresql.org/) database

**Clone the Repository**

```bash
git clone git@github.com:zacmuturi45/Gamebug.git
cd GameBug
```


## Navigate to the backend and set up a virtual environment:

```bash
cd backend
python3 -m venv env
source env/bin/activate  # On Windows, use `env\Scripts\activate`
```

## Install Dependencies:

```bash
pip install -r requirements.txt
```

## Set Up PostgreSQL
**If you don't have PostgreSQL installed, follow the instructions below:**

```bash
sudo apt-get install postgresql postgresql-contrib
```

**Login to Postgresql**

```bash
sudo -u postgres psql
```
**Create the database and user:**

```sql
CREATE DATABASE gamebugdb;
CREATE USER 'your-user-name' WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE gamebugdb TO 'your-user-name';
```
**Exit PostgreSQL:**

```sql
\q
```

**To log in to a PostgreSQL session in your terminal with password authentication:**
```bash
psql -U your-user-name -d gamebugdb -h localhost -W
```

**Create a .env file in the backend directory with the following environment variables:**
```
FLASK_ENV=development
DATABASE_URL=postgresql://your-user-name:your-password@localhost/gamebugdb
JWT_SECRET_KEY=your-secret-key
```

**Apply Migrations, seed the database and Start the Backend**

```bash
flask db upgrade head
python3 src/seed.py
```

**Start the backend server:**

```bash
python3 app.py
```
## Frontend
📖 Usage

```bash
cd frontend
npm install
npm run dev
```

**Then, navigate to http://localhost:3000 in your browser to view the application.**

## 🤝 Contributing
Contributions are welcome! Feel free to open a Pull Request or submit an issue on GitHub.

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact
Name: Zac Muturi
Email: zacmuturi45@gmail.com
GitHub: zacmuturi45

## 🌟 Acknowledgements
Thanks to the contributors of the various open-source libraries used in this project.
Special thanks to rawg.io for the inspiration behind Gamebug.
