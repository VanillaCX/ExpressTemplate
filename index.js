require('dotenv').config();

const express = require("express");
const helmet = require("helmet");

// Entry point routes
const publicRoute = require("./routes/public");
const authorisedRoute = require("./routes/authorised");

// Set port the app listens to
const port = process.env.EXPRESS_SERVER_PORT || 3000;

// Create app
const app = express();

// Set Helmet usage for security
app.use(helmet());

// Remove fingerprinting of the Server Software
app.disable('x-powered-by');

// Set EJS as templating engine  
app.set('view engine', 'ejs');  

// Enables static access to filesystem
app.use('/public', express.static('public'));

// Middleware for all requests
app.use((req, res, next) => {
    console.log(`Request at ${Date.now()}`);

    next();
})

// Setup entry point routing
app.use("/me", authorisedRoute)
app.use("/", publicRoute)

// Fallback for un-matched requests
app.use((req, res) => {
    console.log(`App (404)\nRequest Time:${Date.now()}`)

    res.status(404).render("status/404", {message: "Sorry, dude !!"})
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));