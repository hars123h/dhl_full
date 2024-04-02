const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
require("./db/conn")


const path = require("path");

//Routes

const authRoutes = require("./routes/auth");


//Environment Variables
env.config();

// MiddleWares
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/api', authRoutes);


if (process.env.NODE_ENV == "production") {
    const root = require("path").join(__dirname, "client", "build");
    app.use(express.static(root));
    console.log(root);
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
}

const port = process.env.PORT || 8000
app.listen(port, (req, res) => {
    console.log(`server is running on 8000`);
})

