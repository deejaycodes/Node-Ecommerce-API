const express = require("express");

const path = require("path");
const cors = require("cors");

const helpers = require("./config/helpers");
const app = express();
require("./config/db");
require("dotenv").config();




// create blank folder named "uploads" for images uploads
helpers.makeFolder(path.resolve(__dirname, "uploads"));

const port = process.env.PORT || 4000;


// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));
app.use("/api/order", require("./routes/order"));

// Serve static assets if app in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("public/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
  });
}

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
