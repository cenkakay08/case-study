import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const SECRET_KEY = "super-secret-key";

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(bodyParser.json());

// Load data from db.json
const dbPath = path.join(__dirname, "db.json");
let db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

const updateDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Login Route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Tasks Routes
app.get("/api/tasks", authenticateToken, (req, res) => {
  let tasks = db.tasks;

  // If user role is not Admin/Moderator, filter tasks by createdBy
  if (req.user.role === "User") {
    tasks = tasks.filter((t) => t.createdBy === req.user.id);
  }

  res.json(tasks);
});

app.post("/api/tasks", authenticateToken, (req, res) => {
  const newTask = {
    id: "t" + (db.tasks.length + 1),
    ...req.body,
    createdBy: req.user.id,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  db.tasks.push(newTask);
  updateDb();
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = db.tasks.findIndex((t) => t.id === id);

  if (index !== -1) {
    // Only Admin/Moderator can update status/rejectionReason
    if (req.user.role === "Admin" || req.user.role === "Moderator") {
      db.tasks[index] = { ...db.tasks[index], ...req.body };
      updateDb();
      res.json(db.tasks[index]);
    } else {
      res.status(403).json({ message: "Unauthorized to update task status" });
    }
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
