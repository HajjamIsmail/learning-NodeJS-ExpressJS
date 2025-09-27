# Complete Documentation – Backend with Node.js, Express, and MongoDB

This documentation explains a **backend project** built with **Node.js**, **Express.js**, **MongoDB (via Mongoose)**, and a secure authentication system using **JWT**.
It covers both **practical implementation** and **theoretical concepts** to ensure a clear understanding.

---

## 1. Installation and Setup

### 1.1 Install Node.js and npm

* **Node.js** is a JavaScript runtime that allows you to run JS outside the browser, on the server.
* The installation also provides **npm (Node Package Manager)**, used for installing and managing dependencies.

👉 Download from [nodejs.org](https://nodejs.org).

### 1.2 Clone the Frontend to Test the API

To make testing easier, we use the frontend provided by **OpenClassrooms**.

```bash
git clone https://github.com/OpenClassrooms-Student-Center/go-fullstack-v3-fr.git frontend
cd frontend
npm install
npm run start
```

This frontend acts as a visual interface to consume the backend APIs.

### 1.3 Initialize the Backend

* Create a folder `backend`.
* Initialize the project:

  ```bash
  npm init
  ```
* Install dependencies:

  ```bash
  npm install express mongoose body-parser bcrypt jsonwebtoken
  npm install --save-dev nodemon
  ```

👉 **Express** for the server, **Mongoose** for the database, **bcrypt** for password hashing, and **jsonwebtoken** for authentication.

---

## 2. Node.js and Express.js

### Node.js

* **Definition**: A JavaScript runtime environment that runs outside the browser.
* **Use cases**: Business logic, file system operations, APIs, database connections.
* **Feature**: Asynchronous, event-driven architecture (event loop).

### Express.js

* **Definition**: A lightweight framework built on top of Node.js.
* **Advantages**:

  * Simplifies route handling.
  * Introduces the concept of **middleware**.
  * Makes building **REST APIs** fast and clean.

👉 In practice, Express is the most common way to structure a Node.js server.

---

## 3. Connecting to MongoDB with Mongoose

### Theory

* **MongoDB**: A NoSQL database based on JSON-like documents.
* **Mongoose**: An ODM (Object Data Modeling) library that connects MongoDB and Node.js.
* **Advantages**:

  * Defines **schemas** for collections.
  * Provides easy CRUD operations (`find`, `save`, `updateOne`, etc.).

### Example (`app.js`)

```js
mongoose.connect('mongodb+srv://<user>:<password>@cluster0.mongodb.net/...',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(() => console.log('MongoDB connection failed!'));
```

👉 This connects the backend to a cloud MongoDB cluster.

---

## 4. Global Middleware and CORS

### Theory

* **Middleware** = functions that process requests and responses before reaching the final route.
* Common uses: authentication, parsing, logging, security.
* **CORS (Cross-Origin Resource Sharing)**: Allows (or restricts) requests between different domains (e.g., frontend `localhost:4200` and backend `localhost:3000`).

### Example

```js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
```

👉 This allows the frontend to communicate with the backend without CORS issues.

---

## 5. Routing

### Theory

* **Routing** links an HTTP method (GET, POST, PUT, DELETE) and a URL to a specific action.
* In Express, routes are organized in **separate files** and imported into `app.js`.

### Example – `routes/stuff.js`

```js
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
```

👉 Each request to `/api/stuff/...` is mapped to a controller function.
The `auth` middleware ensures only authenticated users can access these routes.

---

## 6. Controllers (Business Logic)

### Theory

* **Controllers** contain the business logic executed when a route is called.
* Separating **routes** (request mapping) and **controllers** (logic) makes code more maintainable.

### Example – Stuff

`controllers/stuff.js`:

* **createThing** → add a new item to the database.
* **getOneThing** → fetch an item by ID.
* **modifyThing** → update an existing item.
* **deleteThing** → remove an item.
* **getAllStuff** → return all items.

👉 This is a full **CRUD implementation** (Create, Read, Update, Delete).

### Example – User

`controllers/user.js`:

* **signup**:

  * Hash password with **bcrypt**.
  * Save the user to the database.
* **login**:

  * Verify if the user exists.
  * Compare the hashed password.
  * Generate a **JWT token** (valid for 24h).

---

## 7. Authentication and Security Middleware

### Theory

* **bcrypt**: Securely hashes passwords so they are not stored in plain text.
* **JWT (JSON Web Token)**:

  * Generates a signed token on login.
  * Stores the user ID in the payload.
  * Sent with each request via the `Authorization` header.
  * Verified by the `auth` middleware.

👉 Advantage: Stateless authentication (no session storage needed), scalable and secure.

### Example – Auth Middleware

```js
const token = req.headers.authorization.split(' ')[1];
const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
req.auth = { userId: decodedToken.userId };
```

* Validates the token.
* Attaches `req.auth.userId` to the request.
* Rejects invalid tokens with `401 Unauthorized`.

---

## 8. Development Tools

### Nodemon

* Automatically restarts the server when files change.
* Install:

  ```bash
  npm install -g nodemon
  ```
* Run:

  ```bash
  nodemon server
  ```

👉 Greatly speeds up the development workflow.

---

## ✅ Key Concepts Recap

* **Node.js** → JavaScript runtime on the server.
* **Express.js** → Framework for building REST APIs.
* **Middleware** → Functions that process requests/responses (CORS, auth, parsing).
* **Routing** → Maps URLs and HTTP methods to actions.
* **Mongoose** → ODM to interact with MongoDB.
* **bcrypt** → Hashing passwords.
* **JWT** → Stateless and secure authentication.
* **Nodemon** → Development helper.
* **MVC Separation (Routes / Controllers / Models)** → Clean and maintainable architecture.

With this structure, the backend is **robust, secure, and scalable**, ready to support a **full stack application** with frontend, backend, and database.
