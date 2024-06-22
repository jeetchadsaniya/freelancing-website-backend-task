const express = require("express");
const cors = require("cors");
const {connectDb} = require("./db/db-connection")
require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const tagRoutes = require("./routes/tag-routes");
const projectRoutes = require("./routes/project-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tag", tagRoutes);
app.use("/api/v1/project", projectRoutes);

(async () => {
    const isDbConnnect = await connectDb();
    if (isDbConnnect) {
        app.listen(process.env.PORT, () => {
            console.log("Server listening at port 5000");
        })
    }
})()
