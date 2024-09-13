const http = require("http");
const express = require("express");

const app = express();

app.use("/api/", (req, res, next) => {
  console.log("Time of request", Date());
  next();
});

app.get("/api/", (req, res) => {
  console.log("Time of request", Date());
  res.send("Some informatin about a user");
});

const server = http.createServer(app);
const PORT = 65535;

server.listen(PORT, () => {
  console.log("Server is listening...");
});
