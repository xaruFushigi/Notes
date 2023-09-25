const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();

app.use(express.json());
// urlencoded
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//cors
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "accessToken"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
const { db } = require("./database/models"); // goes to 'models' folder and creates table based on JS files (except for 'index.js' file which is sequelize JS file)
// ---------------- END OF MIDDLEWARES
const NotesRoute = require("./routes/NotesRoute.js");
app.use("/note", NotesRoute);
const FolderRoute = require("./routes/FolderRoute.js");
app.use("/folder", FolderRoute);
// ---------------- END OF ROUTES
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
