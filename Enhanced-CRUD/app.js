// // const fs = require("fs");
// // const express = require("express");

// // const app = express();

// // app.get("/userdata", (req, res) => {
// //   fs.readFile("./data.json", "utf-8", (err, data) => {
// //     if (err) console.log(err);
// //     res.send(data);
// //   });
// // });

// // app.get("/newUser", (req, res) => {
// //   const newUser = {
// //     name: "Claudine",
// //     occupation: "Skateboarder",
// //   };
// //   fs.writeFile("./data.json", newUser, (err, data) => {
// //     if (err) console.log(err);
// //     res.send(data);
// //   });
// // });

// const fs = require("fs");
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");

// const app = express();
// app.use(express.json());

// const readData = () => {
//   try {
//     const data = fs.readFileSync("./data.json", "utf-8");
//     return JSON.parse(data || "[]");
//   } catch (err) {
//     return [];
//   }
// };

// const writeData = (data) => {
//   fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
// };

// app.get("/userdata", (req, res) => {
//   const data = readData();
//   res.status(200).json(data);
// });

// app.post("/newUser", (req, res) => {
//   const { name, occupation } = req.body;

//   if (!name || !occupation) {
//     return res.status(400).json({ error: "Name and occupation are required" });
//   }

//   const newUser = {
//     id: uuidv4(),
//     name,
//     occupation,
//   };

//   const data = readData();
//   data.push(newUser);
//   writeData(data);

//   res.status(201).json(newUser);
// });

// app.put("/userdata/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, occupation } = req.body;

//   const data = readData();
//   const index = data.findIndex((item) => item.id === id);

//   if (index === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   if (name) data[index].name = name;
//   if (occupation) data[index].occupation = occupation;

//   writeData(data);

//   res.status(200).json(data[index]);
// });

// app.delete("/userdata/:id", (req, res) => {
//   const { id } = req.params;

//   const data = readData();
//   const newData = data.filter((item) => item.id !== id);

//   if (data.length === newData.length) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   writeData(newData);

//   res.status(200).json({ message: "User deleted successfully" });
// });

// const PORT = 18000;

// app.listen(PORT, () => {
//   console.log("Server is listening....");
// });

const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

app.get("/userdata", (req, res) => {
  try {
    const data = fs.readFile("./data.json", "utf-8");
    res.status(200).send(JSON.parse(data || "[]"));
  } catch (err) {
    res.status(200).send([]);
  }
});

app.post("/newUser", (req, res) => {
  const { name, occupation } = req.body;

  if (!name || !occupation) {
    return res.status(400).send({ error: "Name and occupation are required" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    occupation,
  };

  try {
    const data = JSON.parse(fs.readFile("./data.json", "utf-8") || "[]");
    data.push(newUser);
    fs.writeFile("./data.json", JSON.stringify(data));
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send({ error: "Error writing data" });
  }
});

app.put("/userdata/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation } = req.body;

  try {
    const data = JSON.parse(fs.readFile("./data.json", "utf-8") || "[]");
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).send({ error: "User not found" });
    }

    if (name) data[index].name = name;
    if (occupation) data[index].occupation = occupation;

    fs.writeFile("./data.json", JSON.stringify(data));
    res.status(200).send(data[index]);
  } catch (err) {
    res.status(500).send({ error: "Error updating data" });
  }
});

app.delete("/userdata/:id", (req, res) => {
  const { id } = req.params;

  try {
    const data = JSON.parse(fs.readFile("./data.json", "utf-8") || "[]");
    const newData = data.filter((item) => item.id !== id);

    if (data.length === newData.length) {
      return res.status(404).send({ error: "User not found" });
    }

    fs.writeFile("./data.json", JSON.stringify(newData));
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error deleting data" });
  }
});

const PORT = 18000;

app.listen(PORT, () => {
  console.log("Server is listening....");
});
