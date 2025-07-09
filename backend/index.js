const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

dotenv.config();
const port = process.env.PORT;

dbConnect();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API is listening");
});

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureUploadsDirectoryExists();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists();
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

// ✅ API Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product", upload.array("image"), require("./routes/Products"));
app.use("/api/cart", require("./routes/AddToCart"));

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
