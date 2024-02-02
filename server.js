const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connection } = require("./db/mysqlDb");

const app = express();
let initialPath = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(initialPath, "login.html"));
});
app.get("/welcome", (req, res) => {
  res.sendFile(path.join(initialPath, "welcome.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(initialPath, "home.html"));
});

app.post("/register", async (req, res) => {
  const { fullname, username, password } = req.body;
  if (!fullname.length || !username.length || !password.length) {
    res.status(400).send("Please fill all the fields");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO sql6681453.users (fullname,username, password) VALUES (?, ?,?)";
  let value = [fullname, username, encryptedPassword];

  connection.query(sql, value, (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Duplicate entry error (unique constraint violation)
        return res.status(409).json({ message: "Username already exists" });
      } else {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(201).json({ message: "User registered successfully" });
    }
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM sql6681453.users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        res
          .status(200)
          .json({ user: results[0], message: "login successfull" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
