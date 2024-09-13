const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/input", (req, res) => {
  fs.readFile("./input.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send({
      status: 200,
      data,
    });
  });
});

app.post("/output", (req, res) => {
  fs.writeFile("./output.txt", JSON.stringify(req.body), (err) => {
    if (err) res.status(500).send(err.message);
    res.status(201).send("Updated successfully!👍");
  });
});

app.put("/output", (req, res) => {
  const data = req.body;
  const dataToWrite = JSON.stringify(data);
  fs.writeFile("./output.txt", dataToWrite, "utf-8", (err) => {
    if (err) res.status(500).send(err.message);
    res.status(201).send("Put successfully");
  });
});

app.get("/output", (req, res) => {
  fs.readFile("./output.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send({
      status: 200,
      data,
    });
  });
});

app.delete("/output", (req, res) => {
  fs.writeFile("./output.txt", "", (err) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).send("File contents deleted successfully");
  });
});

const server = http.createServer(app);
const PORT = 8000;

server.listen(PORT, () => {
  console.log("Server is listening...");
});
