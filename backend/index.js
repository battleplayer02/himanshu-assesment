const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db.js");
const { addUser, findUser } = require("./controllers/userController");
const { insert, selectall, deletealert } = require("./controllers/alertsController");
const app = express();

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

//auth
app.post("/add", addUser,);
app.post("/signin", findUser);

//data
app.post("/insert", insert)
app.post("/selectall", selectall)
app.post("/delete", deletealert)

app.use(express.static(__dirname + 'public')); //Serves resources from public folder

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

